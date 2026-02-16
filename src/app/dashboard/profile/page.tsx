"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useUser } from "@clerk/nextjs";
import { BadgeCheck, ShieldAlert, User as UserIcon, Wallet } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    // Mock KYC status for now - will fetch from DB later
    const kycStatus: string = "PENDING"; // NOT_STARTED, PENDING, APPROVED, REJECTED

    return (
        <div className="container mx-auto space-y-8 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif text-primary">My Profile</h1>
                <div className="flex gap-4">
                    {/* Future: Add Edit Profile button */}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* User Info Card */}
                <GlassCard className="md:col-span-2">
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <img
                                src={user?.imageUrl}
                                alt={user?.fullName || "User"}
                                className="h-24 w-24 rounded-full border-2 border-primary object-cover"
                            />
                            <div className="absolute bottom-0 right-0 rounded-full bg-background p-1">
                                {kycStatus === "APPROVED" ? (
                                    <BadgeCheck className="h-6 w-6 text-green-500" />
                                ) : (
                                    <ShieldAlert className="h-6 w-6 text-yellow-500" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
                            <p className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                            <div className="flex items-center gap-2 pt-2">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2026'}
                                </span>
                                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                                    Level 1 Trader
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-background/50 p-4">
                            <p className="text-sm text-muted-foreground">Username</p>
                            <p className="font-medium">{user?.username || "Not set"}</p>
                        </div>
                        <div className="rounded-lg bg-background/50 p-4">
                            <p className="text-sm text-muted-foreground">User ID</p>
                            <p className="font-mono text-xs">{user?.id}</p>
                        </div>
                    </div>
                </GlassCard>

                {/* KYC Status Card */}
                <GlassCard>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="rounded-full bg-primary/10 p-4">
                            <ShieldAlert className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Identity Verification</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Complete KYC to unlock higher withdrawal limits and premium trading features.
                            </p>
                        </div>

                        <div className="w-full rounded-lg bg-background/30 p-3 text-sm">
                            <div className="flex justify-between mb-1">
                                <span>Current Status</span>
                                <span className="font-bold text-yellow-500">{kycStatus}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary">
                                <div className="h-full w-1/3 rounded-full bg-yellow-500" />
                            </div>
                        </div>

                        <Link href="/dashboard/kyc" className="w-full">
                            <ShinyButton className="w-full">
                                {kycStatus === "NOT_STARTED" ? "Start Verification" : "Continue Verification"}
                            </ShinyButton>
                        </Link>
                    </div>
                </GlassCard>
            </div>

            {/* Quick Stats / Activity Placeholder */}
            <div className="grid gap-6 md:grid-cols-2">
                <GlassCard>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <Wallet className="h-5 w-5 text-primary" />
                        Wallet Overview
                    </h3>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">Connect your wallet to see balances.</p>
                        <Link href="/dashboard/wallet">
                            <ShinyButton className="w-full" icon={false}>Connect Wallet</ShinyButton>
                        </Link>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <UserIcon className="h-5 w-5 text-primary" />
                        Account Security
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                            <span>Two-Factor Auth</span>
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">Enabled (Clerk)</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                            <span>Password</span>
                            <span className="text-xs text-muted-foreground">Last changed 30d ago</span>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
