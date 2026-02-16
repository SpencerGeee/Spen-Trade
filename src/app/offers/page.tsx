"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, TrendingUp, TrendingDown, Filter, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-primary">Marketplace</h1>
                    <p className="text-muted-foreground mt-1">Browse live P2P trading offers</p>
                </div>
                <Link href="/offers/create">
                    <ShinyButton>
                        <Plus className="h-4 w-4 mr-1" /> Create Offer
                    </ShinyButton>
                </Link>
            </div>

            {/* Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Filter className="h-4 w-4" /> Filters:
                    </div>
                    <Tabs value={filterType} onValueChange={setFilterType}>
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="BUY" className="gap-1"><TrendingUp className="h-3 w-3" /> Buy</TabsTrigger>
                            <TabsTrigger value="SELL" className="gap-1"><TrendingDown className="h-3 w-3" /> Sell</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Select value={filterCrypto} onValueChange={setFilterCrypto}>
                        <SelectTrigger className="w-40 bg-background/50"><SelectValue placeholder="Crypto" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Crypto</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="USDT">USDT</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </GlassCard>

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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer) => (
                        <GlassCard key={offer.id} className="flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${offer.type === "BUY"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}>
                                        {offer.type === "BUY" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        {offer.type}
                                    </span>
                                    <span className="text-sm font-mono text-primary">
                                        {offer.cryptocurrency}/{offer.fiatCurrency}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Price</span>
                                        <span className="font-medium">
                                            {offer.priceType === "MARKET"
                                                ? `Market +${offer.priceMargin || 0}%`
                                                : `${Number(offer.fixedPrice).toLocaleString()} ${offer.fiatCurrency}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Limit</span>
                                        <span className="font-medium">
                                            {Number(offer.minAmount).toLocaleString()} - {Number(offer.maxAmount).toLocaleString()} {offer.fiatCurrency}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Payment</span>
                                        <span className="font-medium">{PAYMENT_LABELS[offer.paymentMethod] || offer.paymentMethod}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                        {offer.user.username?.[0]?.toUpperCase() || "?"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{offer.user.username || "Anonymous"}</p>
                                        {offer.user.kycStatus === "APPROVED" && (
                                            <span className="flex items-center gap-1 text-xs text-green-500">
                                                <ShieldCheck className="h-3 w-3" /> Verified
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <Link href={`/trade/new?offerId=${offer.id}`}>
                                    <ShinyButton icon={false} className="text-sm px-4 py-2">
                                        Trade
                                    </ShinyButton>
                                </Link>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
}
