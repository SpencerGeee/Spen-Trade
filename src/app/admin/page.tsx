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
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

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
        <div className="container mx-auto py-12 px-4 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                    <Reveal direction="down" delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                            <Shield className="h-3 w-3" />
                            System Nexus
                        </div>
                    </Reveal>
                    <Reveal direction="down" delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter leading-none">Admin <span className="text-gradient-gold">Terminal</span></h1>
                    </Reveal>
                    <Reveal direction="down" delay={0.3}>
                        <p className="text-muted-foreground font-medium opacity-60 text-sm tracking-widest uppercase italic">Operational Oversight & Global Protocol Controls</p>
                    </Reveal>
                </div>
                <Reveal direction="left" delay={0.4}>
                    <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] text-green-500 bg-green-500/5 px-4 py-2 rounded-2xl border border-green-500/20 shadow-lg shadow-green-500/5 uppercase">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                        Infrastructure Nominal
                    </div>
                </Reveal>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { icon: BarChart3, label: "Volume Flux", value: adminData.stats.totalVolume, color: "text-primary", border: "border-primary/20" },
                    { icon: Activity, label: "Active Cycles", value: adminData.stats.totalTrades, color: "text-blue-500", border: "border-blue-500/20" },
                    { icon: Shield, label: "Vault Security", value: adminData.stats.activeEscrows, color: "text-yellow-500", border: "border-yellow-500/20" },
                    { icon: Users, label: "Identities", value: "150+", color: "text-cyan-500", border: "border-cyan-500/20" },
                ].map((stat, i) => (
                    <Reveal key={i} direction="up" delay={0.5 + (i * 0.05)} width="100%">
                        <div className={cn("p-8 rounded-[2rem] border glass-strong shadow-2xl relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]", stat.border)}>
                            <div className="absolute -right-4 -top-4 opacity-[0.03] grayscale transition-opacity group-hover:opacity-[0.08]">
                                <stat.icon className="h-32 w-32" />
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={cn("p-3 rounded-2xl bg-white/5 border border-white/5", stat.color)}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{stat.label}</p>
                            </div>
                            <h3 className="text-3xl font-montserrat font-black tracking-tighter">{stat.value}</h3>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Recent System-wide Activity */}
            <Reveal direction="up" delay={0.8} width="100%">
                <div className="rounded-[2.5rem] border border-white/10 glass-strong shadow-2xl overflow-hidden">
                    <div className="p-10 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-xl font-montserrat font-black tracking-widest uppercase flex items-center gap-4">
                            <Activity className="h-6 w-6 text-primary" />
                            Master Activity Register
                        </h3>
                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase text-muted-foreground/60">
                            Historical Audit Data
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] uppercase text-muted-foreground/40 font-black tracking-[0.3em]">
                                    <th className="p-10 pb-6 font-black italic">ID Reference</th>
                                    <th className="p-10 pb-6">Buyer Identity</th>
                                    <th className="p-10 pb-6">Seller Identity</th>
                                    <th className="p-10 pb-6">Settlement</th>
                                    <th className="p-10 pb-6 text-center">Status Protocol</th>
                                    <th className="p-10 pb-6 text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="text-[10px] font-bold uppercase tracking-widest">
                                {adminData.trades.map((trade: any) => (
                                    <tr key={trade.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                        <td className="p-10 py-6 font-mono text-primary/40">#{trade.id.slice(-8)}</td>
                                        <td className="p-10 py-6">{trade.buyer?.username || "---"}</td>
                                        <td className="p-10 py-6">{trade.seller?.username || "---"}</td>
                                        <td className="p-10 py-6 font-black text-sm font-montserrat">
                                            {Number(trade.amountFiat).toLocaleString()} <span className="text-[10px] opacity-40 font-sans tracking-tight">{trade.offer?.fiatCurrency}</span>
                                        </td>
                                        <td className="p-10 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black shadow-inner ${trade.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                trade.status === 'DISPUTE' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                }`}>
                                                {trade.status}
                                            </span>
                                        </td>
                                        <td className="p-10 py-6 text-right opacity-40 font-black italic">
                                            {new Date(trade.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
