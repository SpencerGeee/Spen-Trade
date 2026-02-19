"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, TrendingUp, TrendingDown, Filter, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/reveal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Offer {
    id: string;
    type: "BUY" | "SELL";
    cryptocurrency: string;
    fiatCurrency: string;
    priceType: string;
    priceMargin: number | null;
    fixedPrice: number | null;
    minAmount: number;
    maxAmount: number;
    paymentMethod: string;
    terms: string | null;
    user: {
        username: string | null;
        kycStatus: string;
    };
}

const PAYMENT_LABELS: Record<string, string> = {
    BANK_TRANSFER: "Bank Transfer",
    MOMO: "Mobile Money",
    GIFTCARD: "Gift Card",
    PAYPAL: "PayPal",
};

export default function OffersPage() {
    const [filterType, setFilterType] = useState<string>("all");
    const [filterCrypto, setFilterCrypto] = useState<string>("all");

    const { data: offers = [], isLoading } = useQuery<Offer[]>({
        queryKey: ["offers", filterType, filterCrypto],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filterType !== "all") params.set("type", filterType);
            if (filterCrypto !== "all") params.set("crypto", filterCrypto);
            const res = await fetch(`/api/offers?${params.toString()}`);
            return res.json();
        },
    });

    return (
        <div className="container mx-auto space-y-8 py-8 px-4">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-4">
                <div className="space-y-4">
                    <Reveal delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Active Marketplace
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter text-foreground">
                            Browse <span className="text-gradient-gold">Digital Assets</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="text-muted-foreground text-lg font-medium opacity-80">Execution with architectural precision.</p>
                    </Reveal>
                </div>
                <Reveal delay={0.4} direction="left">
                    <Link href="/offers/create">
                        <ShinyButton className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest text-sm">
                            <Plus className="h-5 w-5 mr-2" /> Create Offer
                        </ShinyButton>
                    </Link>
                </Reveal>
            </div>

            {/* Filters */}
            <Reveal delay={0.4}>
                <GlassCard className="p-5 rounded-3xl border-white/5 shadow-2xl">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60">
                            <Filter className="h-4 w-4" /> Filters
                        </div>
                        <div className="h-6 w-px bg-white/10 hidden md:block" />
                        <Tabs value={filterType} onValueChange={setFilterType}>
                            <TabsList className="bg-white/5 rounded-xl h-12 p-1">
                                <TabsTrigger value="all" className="rounded-lg px-6">All</TabsTrigger>
                                <TabsTrigger value="BUY" className="gap-2 rounded-lg px-6"><TrendingUp className="h-3 w-3" /> Buy</TabsTrigger>
                                <TabsTrigger value="SELL" className="gap-2 rounded-lg px-6"><TrendingDown className="h-3 w-3" /> Sell</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Select value={filterCrypto} onValueChange={setFilterCrypto}>
                            <SelectTrigger className="w-44 h-12 bg-white/5 rounded-xl border-white/10 text-sm font-bold"><SelectValue placeholder="Asset Class" /></SelectTrigger>
                            <SelectContent className="glass border-white/10 rounded-2xl">
                                <SelectItem value="all">Global Assets</SelectItem>
                                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                                <SelectItem value="USDT">Tether (USDT)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </GlassCard>
            </Reveal>

            {/* Offers Grid (Bento) */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            ) : offers.length === 0 ? (
                <GlassCard className="text-center py-16">
                    <p className="text-muted-foreground text-lg">No offers found.</p>
                    <p className="text-sm text-muted-foreground mt-2">Be the first to create one!</p>
                    <Link href="/offers/create" className="inline-block mt-6">
                        <ShinyButton><Plus className="h-4 w-4 mr-1" /> Create Offer</ShinyButton>
                    </Link>
                </GlassCard>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer, idx) => (
                        <Reveal key={offer.id} delay={idx * 0.05} direction="up" width="100%">
                            <GlassCard className="flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 rounded-[2.5rem] p-8 border-white/10 shadow-2xl group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    {offer.cryptocurrency === 'BTC' ? '₿' : offer.cryptocurrency === 'ETH' ? 'Ξ' : '$'}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${offer.type === "BUY"
                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                                            }`}>
                                            {offer.type === "BUY" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                            {offer.type} Order
                                        </span>
                                        <span className="text-sm font-black tracking-widest text-primary font-mono bg-primary/5 px-3 py-1 rounded-lg">
                                            {offer.cryptocurrency} / {offer.fiatCurrency}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Unit Price</span>
                                            <span className="text-2xl font-montserrat font-black tracking-tighter">
                                                {offer.priceType === "MARKET"
                                                    ? `MKT +${offer.priceMargin || 0}%`
                                                    : `${Number(offer.fixedPrice).toLocaleString()} ${offer.fiatCurrency}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Liquidity Limit</span>
                                            <span className="text-sm font-bold tabular-nums">
                                                {Number(offer.minAmount).toLocaleString()} - {Number(offer.maxAmount).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Transaction Mode</span>
                                            <span className="text-sm font-bold">{PAYMENT_LABELS[offer.paymentMethod] || offer.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-xs font-black text-primary border border-primary/20">
                                            {offer.user.username?.[0]?.toUpperCase() || "?"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold tracking-tight">{offer.user.username || "Anonymous Trader"}</p>
                                            {offer.user.kycStatus === "APPROVED" && (
                                                <span className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-green-500/80">
                                                    <ShieldCheck className="h-3 w-3" /> High Trust
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Link href={`/trade/new?offerId=${offer.id}`}>
                                        <ShinyButton icon={false} className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
                                            Initiate
                                        </ShinyButton>
                                    </Link>
                                </div>
                            </GlassCard>
                        </Reveal>
                    ))}
                </div>
            )}
        </div>
    );
}
