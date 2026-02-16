"use client";

import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

export function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Desktop Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-64 transition-all">
                <DashboardHeader />
                <main className="flex-1 p-6 lg:p-8">
                    <div className="container p-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
