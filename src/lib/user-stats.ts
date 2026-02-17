import { prisma } from "./prisma";
import { WalletService } from "./wallet";

export async function getUserDashboardStats(userId: string) {
    // Ensure user has a wallet (enterprise-grade lazy initialization)
    await WalletService.getOrCreateWallet(userId);

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
            tradesAsBuyer: true,
            tradesAsSeller: true,
            wallet: true,
            kyc: true,
            transactions: {
                orderBy: { createdAt: "desc" },
                take: 5,
            },
        },
    });

    if (!user) return null;

    const totalTrades = user.tradesAsBuyer.length + user.tradesAsSeller.length;
    const completedTrades = [
        ...user.tradesAsBuyer,
        ...user.tradesAsSeller,
    ].filter((t) => (t.status as string) === "COMPLETED").length;

    // Calculate total balance from wallet
    const balance = user.wallet?.balance || 0;
    const currency = user.wallet?.currency || "USD";

    // Security Score Logic
    let securityScore = 40;
    if (user.kyc?.status === "APPROVED") securityScore += 40;
    if (user.clerkId) securityScore += 20;

    return {
        profile: {
            username: user.username,
            fullName: user.kyc ? `${user.kyc.firstName} ${user.kyc.lastName}` : "Authenticated Trader",
            kycStatus: user.kyc?.status || "NOT_STARTED",
        },
        stats: {
            totalBalance: `${currency === "USD" ? "$" : ""}${Number(balance).toLocaleString()}`,
            activeTrades: [
                ...user.tradesAsBuyer,
                ...user.tradesAsSeller,
            ].filter((t) => (t.status as string) !== "COMPLETED" && (t.status as string) !== "CANCELLED").length,
            securityScore: `${securityScore}%`,
            tradeLimit: user.kyc?.status === "APPROVED" ? "$50K" : "$1K",
            tier: user.kyc?.status === "APPROVED" ? "Pro Tier" : "Basic Tier",
        },
        recentActivity: user.transactions.map((tx: any) => ({
            id: tx.id,
            type: tx.type,
            amount: tx.amount,
            currency: tx.currency,
            status: tx.status,
            createdAt: tx.createdAt,
        })),
    };
}
