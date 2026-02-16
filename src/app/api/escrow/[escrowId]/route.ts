import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { EscrowService } from "@/lib/escrow";

// PATCH: Release or refund escrow
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ escrowId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { escrowId } = await params;
        const { action } = await req.json();

        let result;

        switch (action) {
            case "RELEASE":
                result = await EscrowService.releaseFunds(escrowId);
                break;
            case "REFUND":
                result = await EscrowService.refundFunds(escrowId);
                break;
            case "DISPUTE":
                result = await EscrowService.disputeEscrow(escrowId);
                break;
            default:
                return new NextResponse("Invalid action. Use RELEASE, REFUND, or DISPUTE", { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("[ESCROW_PATCH]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

// GET: Get specific escrow details
export async function GET(
    req: Request,
    { params }: { params: Promise<{ escrowId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { escrowId } = await params;
        const escrow = await EscrowService.getStatus(escrowId);

        if (!escrow) return new NextResponse("Escrow not found", { status: 404 });

        // Check expiry
        await EscrowService.checkExpiry(escrowId);

        return NextResponse.json(escrow);
    } catch (error) {
        console.error("[ESCROW_GET_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
