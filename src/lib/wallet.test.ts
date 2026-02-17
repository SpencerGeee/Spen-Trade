import { WalletService } from "@/lib/wallet";
import { prisma } from "@/lib/prisma";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

jest.mock("@/lib/prisma", () => ({
    prisma: {
        wallet: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    },
}));

jest.mock("@/lib/logger", () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
    },
}));

describe("WalletService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getOrCreateWallet", () => {
        it("should return existing wallet if it exists", async () => {
            const mockWallet = { userId: "user_1", address: "0x123" };
            (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);

            const result = await WalletService.getOrCreateWallet("user_1");

            expect(result).toEqual(mockWallet);
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: "user_1" } });
            expect(prisma.wallet.create).not.toHaveBeenCalled();
        });

        it("should create new wallet if one doesn't exist", async () => {
            (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
            (prisma.wallet.create as jest.Mock).mockResolvedValue({ id: "w_1", address: "0xNew" });

            const result = await WalletService.getOrCreateWallet("user_2");

            expect(result.address).toBe("0xNew");
            expect(prisma.wallet.create).toHaveBeenCalled();
        });
    });
});
