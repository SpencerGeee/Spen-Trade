import { EscrowService } from "@/lib/escrow";
import { prisma } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
    prisma: {
        trade: {
            update: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

jest.mock("@/lib/logger", () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
    },
}));

describe("EscrowService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("lockFunds", () => {
        it("should update trade status to ESCROW_LOCKED", async () => {
            (prisma.trade.findUnique as jest.Mock).mockResolvedValue({ id: "t_1" });
            (prisma.trade.update as jest.Mock).mockResolvedValue({ id: "t_1", status: "ESCROW_LOCKED" });

            const result = await EscrowService.lockFunds({
                tradeId: "t_1",
                buyerId: "buyer_1",
                sellerId: "seller_1",
                amountCrypto: 100,
                cryptocurrency: "USDT"
            });

            expect(result.status).toBe("ESCROW_LOCKED");
            expect(prisma.trade.update).toHaveBeenCalledWith({
                where: { id: "t_1" },
                data: expect.objectContaining({ status: "ESCROW_LOCKED" }),
            });
        });
    });

    describe("releaseFunds", () => {
        it("should update trade status to COMPLETED", async () => {
            (prisma.trade.update as jest.Mock).mockResolvedValue({ id: "t_1", status: "COMPLETED" });

            const result = await EscrowService.releaseFunds("t_1");

            expect(result.status).toBe("COMPLETED");
            expect(prisma.trade.update).toHaveBeenCalledWith({
                where: { id: "t_1" },
                data: expect.objectContaining({ status: "COMPLETED" }),
            });
        });
    });
});
