import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { EscrowService } from "@/lib/escrow";

// POST: Lock funds into escrow for a trade
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { tradeId, buyerId, sellerId, amountCrypto, cryptocurrency } = await req.json();

        if (!tradeId || !buyerId || !sellerId || !amountCrypto || !cryptocurrency) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const escrow = await EscrowService.lockFunds({
            tradeId,
            buyerId,
            sellerId,
            amountCrypto,
            cryptocurrency,
        });

        return NextResponse.json(escrow);
    } catch (error) {
        console.error("[ESCROW_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// GET: Get escrow status by tradeId
export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const tradeId = searchParams.get("tradeId");

        if (!tradeId) {
            return new NextResponse("tradeId query param required", { status: 400 });
        }

        const escrow = await EscrowService.getByTradeId(tradeId);

        if (!escrow) {
            return NextResponse.json({ status: "NONE", message: "No escrow found for this trade" });
        }

        // Check expiry on access
        await EscrowService.checkExpiry(escrow.id);

        return NextResponse.json(escrow);
    } catch (error) {
        console.error("[ESCROW_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
