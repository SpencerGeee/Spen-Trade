"use client";

import { useState } from "react";
import { Search, ChevronDown, Coins, CreditCard, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/reveal";

export default function TradeWidget() {
    const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");

    return (
        <Reveal width="100%" direction="up" delay={0.2} className="relative z-20 -mt-12 container max-w-4xl mx-auto px-4">
            <div className="bg-[#0a0a0f] border border-primary/20 rounded-3xl p-6 shadow-2xl shadow-primary/10 gpu">
                <Tabs defaultValue="buy" className="w-full" onValueChange={(v) => setTradeType(v as "buy" | "sell")}>
                    <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-1 rounded-2xl mb-8 h-14">
                        <TabsTrigger
                            value="buy"
                            className="rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all text-lg font-semibold"
                        >
                            I want to buy
                        </TabsTrigger>
                        <TabsTrigger
                            value="sell"
                            className="rounded-xl data-[state=active]:bg-zinc-800 data-[state=active]:text-white transition-all text-lg font-semibold"
                        >
                            I want to sell
                        </TabsTrigger>
                    </TabsList>

                    <div className="space-y-4">
                        {/* Crypto Select */}
                        <div className="group relative transition-all">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground group-focus-within:text-primary transition-colors">
                                <Coins className="h-5 w-5" />
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full h-14 pl-12 bg-secondary/30 border-primary/10 rounded-2xl focus:ring-primary/20 text-lg font-medium">
                                    <SelectValue placeholder="All crypto" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All crypto</SelectItem>
                                    <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                                    <SelectItem value="usdt">Tether (USDT)</SelectItem>
                                    <SelectItem value="sol">Solana (SOL)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-[0.3] h-14 flex items-center justify-center bg-secondary/30 border border-primary/10 rounded-2xl text-muted-foreground font-semibold text-lg">
                                I have
                            </div>
                            <div className="flex-1 group relative transition-all">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-full h-14 pl-12 bg-secondary/30 border-primary/10 rounded-2xl focus:ring-primary/20 text-lg font-medium">
                                        <SelectValue placeholder="Payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Any payment method</SelectItem>
                                        <SelectItem value="giftcard">Gift Cards (Amazon, iTunes...)</SelectItem>
                                        <SelectItem value="transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="paypal">PayPal / Venmo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="relative group transition-all">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground group-focus-within:text-primary transition-colors">
                                <DollarSign className="h-5 w-5" />
                            </div>
                            <Input
                                placeholder="Amount"
                                className="h-14 pl-12 pr-16 bg-secondary/30 border-primary/10 rounded-2xl text-lg focus-visible:ring-primary/20"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-800 px-3 py-1 rounded-lg text-xs font-bold text-white tracking-wider">
                                USD
                            </div>
                        </div>

                        {/* Search Button */}
                        <Button
                            className="w-full h-16 rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-green-500/20 active:scale-[0.98]"
                            variant={tradeType === "buy" ? "default" : "secondary"}
                            style={{ backgroundColor: tradeType === "buy" ? "#22c55e" : undefined }}
                        >
                            <Search className="mr-3 h-6 w-6" /> Search
                        </Button>
                    </div>
                </Tabs>
            </div>
        </Reveal>
    );
}
