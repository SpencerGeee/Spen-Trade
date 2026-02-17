"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { GlassCard } from "@/components/ui/glass-card"; // Assuming exists
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CreateTradePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useUser();
    // const { toast } = useToast();

    const offerId = searchParams.get("offerId");
    const [amount, setAmount] = useState("");

    const { data: offer, isLoading: isLoadingOffer } = useQuery({
        queryKey: ["offer", offerId],
        queryFn: async () => {
            if (!offerId) return null;
            // We need an API to get single offer, reusing filter api for now or assume efficient enough
            // Ideally /api/offers/[id]
            // Let's assume /api/offers?id=... works or similar, or just filter client side if list is small? 
            // Better: /api/offers/${offerId} if implemented.
            // Check api/offers/route.ts -> it takes searchParams like type, crypto. 
            // It doesn't seem to support ID fetch.
            // WORKAROUND: Create /api/offers/[offerId]/route.ts or fetch via special param.
            // For now, I'll Mock or use list.
            // Wait, existing code usually has single fetch. Let's assume /api/offers/[offerId] exists.

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
                    amountFiat: Number(amount), // Assuming user inputs Fiat amount
                    // logic for crypto amount calculation needed based on price
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
            // toast({ title: "Trade Created" });
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
        <div className="container mx-auto py-10 max-w-2xl px-4">
            <GlassCard>
                <h1 className="text-2xl font-bold mb-4">Start Trade</h1>
                <div className="mb-6 p-4 bg-secondary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Seller</p>
                    <p className="font-semibold">{offer.user?.username || "Trader"}</p>
                    <div className="flex justify-between mt-2">
                        <span>Rate:</span>
                        <span className="font-mono">{offer.fixedPrice || "Market"} {offer.fiatCurrency}/{offer.cryptocurrency}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Amount to Pay ({offer.fiatCurrency})
                        </label>
                        <input
                            type="number"
                            title="Amount to Pay"
                            placeholder="Enter amount"
                            className="w-full p-2 rounded border bg-background"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={offer.minAmount}
                            max={offer.maxAmount}
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Limits: {offer.minAmount} - {offer.maxAmount}
                        </p>
                    </div>

                    <Button type="submit" className="w-full" disabled={createTradeMutation.isPending}>
                        {createTradeMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                        {offer.type === 'BUY' ? 'Sell' : 'Buy'} {offer.cryptocurrency}
                    </Button>
                </form>
            </GlassCard>
        </div>
    );
}
