"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { use, useState, useRef, useEffect } from "react";
import {
    Send,
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Clock,
    Banknote,
    Lock,
    Loader2,
} from "lucide-react";
import { pusherClient } from "@/lib/pusher";

interface TradePageProps {
    params: Promise<{ tradeId: string }>;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    PENDING: { label: "Awaiting Escrow", color: "text-yellow-500", icon: <Clock className="h-5 w-5" /> },
    ESCROW_LOCKED: { label: "Escrow Locked", color: "text-blue-500", icon: <Lock className="h-5 w-5" /> },
    PAID: { label: "Payment Sent", color: "text-cyan-500", icon: <Banknote className="h-5 w-5" /> },
    COMPLETED: { label: "Completed", color: "text-green-500", icon: <CheckCircle2 className="h-5 w-5" /> },
    DISPUTE: { label: "In Dispute", color: "text-red-500", icon: <AlertTriangle className="h-5 w-5" /> },
    CANCELLED: { label: "Cancelled", color: "text-gray-500", icon: <XCircle className="h-5 w-5" /> },
};

export default function TradePage({ params }: TradePageProps) {
    const { tradeId } = use(params);
    const { user } = useUser();
    const queryClient = useQueryClient();
    const [message, setMessage] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch trade details with escrow
    const { data: trade, isLoading } = useQuery({
        queryKey: ["trade", tradeId],
        queryFn: async () => {
            const res = await fetch(`/api/trades/${tradeId}`);
            if (!res.ok) throw new Error("Failed to fetch trade");
            return res.json();
        },
        refetchInterval: 3000,
    });

    // Fetch messages
    const { data: messages = [] } = useQuery({
        queryKey: ["trade-messages", tradeId],
        queryFn: async () => {
            const res = await fetch(`/api/trades/${tradeId}/messages`);
            if (!res.ok) throw new Error("Failed to fetch messages");
            return res.json();
        },
        refetchInterval: 3000,
    });

    // Send message mutation
    const sendMessage = useMutation({
        mutationFn: async (content: string) => {
            const res = await fetch(`/api/trades/${tradeId}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            if (!res.ok) throw new Error("Failed to send message");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trade-messages", tradeId] });
            setMessage("");
        },
    });

    // Trade status mutation
    const statusMutation = useMutation({
        mutationFn: async (action: string) => {
            const res = await fetch(`/api/trades/${tradeId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });
            if (!res.ok) throw new Error("Failed to update trade");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trade", tradeId] });
        },
    });

    // Auto-scroll chat & Pusher subscription
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }

        const channel = pusherClient.subscribe(`trade-${tradeId}`);
        channel.bind("new-message", (newMessage: any) => {
            queryClient.setQueryData(["trade-messages", tradeId], (old: any[]) => {
                return [...(old || []), newMessage];
            });
        });

        return () => {
            pusherClient.unsubscribe(`trade-${tradeId}`);
        };
    }, [tradeId, queryClient, messages]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!trade) {
        return (
            <div className="flex h-screen items-center justify-center text-muted-foreground">
                Trade not found
            </div>
        );
    }

    const isBuyer = trade.buyer?.clerkId === user?.id;
    const isSeller = trade.seller?.clerkId === user?.id;
    const statusInfo = STATUS_CONFIG[trade.status] || STATUS_CONFIG.PENDING;
    const escrow = trade.escrow;

    return (
        <div className="container mx-auto grid gap-6 py-8 px-4 lg:grid-cols-3">
            {/* Trade Info Panel */}
            <div className="space-y-6 lg:col-span-1">
                <GlassCard>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold font-montserrat">Trade Details</h2>
                            <span className={`flex items-center gap-1 font-semibold text-sm ${statusInfo.color}`}>
                                {statusInfo.icon} {statusInfo.label}
                            </span>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between p-3 rounded-xl glass">
                                <span className="text-muted-foreground">Amount (Fiat)</span>
                                <span className="font-bold">{Number(trade.amountFiat).toLocaleString()} {trade.offer?.fiatCurrency}</span>
                            </div>
                            <div className="flex justify-between p-3 rounded-xl glass">
                                <span className="text-muted-foreground">Amount (Crypto)</span>
                                <span className="font-bold">{Number(trade.amountCrypto).toFixed(6)} {trade.offer?.cryptocurrency}</span>
                            </div>
                            <div className="flex justify-between p-3 rounded-xl glass">
                                <span className="text-muted-foreground">Fee</span>
                                <span className="font-bold">{Number(trade.fee).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between p-3 rounded-xl glass">
                                <span className="text-muted-foreground">Payment</span>
                                <span className="font-bold">{trade.offer?.paymentMethod}</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Escrow Status */}
                <GlassCard>
                    <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold">Escrow Protection</h3>
                    </div>
                    {escrow ? (
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-bold text-green-500">{escrow.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-bold">{escrow.amountCrypto} {escrow.cryptocurrency}</span>
                            </div>
                            <p className="text-xs text-muted-foreground break-all mt-2">
                                Address: {escrow.escrowAddress}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Escrow not yet funded. Seller must lock funds to proceed.
                        </p>
                    )}
                </GlassCard>

                {/* Action Buttons */}
                <GlassCard>
                    <div className="space-y-3">
                        {/* Seller: Fund Escrow */}
                        {isSeller && trade.status === "PENDING" && (
                            <ShinyButton
                                className="w-full"
                                onClick={() => statusMutation.mutate("FUND_ESCROW")}
                                disabled={statusMutation.isPending}
                            >
                                <Lock className="mr-2 h-4 w-4" /> Lock Crypto in Escrow
                            </ShinyButton>
                        )}

                        {/* Buyer: Mark as Paid */}
                        {isBuyer && trade.status === "ESCROW_LOCKED" && (
                            <ShinyButton
                                className="w-full"
                                onClick={() => statusMutation.mutate("PAID")}
                                disabled={statusMutation.isPending}
                            >
                                <Banknote className="mr-2 h-4 w-4" /> I Have Paid
                            </ShinyButton>
                        )}

                        {/* Seller: Release Crypto */}
                        {isSeller && trade.status === "PAID" && (
                            <ShinyButton
                                className="w-full"
                                onClick={() => statusMutation.mutate("RELEASE")}
                                disabled={statusMutation.isPending}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Release Crypto
                            </ShinyButton>
                        )}

                        {/* Dispute & Cancel */}
                        {trade.status !== "COMPLETED" && trade.status !== "CANCELLED" && (
                            <>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => statusMutation.mutate("DISPUTE")}
                                    disabled={statusMutation.isPending}
                                >
                                    <AlertTriangle className="mr-2 h-4 w-4" /> Open Dispute
                                </Button>
                                {(trade.status === "PENDING" || trade.status === "ESCROW_LOCKED") && (
                                    <Button
                                        variant="ghost"
                                        className="w-full text-muted-foreground"
                                        onClick={() => statusMutation.mutate("CANCEL")}
                                        disabled={statusMutation.isPending}
                                    >
                                        Cancel Trade
                                    </Button>
                                )}
                            </>
                        )}

                        {/* Completed badge */}
                        {trade.status === "COMPLETED" && (
                            <div className="text-center py-4 text-green-500">
                                <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
                                <p className="font-semibold">Trade Completed</p>
                                <p className="text-xs text-muted-foreground">Crypto has been released</p>
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>

            {/* Chat Panel */}
            <GlassCard className="lg:col-span-2 flex flex-col h-[70vh]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <h2 className="text-xl font-bold font-montserrat">Trade Chat</h2>
                    <span className="text-xs text-muted-foreground">
                        {isBuyer ? "Buyer" : "Seller"} • Trading with{" "}
                        <span className="text-primary font-medium">
                            {isBuyer ? trade.seller?.username : trade.buyer?.username || "Anonymous"}
                        </span>
                    </span>
                </div>

                <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                    <div className="space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-16 text-muted-foreground">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((msg: any) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.senderId === user?.id
                                            ? "bg-primary text-primary-foreground rounded-br-sm"
                                            : "glass rounded-bl-sm"
                                            }`}
                                    >
                                        <p className="text-sm">{msg.content}</p>
                                        <p className="text-xs opacity-60 mt-1">
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>

                <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto">
                    <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="glass"
                        disabled={trade.status === "COMPLETED" || trade.status === "CANCELLED"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && message.trim()) {
                                sendMessage.mutate(message.trim());
                            }
                        }}
                    />
                    <Button
                        size="icon"
                        className="shrink-0"
                        onClick={() => {
                            if (message.trim()) sendMessage.mutate(message.trim());
                        }}
                        disabled={!message.trim() || sendMessage.isPending || trade.status === "COMPLETED" || trade.status === "CANCELLED"}
                    >
                        {sendMessage.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </GlassCard>
        </div>
    );
}
