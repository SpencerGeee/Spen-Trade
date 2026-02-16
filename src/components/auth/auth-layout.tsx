"use client";

import { Reveal } from "@/components/reveal";
import { Logo } from "@/components/logo";

interface AuthLayoutProps {
    children: React.ReactNode;
    image?: string;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, image, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[128px] animate-pulse delay-1000" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                </div>

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Logo />
                </div>
                <div className="relative z-20 mt-auto">
                    <Reveal direction="up" delay={0.4}>
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;SpenTrade has completely transformed how I trade assets. The security and speed are unmatched in the industry.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis, Crypto Investor</footer>
                        </blockquote>
                    </Reveal>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Reveal direction="down" delay={0.1}>
                            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                        </Reveal>
                        <Reveal direction="down" delay={0.2}>
                            <p className="text-sm text-muted-foreground">{subtitle}</p>
                        </Reveal>
                    </div>
                    <Reveal direction="up" delay={0.3} width="100%">
                        {children}
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
