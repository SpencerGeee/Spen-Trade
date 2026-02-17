import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { EscrowService } from "@/lib/escrow";

// POST: Initiate a new trade from an offer
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { offerId, amountFiat } = await req.json();

        if (!offerId || !amountFiat) {
            return new NextResponse("offerId and amountFiat are required", { status: 400 });
        }

        const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!dbUser) return new NextResponse("User not found", { status: 404 });

        const offer = await prisma.offer.findUnique({
            where: { id: offerId },
            include: { user: true },
        });

        if (!offer || !offer.isActive) {
            return new NextResponse("Offer not found or inactive", { status: 404 });
        }

        if (offer.userId === dbUser.id) {
            return new NextResponse("Cannot trade your own offer", { status: 400 });
        }

        // Determine buyer/seller based on offer type
        const buyerId = offer.type === "SELL" ? dbUser.id : offer.userId;
        const sellerId = offer.type === "SELL" ? offer.userId : dbUser.id;

        // Mock crypto amount calculation
        const amountCrypto = Number(amountFiat) / 3000; // Mock ETH rate
        const fee = Number(amountFiat) * 0.01; // 1% fee

        const trade = await prisma.trade.create({
            data: {
                offerId: offer.id,
                buyerId,
                sellerId,
                amountFiat,
                amountCrypto,
                fee,
                status: "PENDING",
                escrowAddress: `0xESCROW_MOCK_${Date.now()}`,
            },
        });

        // Lazily lock funds (enterprise-grade UX)
        await EscrowService.lockFunds({
            tradeId: trade.id,
            buyerId,
            sellerId,
            amountCrypto: Number(amountCrypto),
            cryptocurrency: offer.cryptocurrency,
        });

        return NextResponse.json(trade);
    } catch (error) {
        logger.error({ error }, "[TRADES_POST]");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
