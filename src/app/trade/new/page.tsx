"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { GlassCard } from "@/components/ui/glass-card"; // Assuming exists
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { Suspense } from "react";

function CreateTradeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useUser();

    const offerId = searchParams.get("offerId");
    const [amount, setAmount] = useState("");

    const { data: offer, isLoading: isLoadingOffer } = useQuery({
        queryKey: ["offer", offerId],
        queryFn: async () => {
            if (!offerId) return null;
            const res = await fetch(`/api/offers/${offerId}`);
            if (!res.ok) throw new Error("Offer not found");
            return res.json();
        },
        enabled: !!offerId
    });

    const createTradeMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/trades", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    offerId,
                    amountFiat: Number(amount),
                }),
            });
            if (!res.ok) {
                const err = await res.text();
                throw new Error(err);
            }
            return res.json();
        },
        onSuccess: (data) => {
            router.push(`/trade/${data.id}`);
        },
        onError: (err) => {
            alert("Failed to create trade: " + err.message);
        }
    });

    if (isLoadingOffer) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
    if (!offer) return <div className="p-10 text-center">Offer not found or invalid ID.</div>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTradeMutation.mutate();
    };

    return (
        <div className="container mx-auto py-20 max-w-2xl px-4 relative">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="orb orb-gold w-[400px] h-[400px] -top-20 -left-20 opacity-10" />
            </div>

            <Reveal direction="down" delay={0.1}>
                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                        <ArrowRight className="h-3 w-3" />
                        Execution Protocol
                    </div>
                    <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold tracking-tighter">Initiate <span className="text-gradient-gold">Escrow</span></h1>
                    <p className="text-muted-foreground text-sm font-medium opacity-60 uppercase tracking-widest max-w-sm">Secure your assets within the SpenTrade institutional framework.</p>
                </div>
            </Reveal>

            <Reveal direction="up" delay={0.2} width="100%">
                <GlassCard className="border-white/10 glass-strong shadow-2xl rounded-[2.5rem] p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                        <ArrowRight className="h-32 w-32" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Counterparty</p>
                                <p className="text-sm font-bold tracking-tight">{offer.user?.username || "Trader Alpha"}</p>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Agreed Rate</p>
                                <p className="text-sm font-mono font-bold">
                                    {offer.fixedPrice ? Number(offer.fixedPrice).toLocaleString() : "MARKET"} {offer.fiatCurrency} / {offer.cryptocurrency}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
                                        Liquidity Allocation ({offer.fiatCurrency})
                                    </label>
                                    <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                                        Range: {offer.minAmount} — {offer.maxAmount}
                                    </span>
                                </div>
                                <div className="relative group/input">
                                    <input
                                        type="number"
                                        title="Amount to Pay"
                                        placeholder="0.00"
                                        className="w-full h-20 px-8 rounded-2xl border border-white/10 bg-white/5 text-2xl font-montserrat font-bold tracking-tight focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min={offer.minAmount}
                                        max={offer.maxAmount}
                                        required
                                    />
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-widest text-primary/40 pointer-events-none">
                                        {offer.fiatCurrency}
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-16 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] shadow-xl transition-all hover:scale-[0.99] active:scale-[0.97]"
                                disabled={createTradeMutation.isPending}
                            >
                                {createTradeMutation.isPending ? (
                                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                ) : (
                                    <div className="flex items-center gap-3">
                                        Confirm {offer.type === 'BUY' ? 'Divestment' : 'Acquisition'}
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="flex items-center justify-center gap-2 pt-4">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Secured via Institutional Escrow Layer</p>
                        </div>
                    </div>
                </GlassCard>
            </Reveal>
        </div>
    );
}

export default function CreateTradePage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>}>
            <CreateTradeContent />
        </Suspense>
    );
}
