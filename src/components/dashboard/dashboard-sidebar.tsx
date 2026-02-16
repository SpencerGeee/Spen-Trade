"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, ArrowLeftRight, History, Settings, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Marketplace", href: "/offers", icon: ArrowLeftRight },
    { name: "Transactions", href: "/dashboard/transactions", icon: History },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background/50 backdrop-blur-xl transition-transform lg:translate-x-0 hidden lg:flex flex-col">
            <div className="flex h-16 items-center px-6 border-b">
                <Logo />
            </div>
            <ScrollArea className="flex-1 px-4 py-6">
                <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(133,109,71,0.2)]"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
            <div className="p-4 border-t">
                <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
