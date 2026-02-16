import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { EscrowService } from "@/lib/escrow";

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

        // Fetch escrow status
        const escrow = await EscrowService.getByTradeId(tradeId);

        return NextResponse.json({ ...trade, escrow });
    } catch (error) {
        console.error("[TRADE_GET]", error);
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

        let newStatus: any = trade.status;
        const escrow = await EscrowService.getByTradeId(tradeId);

        switch (action) {
            case "FUND_ESCROW":
                // Lock crypto into escrow when trade starts
                if (trade.sellerId !== dbUser.id) {
                    return new NextResponse("Only seller can fund escrow", { status: 403 });
                }
                await EscrowService.lockFunds({
                    tradeId,
                    buyerId: trade.buyerId,
                    sellerId: trade.sellerId,
                    amountCrypto: Number(trade.amountCrypto),
                    cryptocurrency: trade.offer?.cryptocurrency || "ETH",
                });
                newStatus = "ESCROW_LOCKED";
                break;

            case "PAID":
                if (trade.buyerId !== dbUser.id)
                    return new NextResponse("Only buyer can mark as paid", { status: 403 });
                newStatus = "PAID";
                break;

            case "RELEASE":
                if (trade.sellerId !== dbUser.id)
                    return new NextResponse("Only seller can release", { status: 403 });
                // Release escrow funds
                if (escrow) {
                    await EscrowService.releaseFunds(escrow.id);
                }
                newStatus = "COMPLETED";
                break;

            case "DISPUTE":
                // Either party can open dispute
                if (escrow) {
                    await EscrowService.disputeEscrow(escrow.id);
                }
                newStatus = "DISPUTE";
                break;

            case "CANCEL":
                if ((trade.status as string) !== "PENDING" && (trade.status as string) !== "ESCROW_LOCKED")
                    return new NextResponse("Can only cancel pending/locked trades", { status: 400 });
                // Refund escrow if funded
                if (escrow && escrow.status === "FUNDED") {
                    await EscrowService.refundFunds(escrow.id);
                }
                newStatus = "CANCELLED";
                break;

            default:
                return new NextResponse("Invalid action", { status: 400 });
        }

        const updated = await prisma.trade.update({
            where: { id: tradeId },
            data: { status: newStatus },
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error("[TRADE_PATCH]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
