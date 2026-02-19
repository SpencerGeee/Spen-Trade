"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useUser } from "@clerk/nextjs";
import { BadgeCheck, ShieldAlert, User as UserIcon, Wallet, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Reveal } from "@/components/reveal";

export default function ProfilePage() {
    const { user, isLoaded } = useUser();

    // Fetch account stats & KYC from DB
    const { data, isLoading: statsLoading } = useQuery({
        queryKey: ["user-stats"],
        queryFn: async () => {
            const res = await fetch("/api/user/stats");
            if (!res.ok) throw new Error("Failed to fetch stats");
            return res.json();
        },
    });

    if (!isLoaded || statsLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const kycStatus = data?.profile.kycStatus || "PENDING";

    return (
        <div className="container mx-auto space-y-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <Reveal direction="right">
                    <h1 className="text-4xl font-black font-montserrat text-primary tracking-tight">
                        Identity <span className="text-gradient-gold">Protocol</span>
                    </h1>
                </Reveal>
                <Reveal direction="left">
                    <div className="flex gap-4">
                        {/* Future: Add Edit Profile button */}
                    </div>
                </Reveal>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* User Info Card */}
                <Reveal direction="up" delay={0.1} className="md:col-span-2 h-full">
                    <GlassCard className="h-full border-white/10 glass-strong shadow-2xl rounded-[2rem] overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <UserIcon className="h-40 w-40" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 p-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src={user?.imageUrl}
                                    alt={user?.fullName || "User"}
                                    className="h-32 w-32 rounded-full border-4 border-white/5 object-cover shadow-2xl relative z-10"
                                />
                                <div className="absolute bottom-1 right-1 z-20 rounded-full bg-background/80 backdrop-blur-md p-1.5 border border-white/10 shadow-lg">
                                    {kycStatus === "APPROVED" ? (
                                        <BadgeCheck className="h-6 w-6 text-green-500" />
                                    ) : (
                                        <ShieldAlert className="h-6 w-6 text-yellow-500" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 flex-1">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-1">Operative Identity</p>
                                    <h2 className="text-3xl font-montserrat font-black tracking-tight text-foreground">{user?.fullName}</h2>
                                    <p className="text-sm font-mono text-muted-foreground/60 tracking-wider mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 pt-4">
                                    <span className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary shadow-[0_0_10px_rgba(133,109,71,0.2)]">
                                        Commissioned {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2026'}
                                    </span>
                                    <span className="rounded-xl bg-white/5 border border-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        {kycStatus === "APPROVED" ? "Level 2 Clearance" : "Level 1 Clearance"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2 border-t border-white/5 pt-8">
                            <div className="rounded-2xl bg-white/5 p-5 border border-white/5 group/field hover:bg-white/10 transition-colors">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 group-hover/field:text-primary/60 transition-colors">Codename</p>
                                <p className="font-bold text-lg tracking-tight">{user?.username || "Unassigned"}</p>
                            </div>
                            <div className="rounded-2xl bg-white/5 p-5 border border-white/5 group/field hover:bg-white/10 transition-colors">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 group-hover/field:text-primary/60 transition-colors">Serial Key</p>
                                <p className="font-mono text-xs opacity-60 truncate">{user?.id}</p>
                            </div>
                        </div>
                    </GlassCard>
                </Reveal>

                {/* KYC Status Card */}
                <Reveal direction="up" delay={0.2} className="h-full">
                    <GlassCard className="h-full border-white/10 glass-strong shadow-2xl rounded-[2rem] overflow-hidden flex flex-col items-center justify-center text-center p-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50" />
                        <div className="relative z-10 w-full flex flex-col items-center">
                            <div className="rounded-full bg-primary/10 p-5 mb-6 ring-1 ring-primary/20 shadow-[0_0_20px_rgba(133,109,71,0.15)]">
                                <ShieldAlert className="h-10 w-10 text-primary" />
                            </div>

                            <h3 className="text-xl font-montserrat font-black uppercase tracking-widest mb-3">Clearance Status</h3>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-[240px] mb-8">
                                Elevate your institutional access. Complete verification for unrestricted capital flow.
                            </p>

                            <div className="w-full rounded-2xl bg-black/20 p-4 border border-white/5 mb-8">
                                <div className="flex justify-between mb-2">
                                    <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground/60">Current Protocol</span>
                                    <span className="text-[9px] uppercase font-black tracking-widest text-yellow-500">{kycStatus}</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                                </div>
                            </div>

                            <Link href="/dashboard/kyc" className="w-full">
                                <ShinyButton className="w-full rounded-xl font-black uppercase tracking-widest text-[10px] h-12">
                                    {kycStatus === "NOT_STARTED" ? "Initiate Vetting" : kycStatus === "APPROVED" ? "Clearance Active" : "Resume Vetting"}
                                </ShinyButton>
                            </Link>
                        </div>
                    </GlassCard>
                </Reveal>
            </div>

            {/* Quick Stats / Activity Placeholder */}
            <div className="grid gap-6 md:grid-cols-2">
                <Reveal direction="up" delay={0.3} width="100%">
                    <GlassCard className="h-full border-white/10 glass-strong shadow-2xl rounded-[2rem] p-8">
                        <h3 className="mb-6 flex items-center gap-3 text-lg font-montserrat font-black uppercase tracking-widest text-primary/90">
                            <Wallet className="h-5 w-5" />
                            Asset Custody
                        </h3>
                        <div className="space-y-6">
                            <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">Link your secure enclave to view real-time institutional balances.</p>
                            <Link href="/dashboard/wallet" className="block">
                                <ShinyButton className="w-full rounded-xl font-bold uppercase tracking-widest text-xs h-12" icon={false}>Initialize Connection</ShinyButton>
                            </Link>
                        </div>
                    </GlassCard>
                </Reveal>

                <Reveal direction="up" delay={0.4} width="100%">
                    <GlassCard className="h-full border-white/10 glass-strong shadow-2xl rounded-[2rem] p-8">
                        <h3 className="mb-6 flex items-center gap-3 text-lg font-montserrat font-black uppercase tracking-widest text-primary/90">
                            <UserIcon className="h-5 w-5" />
                            Security Protocol
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">Biometric / 2FA</span>
                                <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full font-black uppercase tracking-wider">Active (Clerk)</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">Access Key</span>
                                <span className="text-[10px] text-muted-foreground font-medium italic"> cycled 30d ago</span>
                            </div>
                        </div>
                    </GlassCard>
                </Reveal>
            </div>
        </div>
    );
}
