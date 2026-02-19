"use client";

import { useAccount, useDisconnect, useBalance } from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, TrendingUp, CreditCard } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initOnRamp } from "@coinbase/cbpay-js";

export default function WalletPage() {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Internal Wallet Query
    const { data: internalWallet, isLoading: isLoadingInternal } = useQuery({
        queryKey: ["internal-wallet"],
        queryFn: async () => {
            const res = await fetch("/api/wallet");
            if (!res.ok) throw new Error("Failed to fetch wallet");
            return res.json();
        },
    });

    const handleCoinbaseBuy = useCallback(() => {
        if (!internalWallet?.address) return;

        initOnRamp({
            appId: "0215f143-7371-4ae5-802a-8f71657b9f49",
            widgetParameters: {
                destinationWallets: [
                    {
                        address: internalWallet.address,
                        blockchains: ["ethereum"],
                        assets: ["USDT"]
                    }
                ],
            },
            onExit: () => console.log('Exited Coinbase Pay'),
            onSuccess: () => console.log('Successfully purchased via Coinbase'),
            experienceLoggedIn: 'embedded',
            experienceLoggedOut: 'popup',
        }, (error, instance) => {
            if (error) {
                console.error("Coinbase Onramp Error:", error);
                return;
            }
            if (instance) {
                instance.open();
            }
        });
    }, [internalWallet?.address]);

    const copyAddress = (addr: string) => {
        navigator.clipboard.writeText(addr);
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
        <div className="w-full py-10 space-y-8">
            <div className="space-y-4 mb-12">
                <Reveal direction="down" delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
                        <WalletIcon className="h-3.5 w-3.5" />
                        Asset Custody
                    </div>
                </Reveal>
                <Reveal direction="down" delay={0.2} width="100%">
                    <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter">My <span className="text-gradient-gold">Digital Vault</span></h1>
                </Reveal>
                <Reveal direction="down" delay={0.3}>
                    <p className="text-muted-foreground text-lg font-medium opacity-80 max-w-2xl">
                        Securely manage your global portfolio and fragmented institutional connections.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Internal SpenTrade Wallet */}
                <Reveal direction="right" width="100%" delay={0.4}>
                    <Card className="h-full border-white/10 glass-strong shadow-2xl rounded-[2.5rem] overflow-hidden group">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="flex items-center gap-3 font-montserrat uppercase tracking-widest text-sm font-bold text-primary/80">
                                <WalletIcon className="h-5 w-5" />
                                SpenTrade Institutional Vault
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            <div className="bg-white/5 p-10 rounded-[2rem] border border-white/5 text-center relative overflow-hidden group-hover:bg-white/[0.07] transition-colors">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <TrendingUp className="h-32 w-32" />
                                </div>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Secured Liquidity</p>
                                <h2 className="text-5xl font-montserrat font-black tracking-tighter text-gradient-gold mb-2">
                                    ${Number(internalWallet?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">{internalWallet?.currency || 'USDT PROTOCOL'}</p>
                            </div>

                            <Tabs defaultValue="deposit" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 h-14 bg-white/5 rounded-2xl p-1.5 mb-8">
                                    <TabsTrigger value="deposit" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Inbound Asset</TabsTrigger>
                                    <TabsTrigger value="withdraw" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Outbound Asset</TabsTrigger>
                                </TabsList>
                                <TabsContent value="deposit" className="space-y-6 pt-2">
                                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl w-fit mx-auto shadow-2xl">
                                        <QRCodeSVG value={internalWallet?.address || ""} size={160} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Receive Address (ERC20)</p>
                                        <div className="flex items-center gap-2 glass border-white/10 p-4 rounded-2xl">
                                            <code className="flex-1 text-xs truncate font-mono font-bold tracking-wider">{internalWallet?.address}</code>
                                            <Button size="icon" variant="ghost" onClick={() => copyAddress(internalWallet?.address)} className="hover:bg-primary/10 hover:text-primary rounded-xl">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        {/* Coinbase Buy Button */}
                                        <Button
                                            onClick={handleCoinbaseBuy}
                                            variant="outline"
                                            className="w-full h-14 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-black uppercase tracking-widest text-[10px] gap-3"
                                        >
                                            <CreditCard className="h-4 w-4" />
                                            Purchase via Coinbase Pay
                                        </Button>

                                        <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground/40 px-6">
                                            Transmit only USDT through the Ethereum network. <br />Misdirected assets are unrecoverable.
                                        </p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="withdraw" className="space-y-6 pt-2">
                                    <div className="p-6 border border-primary/20 bg-primary/5 rounded-3xl text-xs font-bold uppercase tracking-[0.15em] text-primary/80 leading-relaxed text-center italic">
                                        Withdrawal protocols are currently operating under manual high-security verification.
                                    </div>
                                    <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs opacity-50 grayscale cursor-not-allowed" disabled>Inquiry Locked (Beta)</Button>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </Reveal>

                {/* External Web3 Wallet */}
                <Reveal direction="left" width="100%" delay={0.5}>
                    <Card className="h-full border-white/10 glass shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="font-montserrat uppercase tracking-widest text-sm font-bold text-muted-foreground/80">External Connection</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            {!(mounted && isConnected) ? (
                                <div className="text-center py-12 space-y-8">
                                    <div className="p-8 bg-primary/5 rounded-[2rem] w-24 h-24 mx-auto flex items-center justify-center border border-primary/10 shadow-inner">
                                        <WalletIcon className="h-10 w-10 text-primary opacity-80" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-montserrat font-black tracking-tight uppercase">Bypass Custody</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 max-w-xs mx-auto leading-relaxed">
                                            Interface with the blockchain via decentralized infrastructure (MetaMask, WalletConnect).
                                        </p>
                                    </div>
                                    <Button onClick={() => open()} variant="gold" size="lg" className="h-14 rounded-2xl w-full max-w-[280px] font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
                                        <WalletIcon className="h-4 w-4 mr-3" />
                                        Initialize Link
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="bg-primary/5 p-6 rounded-3xl border border-primary/20 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Linked Protocol</p>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Active</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 glass border-white/10 rounded-2xl">
                                            <code className="text-xs font-bold tracking-tight truncate max-w-[200px]">{address}</code>
                                            <Button variant="ghost" size="sm" onClick={() => disconnect()} className="h-8 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg">Terminate</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Reveal>
            </div>

            {/* Transaction History */}
            <Reveal direction="up" delay={0.6}>
                <Card className="border-white/10 glass rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <CardHeader className="border-b border-white/5 py-8">
                        <CardTitle className="font-montserrat uppercase tracking-widest text-sm font-black text-primary/80">Audit Trail</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {internalWallet?.transactions?.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {internalWallet.transactions.map((tx: any) => (
                                    <div key={tx.id} className="flex items-center justify-between p-6 hover:bg-white/5 transition-all duration-300">
                                        <div className="flex items-center gap-5">
                                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${tx.type === 'DEPOSIT' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                {tx.type === 'DEPOSIT' ? <ArrowDownLeft className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-black text-[10px] uppercase tracking-widest">{tx.type}</p>
                                                    <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5 ${tx.status === 'COMPLETED' ? 'text-green-500' : 'text-primary'}`}>{tx.status}</span>
                                                </div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-lg font-montserrat font-black tracking-tighter ${tx.type === 'DEPOSIT' ? 'text-green-500' : 'text-white'}`}>
                                                {tx.type === 'DEPOSIT' ? '+' : '-'}{Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 4 })}
                                            </p>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">{tx.currency}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center flex flex-col items-center gap-4">
                                <TrendingUp className="h-12 w-12 text-muted-foreground/20" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">No institutional history found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Reveal>
        </div>
    );
}
