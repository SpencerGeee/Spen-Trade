"use client";

import { Preloader } from "@/components/preloader";
import { PageTransition } from "@/components/page-transition";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Preloader />
            <PageTransition>
                {children}
            </PageTransition>
        </>
    );
}
