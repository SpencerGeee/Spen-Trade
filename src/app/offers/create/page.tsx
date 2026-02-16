"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerSchema, OfferFormData } from "@/lib/validations/offer";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CRYPTOS = [
    { value: "ETH", label: "Ethereum (ETH)" },
    { value: "BTC", label: "Bitcoin (BTC)" },
    { value: "USDT", label: "Tether (USDT)" },
    { value: "USDC", label: "USD Coin (USDC)" },
];

const FIATS = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "GHS", label: "Ghana Cedi (GHS)" },
    { value: "NGN", label: "Nigerian Naira (NGN)" },
    { value: "KES", label: "Kenyan Shilling (KES)" },
    { value: "ZAR", label: "South African Rand (ZAR)" },
];

const PAYMENT_METHODS = [
    { value: "BANK_TRANSFER", label: "Bank Transfer" },
    { value: "MOMO", label: "Mobile Money (MoMo)" },
    { value: "GIFTCARD", label: "Gift Card" },
    { value: "PAYPAL", label: "PayPal" },
];

export default function CreateOfferPage() {
    const router = useRouter();

    const form = useForm<OfferFormData>({
        resolver: zodResolver(offerSchema),
        defaultValues: {
            type: "SELL",
            cryptocurrency: "",
            fiatCurrency: "",
            priceType: "MARKET",
            minAmount: 0,
            maxAmount: 0,
            paymentMethod: "",
            terms: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: OfferFormData) => {
            const response = await fetch("/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to create offer");
            return response.json();
        },
        onSuccess: () => {
            router.push("/offers?created=true");
        },
    });

    const offerType = form.watch("type");
    const priceType = form.watch("priceType");

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl font-bold font-serif text-primary">Create an Offer</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Set your trading terms and let buyers or sellers come to you.
                </p>
            </div>

            <GlassCard className="max-w-2xl mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">

                        {/* Buy / Sell Toggle */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>I want to</FormLabel>
                                    <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="BUY" className="gap-2">
                                                <TrendingUp className="h-4 w-4" /> Buy Crypto
                                            </TabsTrigger>
                                            <TabsTrigger value="SELL" className="gap-2">
                                                <TrendingDown className="h-4 w-4" /> Sell Crypto
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="cryptocurrency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cryptocurrency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger className="bg-background/50"><SelectValue placeholder="Select crypto" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {CRYPTOS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fiatCurrency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fiat Currency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger className="bg-background/50"><SelectValue placeholder="Select fiat" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {FIATS.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Price Type */}
                        <FormField
                            control={form.control}
                            name="priceType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price Type</FormLabel>
                                    <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="MARKET">Market Price</TabsTrigger>
                                            <TabsTrigger value="FIXED">Fixed Price</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </FormItem>
                            )}
                        />

                        {priceType === "MARKET" ? (
                            <FormField
                                control={form.control}
                                name="priceMargin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Margin (%)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.1" placeholder="e.g. 2.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name="fixedPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fixed Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="e.g. 3200.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="minAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="10" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="5000" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger className="bg-background/50"><SelectValue placeholder="Select method" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {PAYMENT_METHODS.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trade Terms (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Send proof of payment, release within 15 min..." {...field} className="bg-background/50" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <ShinyButton type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {offerType === "BUY" ? "Create Buy Offer" : "Create Sell Offer"}
                        </ShinyButton>
                    </form>
                </Form>
            </GlassCard>
        </div>
    );
}
