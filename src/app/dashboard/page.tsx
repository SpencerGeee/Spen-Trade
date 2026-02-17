"use client";

import { useUser } from "@clerk/nextjs";
import { Reveal } from "@/components/reveal";
import {
    TrendingUp,
    CreditCard,
    ShieldCheck,
    Zap,
    Wallet,
    Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// stats constant removed - now dynamic

export default function DashboardPage() {
    const { user } = useUser();

    const { data, isLoading } = useQuery({
        queryKey: ["user-stats"],
        queryFn: async () => {
            const res = await fetch("/api/user/stats");
            if (!res.ok) throw new Error("Failed to fetch stats");
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const statsCards = [
        {
            title: "Total Balance",
            value: data?.stats.totalBalance || "$0.00",
            change: "Live Balance",
            trend: "up",
            icon: Wallet,
        },
        {
            title: "Active Trades",
            value: data?.stats.activeTrades || "0",
            change: "Open P2P Trades",
            trend: "neutral",
            icon: CreditCard,
        },
        {
            title: "Security Score",
            value: data?.stats.securityScore || "40%",
            change: data?.profile.kycStatus === "APPROVED" ? "Excellent" : "Verify to improve",
            trend: data?.profile.kycStatus === "APPROVED" ? "up" : "neutral",
            icon: ShieldCheck,
        },
        {
            title: "Trade Limit",
            value: data?.stats.tradeLimit || "$1K",
            change: data?.stats.tier || "Basic Tier",
            trend: "up",
            icon: Zap,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <Reveal direction="down">
                    <h1 className="text-3xl font-serif font-bold mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user?.firstName || "Trader"}. Here is your overview for today.
                    </p>
                </Reveal>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <Reveal key={index} direction="up" delay={0.1 * index} width="100%">
                        <div className="p-6 rounded-2xl border bg-secondary/20 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all group overflow-hidden relative">
                            <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                <stat.icon className="h-24 w-24" />
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{stat.value}</h2>
                                    <p className={cn(
                                        "text-xs font-semibold mt-1",
                                        stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-muted-foreground"
                                    )}>
                                        {stat.change} {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Market Activity Placeholder */}
                <Reveal direction="up" delay={0.5} className="lg:col-span-2" width="100%">
                    <div className="h-[400px] p-6 rounded-2xl border bg-secondary/10 border-primary/10 flex flex-col items-center justify-center text-center">
                        <TrendingUp className="h-12 w-12 text-primary/40 mb-4" />
                        <h3 className="text-lg font-semibold">Market Performance</h3>
                        <p className="text-muted-foreground max-w-sm">
                            Live market charts and trading activity will be displayed here soon.
                        </p>
                    </div>
                </Reveal>

                {/* Security / Verification Status */}
                <Reveal direction="up" delay={0.6} width="100%">
                    <div className="h-[400px] p-6 rounded-2xl border bg-primary/5 border-primary/20 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck className="h-32 w-32" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Account Security</h3>
                        <p className="text-sm text-muted-foreground mb-6">Complete your verification to unlock higher limits.</p>

                        <div className="space-y-4 mt-auto">
                            <div className="flex items-center justify-between text-sm">
                                <span>Clerk Auth</span>
                                <span className="text-green-500">Secure</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>KYC Verification</span>
                                <span className={cn(
                                    "font-medium",
                                    data?.profile.kycStatus === "APPROVED" ? "text-green-500" : "text-yellow-500"
                                )}>
                                    {data?.profile.kycStatus}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm border-t pt-4">
                                <span>Withdrawal Limits</span>
                                <span className="font-bold">{data?.stats.tradeLimit} / day</span>
                            </div>
                            <Link href="/dashboard/kyc" className="w-full mt-4">
                                <Button className="w-full">
                                    {data?.profile.kycStatus === "APPROVED" ? "View Profile" : "Verify Now"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

// Utility for page.tsx removed as it's imported at the top
