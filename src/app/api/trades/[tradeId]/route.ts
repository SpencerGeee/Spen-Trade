import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { EscrowService } from "@/lib/escrow";
import { logger } from "@/lib/logger";

// GET: Fetch trade details with messages
export async function GET(
    req: Request,
    { params }: { params: Promise<{ tradeId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { tradeId } = await params;
        const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!dbUser) return new NextResponse("User not found", { status: 404 });

        const trade = await prisma.trade.findUnique({
            where: { id: tradeId },
            include: {
                offer: true,
                buyer: { select: { id: true, username: true, clerkId: true } },
                seller: { select: { id: true, username: true, clerkId: true } },
                messages: { orderBy: { createdAt: "asc" } },
            },
        });

        if (!trade) return new NextResponse("Trade not found", { status: 404 });

        // Only allow buyer or seller to view
        if (trade.buyerId !== dbUser.id && trade.sellerId !== dbUser.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        return NextResponse.json(trade);
    } catch (error) {
        logger.error({ error }, `[TRADE_GET] Trade ID: ${(await params).tradeId}`);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// PATCH: Update trade status (mark paid, release, dispute)
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ tradeId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { tradeId } = await params;
        const { action } = await req.json();

        const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!dbUser) return new NextResponse("User not found", { status: 404 });

        const trade = await prisma.trade.findUnique({
            where: { id: tradeId },
            include: { offer: true },
        });
        if (!trade) return new NextResponse("Trade not found", { status: 404 });

        let result;

        switch (action) {
            case "FUND_ESCROW":
                if (trade.sellerId !== dbUser.id) {
                    return new NextResponse("Only seller can fund escrow", { status: 403 });
                }
                result = await EscrowService.lockFunds({
                    tradeId,
                    buyerId: trade.buyerId,
                    sellerId: trade.sellerId,
                    amountCrypto: Number(trade.amountCrypto),
                    cryptocurrency: trade.offer.cryptocurrency // Need to include offer relation
                });
                break;

            case "PAID":
                if (trade.buyerId !== dbUser.id)
                    return new NextResponse("Only buyer can mark as paid", { status: 403 });
                result = await prisma.trade.update({
                    where: { id: tradeId },
                    data: { status: "PAID" }
                });
                break;

            case "RELEASE":
                if (trade.sellerId !== dbUser.id)
                    return new NextResponse("Only seller can release", { status: 403 });
                result = await EscrowService.releaseFunds(tradeId);
                break;

            case "DISPUTE":
                result = await EscrowService.disputeTrade(tradeId);
                break;

            case "CANCEL":
                if ((trade.status as string) !== "PENDING" && (trade.status as string) !== "ESCROW_LOCKED")
                    return new NextResponse("Can only cancel pending/locked trades", { status: 400 });
                result = await EscrowService.refundFunds(tradeId);
                break;

            default:
                return new NextResponse("Invalid action", { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        logger.error({ error }, `[TRADE_PATCH] Trade ID: ${(await params).tradeId}`);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
