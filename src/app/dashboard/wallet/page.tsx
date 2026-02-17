"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { formatUnits } from 'viem'
import { Wallet, ArrowDownLeft, ArrowUpRight, History, LogOut, Loader2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function formatBalance(value: bigint | undefined, decimals: number | undefined): string {
    if (value === undefined || decimals === undefined) return "0.00";
    return formatUnits(value, decimals);
}

export default function WalletPage() {
    const { open } = useWeb3Modal()
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    // Fetch ETH balance from wagmi
    const { data: ethBalance } = useBalance({
        address: address,
    })

    // Fetch account stats & transactions from DB
    const { data: dbStats, isLoading } = useQuery({
        queryKey: ["user-stats"],
        queryFn: async () => {
            const res = await fetch("/api/user/stats");
            if (!res.ok) throw new Error("Failed to fetch stats");
            return res.json();
        },
    });

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const formattedETH = ethBalance ? formatBalance(ethBalance.value, ethBalance.decimals) : "0";
    const ethUSD = (Number(formattedETH) * 3000).toFixed(2);

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto space-y-8 py-8">
            <div className="flex items-center justify-between px-4 sm:px-0">
                <h1 className="text-3xl font-bold font-serif text-primary">Wallet</h1>
                <div className="flex gap-2">
                    {mounted && isConnected && (
                        <ShinyButton onClick={() => disconnect()} className="bg-destructive/10 text-destructive hover:bg-destructive/20 ml-2" icon={false}>
                            <LogOut className="h-4 w-4" />
                        </ShinyButton>
                    )}
                    <ShinyButton onClick={() => open()}>
                        {mounted && isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
                    </ShinyButton>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
                {/* Total Balance Card */}
                <GlassCard className="lg:col-span-2">
                    <div className="flex flex-col gap-2">
                        <span className="text-muted-foreground">User Assets (Estimated)</span>
                        <span className="text-4xl font-bold font-serif">
                            {dbStats?.stats.totalBalance || "$0.00"}
                        </span>
                        <span className="text-sm text-green-500 flex items-center gap-1">
                            <ArrowUpRight className="h-4 w-4" /> Real-time tracking enabled
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <div className="p-4 rounded-xl bg-background/30 border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-500">
                                    ETH
                                </div>
                                <div>
                                    <p className="font-medium">Ethereum</p>
                                    <p className="text-xs text-muted-foreground">
                                        {mounted && isConnected ? Number(formattedETH).toFixed(4) : "0.00"} ETH
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold">
                                {mounted && isConnected ? `$${ethUSD}` : "$0.00"}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-background/30 border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-500">
                                    USDT
                                </div>
                                <div>
                                    <p className="font-medium">Tether</p>
                                    <p className="text-xs text-muted-foreground">Available for trades</p>
                                </div>
                            </div>
                            <p className="font-semibold">$0.00</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Quick Actions */}
                <GlassCard className="flex flex-col justify-center gap-4">
                    <button className="flex items-center justify-between p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <ArrowDownLeft className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold">Deposit</p>
                                <p className="text-xs text-muted-foreground">Add funds to wallet</p>
                            </div>
                        </div>
                    </button>

                    <button className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold">Withdraw</p>
                                <p className="text-xs text-muted-foreground">Transfer to external wallet</p>
                            </div>
                        </div>
                    </button>
                </GlassCard>
            </div>

            {/* Transaction History */}
            <GlassCard>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                        <History className="h-5 w-5 text-primary" />
                        Recent Activity
                    </h3>
                    <Link href="/dashboard/history" className="text-sm text-primary hover:underline">View all</Link>
                </div>

                <div className="space-y-4">
                    {dbStats?.recentActivity && dbStats.recentActivity.length > 0 ? (
                        dbStats.recentActivity.map((tx: any) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl glass hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.type === "DEPOSIT" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                                        }`}>
                                        {tx.type === "DEPOSIT" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium uppercase text-sm">{tx.type}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{tx.type === "DEPOSIT" ? "+" : "-"}{tx.amount} {tx.currency}</p>
                                    <p className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${tx.status === "COMPLETED" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                                        }`}>
                                        {tx.status}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <div className="h-12 w-12 bg-background/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <History className="h-6 w-6 opacity-50" />
                            </div>
                            <p>No transactions yet</p>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
