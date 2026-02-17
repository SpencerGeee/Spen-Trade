import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { WalletService } from "@/lib/wallet";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const wallet = await WalletService.getOrCreateWallet(userId);

        // Fetch recent transactions (deposit/withdrawal)
        // Assuming Transaction model exists and acts as ledger
        const transactions = await prisma.transaction.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
            take: 10
        });

        return NextResponse.json({
            ...wallet,
            transactions
        });
    } catch (error) {
        console.error("[WALLET_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
