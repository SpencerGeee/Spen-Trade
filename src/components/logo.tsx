import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    isFooter?: boolean;
}

export function Logo({ className, isFooter = false }: LogoProps) {
    return (
        <Link href="/" className={cn("flex items-center gap-2 group", className)}>
            <div className={cn(
                "font-fauna text-2xl tracking-[0.2em] transition-colors uppercase",
                isFooter ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
            )}>
                Spen<span className="text-primary font-garamond">Trade</span>
            </div>
        </Link>
    );
}
