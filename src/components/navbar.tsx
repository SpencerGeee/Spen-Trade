"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/offers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "News", href: "/news" },
];

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Logo />
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="ghost" size="icon" aria-label="Search">
                            <Search className="h-5 w-5" />
                        </Button>
                        <ModeToggle />
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost">Sign In</Button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <Button variant="gold">Get Started</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center gap-2">
                        <ModeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-6 mt-6">
                                    <Logo className="mb-4" />
                                    <div className="flex flex-col gap-4">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "text-lg font-medium transition-colors hover:text-primary",
                                                    pathname === item.href
                                                        ? "text-primary"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <SignedOut>
                                            <SignInButton mode="modal">
                                                <Button variant="outline" className="w-full">Sign In</Button>
                                            </SignInButton>
                                            <SignInButton mode="modal">
                                                <Button variant="gold" className="w-full">Get Started</Button>
                                            </SignInButton>
                                        </SignedOut>
                                        <SignedIn>
                                            <Link href="/dashboard" className="w-full">
                                                <Button variant="outline" className="w-full">Dashboard</Button>
                                            </Link>
                                            <div className="flex items-center justify-between p-2 border rounded-lg">
                                                <span className="text-sm font-medium">Account</span>
                                                <UserButton afterSignOutUrl="/" />
                                            </div>
                                        </SignedIn>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
