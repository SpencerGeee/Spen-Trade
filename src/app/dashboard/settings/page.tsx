"use client";

import { useUser } from "@clerk/nextjs";
import { Reveal } from "@/components/reveal";
import {
    User,
    Shield,
    Bell,
    CreditCard,
    Loader2,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { user } = useUser();

    const { data, isLoading } = useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const res = await fetch("/api/user/profile");
            if (!res.ok) throw new Error("Failed to fetch profile");
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const kycStatus = data?.kycStatus || "PENDING";
    const kycConfigs = {
        APPROVED: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Verified" },
        PENDING: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending Review" },
        REJECTED: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Rejected" },
    };
    const kycConfig = kycConfigs[kycStatus as keyof typeof kycConfigs] || kycConfigs.PENDING;

    const KycIcon = kycConfig.icon;

    return (
        <div className="space-y-8">
            <div className="space-y-4 mb-12">
                <Reveal direction="down" delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                        <User className="h-3 w-3" />
                        Infrastructure Config
                    </div>
                </Reveal>
                <Reveal direction="down" delay={0.2} width="100%">
                    <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold tracking-tighter">System <span className="text-gradient-gold">Preferences</span></h1>
                </Reveal>
                <Reveal direction="down" delay={0.3}>
                    <p className="text-muted-foreground text-lg font-medium opacity-80 max-w-2xl">
                        Calibrate your secure environment and institutional identity protocols.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Card */}
                <Reveal direction="up" delay={0.1} width="100%">
                    <Card className="h-full border-white/10 glass-strong shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="flex items-center gap-3 font-montserrat uppercase tracking-widest text-sm font-black text-primary/80">
                                <User className="h-5 w-5" />
                                Master Identity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-8">
                            <div className="flex items-center gap-6">
                                {user?.imageUrl ? (
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <img
                                            src={user.imageUrl}
                                            alt="Profile"
                                            className="h-20 w-20 rounded-full object-cover border-2 border-primary/20 relative z-10"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                                        <User className="h-10 w-10 text-primary" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-montserrat font-black tracking-tight">{user?.fullName || "Operator"}</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{user?.primaryEmailAddress?.emailAddress}</p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-white/5 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Identifier</span>
                                    <span className="text-[10px] font-black tracking-widest text-primary/80 uppercase">PRTCL-{user?.id?.slice(-8)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Commissioned</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Reveal>

                {/* KYC Status Card */}
                <Reveal direction="up" delay={0.2} width="100%">
                    <Card className="h-full border-white/10 glass-strong shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="flex items-center gap-3 font-montserrat uppercase tracking-widest text-sm font-black text-primary/80">
                                <Shield className="h-5 w-5" />
                                Integrity Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-8 flex-1 flex flex-col">
                            <div className={`p-6 rounded-2xl ${kycConfig.bg} border border-white/5 flex items-center gap-4`}>
                                <div className={cn("p-2 rounded-lg bg-white/5", kycConfig.color)}>
                                    <KycIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest leading-none mb-1.5">{kycConfig.label}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">Status: {kycStatus}</p>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 leading-relaxed">
                                Maintaining approved status ensures unhindered access to high-liquidity trading tiers and institutional protocols.
                            </p>
                            <Link href="/dashboard/kyc" className="block mt-auto pt-4">
                                <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20" variant="gold">
                                    {kycStatus === "APPROVED" ? "Audit Documents" : "Initiate Verification"}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Reveal>

                {/* Notifications Card */}
                <Reveal direction="up" delay={0.3} width="100%">
                    <Card className="h-full border-white/10 glass-strong shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="flex items-center gap-3 font-montserrat uppercase tracking-widest text-sm font-black text-primary/80">
                                <Bell className="h-5 w-5" />
                                Alert Protocols
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-4">
                            <div className="space-y-2">
                                {[
                                    { label: "Execution Updates", enabled: true },
                                    { label: "Market Intelligence", enabled: true },
                                    { label: "Security Breach Alerts", enabled: true },
                                    { label: "Institutional Insights", enabled: false },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{item.label}</span>
                                        <div className={cn(
                                            "h-5 w-10 rounded-full transition-all duration-500 cursor-pointer relative border border-white/10 shadow-inner",
                                            item.enabled ? "bg-primary shadow-primary/20" : "bg-white/5"
                                        )}>
                                            <div className={cn(
                                                "h-3.5 w-3.5 rounded-full shadow-lg absolute top-0.5 transition-all duration-500",
                                                item.enabled ? "left-[21px] bg-white" : "left-1 bg-white/20"
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Reveal>

                {/* Payment Methods Card */}
                <Reveal direction="up" delay={0.4} width="100%">
                    <Card className="h-full border-white/10 glass-strong shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="flex items-center gap-3 font-montserrat uppercase tracking-widest text-sm font-black text-primary/80">
                                <CreditCard className="h-5 w-5" />
                                Asset Connect
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6 pt-8 flex flex-col">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                                <div className="flex items-center gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                                        <CreditCard className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Institutional Wallet</p>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mt-1">Multi-Chain Protocol Enabled</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/wallet" className="block mt-auto pt-4">
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 glass text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-white/5 transition-all">
                                    Configure Wallets
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Reveal>
            </div>
        </div>
    );
}
