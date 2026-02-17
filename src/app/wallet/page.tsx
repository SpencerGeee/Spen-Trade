"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"; // assuming hook exists or create it
import { QRCodeSVG } from "qrcode.react"; // Check if installed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WalletPage() {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { connectors, connect } = useConnect();
    // const { toast } = useToast(); // If implemented

    // Internal Wallet Query
    const { data: internalWallet, isLoading: isLoadingInternal } = useQuery({
        queryKey: ["internal-wallet"],
        queryFn: async () => {
            const res = await fetch("/api/wallet");
            if (!res.ok) throw new Error("Failed to fetch wallet");
            return res.json();
        },
    });

    const copyAddress = (addr: string) => {
        navigator.clipboard.writeText(addr);
        // toast({ title: "Address Copied" });
        alert("Address Copied");
    };

    if (isLoadingInternal) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 space-y-8">
            <Reveal direction="down">
                <h1 className="text-3xl font-serif font-bold mb-2">My Wallet</h1>
                <p className="text-muted-foreground">Manage your crypto assets and external connections.</p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Internal SpenTrade Wallet */}
                <Reveal direction="right" width="100%">
                    <Card className="h-full border-primary/20 bg-secondary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <WalletIcon className="h-5 w-5 text-primary" />
                                SpenTrade Vault
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-background/50 p-6 rounded-xl border border-border/50 text-center">
                                <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                                <h2 className="text-4xl font-bold tracking-tight">
                                    ${Number(internalWallet?.balance || 0).toFixed(2)}
                                </h2>
                                <p className="text-xs text-muted-foreground mt-2">{internalWallet?.currency || 'USD'}</p>
                            </div>

                            <Tabs defaultValue="deposit" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="deposit">Deposit</TabsTrigger>
                                    <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                                </TabsList>
                                <TabsContent value="deposit" className="space-y-4 pt-4">
                                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg w-fit mx-auto">
                                        <QRCodeSVG value={internalWallet?.address || ""} size={150} />
                                    </div>
                                    <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                                        <code className="flex-1 text-xs truncate">{internalWallet?.address}</code>
                                        <Button size="icon" variant="ghost" onClick={() => copyAddress(internalWallet?.address)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-center text-muted-foreground">
                                        Send only USDT (ERC20) to this address.
                                    </p>
                                </TabsContent>
                                <TabsContent value="withdraw" className="space-y-4 pt-4">
                                    <div className="p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg text-sm text-yellow-500">
                                        Withdrawals are processed manually for security in beta.
                                    </div>
                                    {/* Withdraw form placeholder */}
                                    <Button className="w-full" disabled>Withdraw Feature Locked</Button>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </Reveal>

                {/* External Web3 Wallet */}
                <Reveal direction="left" width="100%">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>External Wallet</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {!isConnected ? (
                                <div className="text-center py-10 space-y-4">
                                    <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                                        <WalletIcon className="h-8 w-8 opacity-50" />
                                    </div>
                                    <h3 className="font-semibold">Connect your wallet</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                        Connect MetaMask or TrustWallet to interact with smart contracts directly.
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {connectors.map((connector) => (
                                            <Button key={connector.uid} onClick={() => connect({ connector })} variant="outline">
                                                {connector.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                            <span className="font-medium truncate max-w-[150px]">{address}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => disconnect()}>Disconnect</Button>
                                    </div>
                                    {/* Add external balance if needed */}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Reveal>
            </div>

            {/* Transaction History */}
            <Reveal direction="up" delay={0.2}>
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {internalWallet?.transactions?.length > 0 ? (
                            <div className="space-y-4">
                                {internalWallet.transactions.map((tx: any) => (
                                    <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors border-b last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${tx.type === 'DEPOSIT' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {tx.type === 'DEPOSIT' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{tx.type} {tx.status}</p>
                                                <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold text-sm ${tx.type === 'DEPOSIT' ? 'text-green-500' : ''}`}>
                                                {tx.type === 'DEPOSIT' ? '+' : '-'}{Number(tx.amount).toFixed(4)} {tx.currency}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-8">No transactions found.</p>
                        )}
                    </CardContent>
                </Card>
            </Reveal>
        </div>
    );
}
