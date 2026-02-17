"use client";

import { useQuery } from "@tanstack/react-query";
import { GlassCard } from "@/components/ui/glass-card";
import {
    Activity,
    Shield,
    BarChart3,
    ArrowUpRight,
    Users,
    Loader2,
} from "lucide-react";

export default function AdminDashboard() {
    const { data: adminData, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await fetch("/api/admin/trades");
            if (res.status === 403) throw new Error("Access Denied");
            if (!res.ok) throw new Error("Failed to fetch admin data");
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!adminData) {
        return (
            <div className="flex h-screen items-center justify-center text-destructive">
                Access denied. Admin privileges required.
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-serif text-primary">Admin Terminal</h1>
                    <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">System Oversight & Controls</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    LIVE SYSTEMS OK
                </div>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <GlassCard className="border-primary/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                            <BarChart3 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground uppercase font-semibold tracking-tighter">Total Volume</p>
                            <h3 className="text-2xl font-bold font-serif">{adminData.stats.totalVolume}</h3>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="border-blue-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground uppercase font-semibold tracking-tighter">Total Trades</p>
                            <h3 className="text-2xl font-bold font-serif">{adminData.stats.totalTrades}</h3>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="border-yellow-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground uppercase font-semibold tracking-tighter">Active Escrows</p>
                            <h3 className="text-2xl font-bold font-serif">{adminData.stats.activeEscrows}</h3>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="border-cyan-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground uppercase font-semibold tracking-tighter">Registered Users</p>
                            <h3 className="text-2xl font-bold font-serif">150+</h3>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Recent System-wide Activity */}
            <GlassCard>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold font-serif flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        System Activity Log
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-xs uppercase text-muted-foreground font-bold tracking-widest">
                                <th className="pb-4">Trade ID</th>
                                <th className="pb-4">Buyer</th>
                                <th className="pb-4">Seller</th>
                                <th className="pb-4">Amount</th>
                                <th className="pb-4 text-center">Status</th>
                                <th className="pb-4 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {adminData.trades.map((trade: any) => (
                                <tr key={trade.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="py-4 font-mono text-xs opacity-60">#{trade.id.slice(-6)}</td>
                                    <td className="py-4 font-medium">{trade.buyer?.username || "---"}</td>
                                    <td className="py-4 font-medium">{trade.seller?.username || "---"}</td>
                                    <td className="py-4 font-bold">
                                        {Number(trade.amountFiat).toLocaleString()} {trade.offer?.fiatCurrency}
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${trade.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' :
                                            trade.status === 'DISPUTE' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {trade.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right opacity-60 text-xs">
                                        {new Date(trade.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
