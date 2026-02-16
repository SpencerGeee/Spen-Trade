import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Logo className="text-2xl" />
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            SpenTrade is the premier peer-to-peer cryptocurrency trading platform, offering secure, fast, and luxurious trading experiences.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-serif text-lg font-semibold">Platform</h3>
                            <nav className="flex flex-col gap-2">
                                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                                <Link href="/offers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Browse Offers
                                </Link>
                                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    How It Works
                                </Link>
                                <Link href="/fees" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Fees & Limits
                                </Link>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-serif text-lg font-semibold">Support</h3>
                            <nav className="flex flex-col gap-2">
                                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Contact Support
                                </Link>
                                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                                <Link href="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Security
                                </Link>
                                <Link href="/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    API Documentation
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-serif text-lg font-semibold">Stay Updated</h3>
                        <p className="text-sm text-muted-foreground">
                            Subscribe to our newsletter for the latest market updates and platform news.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button variant="gold" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
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
