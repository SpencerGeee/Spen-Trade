import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserDashboardStats } from "@/lib/user-stats";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const stats = await getUserDashboardStats(userId);
        if (!stats) return new NextResponse("User not found", { status: 404 });

        return NextResponse.json(stats);
    } catch (error) {
        console.error("[USER_STATS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
