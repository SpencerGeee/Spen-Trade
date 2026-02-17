import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        // Verify if user is admin (this is a placeholder for actual admin check)
        // In real app, check user role in DB or Clerk publicMetadata
        const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!dbUser || dbUser.role !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const trades = await prisma.trade.findMany({
            include: {
                buyer: { select: { username: true, email: true } },
                seller: { select: { username: true, email: true } },
                offer: true,
            },
            orderBy: { createdAt: "desc" },
        });

        const totalVolume = trades.reduce((acc, t) => acc + Number(t.amountFiat), 0);
        const activeEscrows = trades.filter(t => (t.status as string) === "ESCROW_LOCKED").length;

        return NextResponse.json({
            trades,
            stats: {
                totalTrades: trades.length,
                totalVolume: `$${totalVolume.toLocaleString()}`,
                activeEscrows,
            }
        });
    } catch (error) {
        console.error("[ADMIN_TRADES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
