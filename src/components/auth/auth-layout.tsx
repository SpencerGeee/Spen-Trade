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
                <div className="absolute inset-0 bg-zinc-950" />
                {/* Animated Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(133,109,71,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/50 to-black overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] animate-pulse opacity-50" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] animate-pulse delay-1000 opacity-30" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
                </div>

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Logo />
                </div>
                <div className="relative z-20 mt-auto">
                    <Reveal direction="up" delay={0.4}>
                        <div className="glass p-8 rounded-3xl border-white/5 shadow-2xl space-y-4 max-w-lg">
                            <p className="text-xl font-montserrat italic font-medium leading-relaxed opacity-90">
                                &ldquo;SpenTrade redefines the architecture of trust. The precision in execution and the elite security protocols are truly unparalleled.&rdquo;
                            </p>
                            <div>
                                <p className="font-bold text-primary text-sm uppercase tracking-widest">Sofia Davis</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Institutional Investor</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-4 text-center">
                        <Reveal direction="down" delay={0.1}>
                            <h1 className="text-4xl font-montserrat font-extrabold tracking-tighter uppercase">{title}</h1>
                        </Reveal>
                        <Reveal direction="down" delay={0.2}>
                            <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-60">{subtitle}</p>
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
