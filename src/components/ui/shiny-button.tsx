import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import React from "react";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    icon?: boolean;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
    ({ children, className, icon = true, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/20 hover:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                    {icon && (
                        <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                </span>
                <div className="absolute inset-0 -z-10 translate-y-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-y-[-100%]" />
            </button>
        );
    }
);

ShinyButton.displayName = "ShinyButton";
