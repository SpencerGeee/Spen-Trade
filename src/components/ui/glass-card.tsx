import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string; // Additional classes for customization
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl",
                    "hover:border-white/20 transition-all duration-300 group",
                    className
                )}
                {...props}
            >
                <div className="relative z-10 p-6">{children}</div>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";
