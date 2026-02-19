"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";

export function Footer() {
    const pathname = usePathname();

    // Dashboard has its own layout — hide the global Footer
    if (pathname.startsWith("/dashboard")) return null;

    return (
        <footer className="bg-background border-t">
            <div className="container py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    <Reveal delay={0.1}>
                        <div className="flex flex-col gap-6">
                            <Logo className="text-2xl" />
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-medium opacity-80">
                                SpenTrade redefines peer-to-peer crypto exchange through architectural precision and elite security.
                            </p>
                            <div className="flex gap-5 mt-2">
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                                    <Linkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                        <Reveal delay={0.2}>
                            <div className="flex flex-col gap-4">
                                <h3 className="font-montserrat text-lg font-bold tracking-tight uppercase text-primary/80">Platform</h3>
                                <nav className="flex flex-col gap-3">
                                    <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        About Us
                                    </Link>
                                    <Link href="/offers" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        Browse Offers
                                    </Link>
                                    <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        How It Works
                                    </Link>
                                    <Link href="/fees" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        Fees & Limits
                                    </Link>
                                </nav>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="flex flex-col gap-4">
                                <h3 className="font-montserrat text-lg font-bold tracking-tight uppercase text-primary/80">Support</h3>
                                <nav className="flex flex-col gap-3">
                                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        Contact Support
                                    </Link>
                                    <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        FAQ
                                    </Link>
                                    <Link href="/security" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        Security
                                    </Link>
                                    <Link href="/api" className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">
                                        API Documentation
                                    </Link>
                                </nav>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.4}>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-montserrat text-lg font-bold tracking-tight uppercase text-primary/80">Stay Updated</h3>
                            <p className="text-sm text-muted-foreground">
                                Subscribe for elite market updates and the latest SpenTrade narratives.
                            </p>
                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border-primary/50 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <Button variant="gold" className="w-full h-12 rounded-xl font-bold uppercase tracking-wider">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </Reveal>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} SpenTrade. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
