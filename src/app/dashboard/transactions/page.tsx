"use client";

import { Reveal } from "@/components/reveal";
import {
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    CheckCircle,
    XCircle,
    Filter,
    Download,
    Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Transaction = {
    id: string;
    type: "DEPOSIT" | "WITHDRAWAL" | "TRADE" | "REFUND";
    status: "COMPLETED" | "PENDING" | "FAILED";
    amount: number;
    currency: string;
    createdAt: string;
    description?: string;
    counterparty?: string;
};

export default function TransactionsPage() {
    const [activeTab, setActiveTab] = useState("all");

    const { data, isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const res = await fetch("/api/transactions");
            if (!res.ok) throw new Error("Failed to fetch transactions");
            return res.json();
        },
    });

    const transactions: Transaction[] = data?.transactions || [];

    const filteredTransactions = activeTab === "all"
        ? transactions
        : transactions.filter((t) => t.type.toLowerCase() === activeTab);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Completed" };
            case "PENDING":
                return { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" };
            case "FAILED":
                return { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Failed" };
            default:
                return { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: status };
        }
    };

    const getTypeConfig = (type: string) => {
        switch (type) {
            case "DEPOSIT":
                return { icon: ArrowDownLeft, color: "text-green-500", sign: "+", bg: "bg-green-500/10" };
            case "WITHDRAWAL":
                return { icon: ArrowUpRight, color: "text-red-500", sign: "-", bg: "bg-red-500/10" };
            case "TRADE":
                return { icon: ArrowUpRight, color: "text-blue-500", sign: "", bg: "bg-blue-500/10" };
            case "REFUND":
                return { icon: ArrowDownLeft, color: "text-green-500", sign: "+", bg: "bg-green-500/10" };
            default:
                return { icon: ArrowUpRight, color: "text-muted-foreground", sign: "", bg: "bg-muted" };
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="w-full py-10 space-y-8 px-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
                <div className="space-y-4">
                    <Reveal direction="down" delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                            <Clock className="h-3 w-3" />
                            Operations Ledger
                        </div>
                    </Reveal>
                    <Reveal direction="down" delay={0.2} width="100%">
                        <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter">Audit <span className="text-gradient-gold">Trail</span></h1>
                    </Reveal>
                    <Reveal direction="down" delay={0.3}>
                        <p className="text-muted-foreground text-lg font-medium opacity-80 max-w-2xl">
                            Comprehensive record of all institutional movements and decentralized executions.
                        </p>
                    </Reveal>
                </div>
                <Reveal direction="left" delay={0.4}>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 glass text-[10px] font-black uppercase tracking-[0.2em] gap-3 hover:bg-white/5">
                        <Download className="h-4 w-4" />
                        Export Protocol
                    </Button>
                </Reveal>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Reveal direction="up" delay={0.4} width="100%">
                    <div className="p-8 rounded-[2rem] border border-white/10 glass-strong shadow-2xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Total Inbound</p>
                        <p className="text-3xl font-montserrat font-black tracking-tighter text-green-500">
                            +${transactions
                                .filter((t) => t.type === "DEPOSIT" && t.status === "COMPLETED")
                                .reduce((sum, t) => sum + t.amount, 0)
                                .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </Reveal>
                <Reveal direction="up" delay={0.5} width="100%">
                    <div className="p-8 rounded-[2rem] border border-white/10 glass-strong shadow-2xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Total Outbound</p>
                        <p className="text-3xl font-montserrat font-black tracking-tighter text-red-500">
                            -${transactions
                                .filter((t) => t.type === "WITHDRAWAL" && t.status === "COMPLETED")
                                .reduce((sum, t) => sum + t.amount, 0)
                                .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </Reveal>
                <Reveal direction="up" delay={0.6} width="100%">
                    <div className="p-8 rounded-[2rem] border border-white/10 glass-strong shadow-2xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Active Protocols</p>
                        <p className="text-3xl font-montserrat font-black tracking-tighter text-primary">
                            {transactions.filter((t) => t.status === "PENDING").length} <span className="text-[10px] text-muted-foreground italic tracking-widest uppercase">Executing</span>
                        </p>
                    </div>
                </Reveal>
            </div>

            {/* Transactions List */}
            <Reveal direction="up" delay={0.7} width="100%">
                <Card className="border-white/10 glass rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <CardHeader className="border-b border-white/5 py-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <CardTitle className="font-montserrat uppercase tracking-widest text-sm font-black text-primary/80">Movement History</CardTitle>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
                                <TabsList className="grid grid-cols-4 w-full lg:w-[400px] h-12 bg-white/5 rounded-2xl p-1">
                                    <TabsTrigger value="all" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">All</TabsTrigger>
                                    <TabsTrigger value="deposit" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Inbound</TabsTrigger>
                                    <TabsTrigger value="withdrawal" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Outbound</TabsTrigger>
                                    <TabsTrigger value="trade" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Trade</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {filteredTransactions.length > 0 ? (
                            <div className="space-y-2">
                                {filteredTransactions.map((tx) => {
                                    const typeConfig = getTypeConfig(tx.type);
                                    const statusConfig = getStatusConfig(tx.status);
                                    const TypeIcon = typeConfig.icon;
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <div
                                            key={tx.id}
                                            className="flex items-center justify-between p-6 hover:bg-white/5 transition-all duration-300 border-b last:border-0 border-white/5"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center border transition-colors", typeConfig.bg, typeConfig.color.replace('text-', 'border-').replace('500', '500/20'))}>
                                                    <TypeIcon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                                        {tx.type} {tx.description && <span className="text-muted-foreground/40 font-bold ml-2">[{tx.description}]</span>}
                                                    </p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                                                            {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">•</span>
                                                        <span className={cn("text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 px-2 py-0.5 rounded-full", statusConfig.bg, statusConfig.color)}>
                                                            <StatusIcon className="h-3 w-3" />
                                                            {statusConfig.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={cn("text-lg font-montserrat font-black tracking-tighter", typeConfig.color)}>
                                                    {typeConfig.sign}
                                                    {Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 4 })}
                                                    <span className="text-[10px] ml-2 opacity-50">{tx.currency}</span>
                                                </p>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30 mt-1">
                                                    ID: {tx.id.slice(0, 12)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                                    <Filter className="h-8 w-8 opacity-50" />
                                </div>
                                <h3 className="font-semibold mb-1">No transactions found</h3>
                                <p className="text-sm text-muted-foreground">
                                    {activeTab === "all"
                                        ? "Your transaction history will appear here."
                                        : `No ${activeTab} transactions found.`}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Reveal>
        </div>
    );
}
