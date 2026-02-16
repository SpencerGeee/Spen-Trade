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
                "font-serif text-2xl font-bold tracking-tight transition-colors",
                isFooter ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
            )}>
                Spen<span className="text-primary italic">Trade</span>
            </div>
        </Link>
    );
}
