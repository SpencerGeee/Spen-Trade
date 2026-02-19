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
            <div className="space-y-4 mb-12">
                <Reveal direction="down" delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                        <ShieldCheck className="h-3 w-3" />
                        Institutional Access
                    </div>
                </Reveal>
                <Reveal direction="down" delay={0.2} width="100%">
                    <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter">Command <span className="text-gradient-gold">Center</span></h1>
                </Reveal>
                <Reveal direction="down" delay={0.3}>
                    <p className="text-muted-foreground text-lg font-medium opacity-80 max-w-2xl">
                        Welcome, {user?.firstName || "Operator"}. Overseeing your global trading infrastructure and secure liquidity.
                    </p>
                </Reveal>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <Reveal key={index} direction="up" delay={0.2 + (0.05 * index)} width="100%">
                        <div className="p-8 rounded-[2rem] border border-white/10 glass hover:border-primary/30 transition-all duration-500 group overflow-hidden relative shadow-2xl">
                            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <stat.icon className="h-32 w-32" />
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-inner">
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{stat.title}</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-3xl font-montserrat font-black tracking-tighter mb-2">{stat.value}</h2>
                                    <div className={cn(
                                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                                        stat.trend === "up" ? "bg-green-500/10 text-green-500" : stat.trend === "down" ? "bg-red-500/10 text-red-500" : "bg-white/5 text-muted-foreground"
                                    )}>
                                        {stat.change} {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
                                    </div>
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
                    <div className="h-[450px] p-10 rounded-[2.5rem] border border-white/10 glass-strong flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                        <TrendingUp className="h-16 w-16 text-primary/20 mb-6 group-hover:scale-110 transition-transform duration-700" />
                        <h3 className="text-2xl font-montserrat font-black tracking-tight mb-3 uppercase">Market Intelligence</h3>
                        <p className="text-muted-foreground max-w-sm text-sm font-medium leading-relaxed uppercase tracking-[0.1em] opacity-60">
                            Real-time analytics and high-frequency trading visualization initializing.
                        </p>
                        <div className="mt-8 flex gap-3">
                            <div className="h-1 w-2 rounded-full bg-primary/40 animate-pulse" />
                            <div className="h-1 w-2 rounded-full bg-primary/40 animate-pulse delay-150" />
                            <div className="h-1 w-2 rounded-full bg-primary/40 animate-pulse delay-300" />
                        </div>
                    </div>
                </Reveal>

                {/* Security / Verification Status */}
                <Reveal direction="up" delay={0.6} width="100%">
                    <div className="h-[450px] p-10 rounded-[2.5rem] border border-primary/20 bg-primary/5 relative overflow-hidden flex flex-col shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-5 grayscale">
                            <ShieldCheck className="h-40 w-40" />
                        </div>
                        <h3 className="text-2xl font-montserrat font-black tracking-tight mb-2 uppercase">Integrity Audit</h3>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-10 leading-relaxed">Escalate your verification level to unlock high-liquidity tiers.</p>

                        <div className="space-y-6 mt-auto">
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Auth Protocol</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-2 py-1 rounded">Secured by Clerk</span>
                            </div>
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Verification Status</span>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded",
                                    data?.profile.kycStatus === "APPROVED" ? "text-green-500 bg-green-500/10" : "text-yellow-500 bg-yellow-500/10"
                                )}>
                                    {data?.profile.kycStatus}
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Capacity Limit</span>
                                <span className="text-xl font-montserrat font-black tracking-tighter text-primary">{data?.stats.tradeLimit} <span className="text-[10px] text-muted-foreground/40 italic">/ DIEM</span></span>
                            </div>
                            <Link href="/dashboard/kyc" className="w-full mt-6">
                                <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20" variant="gold">
                                    {data?.profile.kycStatus === "APPROVED" ? "Manage Profile" : "Initiate Verification"}
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
