"use client";

import { useUser } from "@clerk/nextjs";
import { Reveal } from "@/components/reveal";
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    ShieldCheck,
    Zap
} from "lucide-react";

const stats = [
    {
        title: "Total Balance",
        value: "$12,450.00",
        change: "+12.5%",
        trend: "up",
        icon: Wallet,
    },
    {
        title: "Active Offers",
        value: "2",
        change: "BTC & ETH",
        trend: "neutral",
        icon: CreditCard,
    },
    {
        title: "Security Score",
        value: "98%",
        change: "Excellent",
        trend: "up",
        icon: ShieldCheck,
    },
    {
        title: "Trade Limit",
        value: "$50K",
        change: "Basic Tier",
        trend: "up",
        icon: Zap,
    },
];

import { Wallet } from "lucide-react";

export default function DashboardPage() {
    const { isLoaded, isSignedIn, user } = useUser();

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
                {stats.map((stat, index) => (
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
                                <span>Email Verified</span>
                                <span className="text-green-500">Done</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>Identity Verification</span>
                                <span className="text-yellow-500">In Progress</span>
                            </div>
                            <div className="flex items-center justify-between text-sm border-t pt-4">
                                <span>Withdrawal Limits</span>
                                <span className="font-bold">$10,000 / day</span>
                            </div>
                            <button className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                                Verify Now
                            </button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

// Utility for page.tsx
import { cn } from "@/lib/utils";
