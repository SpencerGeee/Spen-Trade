"use client";

import { Search, Bell, User } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/50 backdrop-blur-xl px-6 lg:pl-0">
            <div className="flex items-center gap-4 lg:ml-6 flex-1">
                <div className="relative w-full max-w-sm hidden md:flex">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search markets, users..."
                        className="pl-9 bg-secondary/50 border-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ModeToggle />
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary" />
                </Button>
                <div className="flex h-10 items-center justify-center">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-10 w-10 border border-primary/20"
                            }
                        }}
                    />
                </div>
            </div>
        </header>
    );
}
