import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch messages for a trade
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

        // Verify user is part of this trade
        const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
        if (!trade) return new NextResponse("Trade not found", { status: 404 });
        if (trade.buyerId !== dbUser.id && trade.sellerId !== dbUser.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const messages = await prisma.tradeMessage.findMany({
            where: { tradeId },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// POST: Send a message in a trade
export async function POST(
    req: Request,
    { params }: { params: Promise<{ tradeId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { tradeId } = await params;
        const { content } = await req.json();

        if (!content || typeof content !== "string" || content.trim().length === 0) {
            return new NextResponse("Message content is required", { status: 400 });
        }

        const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!dbUser) return new NextResponse("User not found", { status: 404 });

        // Verify user is part of this trade
        const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
        if (!trade) return new NextResponse("Trade not found", { status: 404 });
        if (trade.buyerId !== dbUser.id && trade.sellerId !== dbUser.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Don't allow messages on completed/cancelled trades
        if ((trade.status as string) === "COMPLETED" || (trade.status as string) === "CANCELLED") {
            return new NextResponse("Cannot send messages on closed trades", { status: 400 });
        }

        const message = await prisma.tradeMessage.create({
            data: {
                tradeId,
                senderId: dbUser.id,
                content: content.trim(),
            },
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error("[MESSAGES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
