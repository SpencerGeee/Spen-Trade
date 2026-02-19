"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

export function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isFullWidthPage = pathname.includes('/wallet') || pathname.includes('/transactions');

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Desktop Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-64 transition-all overflow-hidden">
                <DashboardHeader />
                <main className={cn("flex-1", isFullWidthPage ? "p-0" : "p-6 lg:p-8")}>
                    <div className={cn(isFullWidthPage ? "w-full" : "container p-0 mx-auto")}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
