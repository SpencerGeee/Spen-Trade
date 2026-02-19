"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export function RegisterForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log(values);
            setIsLoading(false);
        }, 2000);
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Full Identity</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Spencer" className="h-14 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all px-6" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px] uppercase font-bold tracking-widest" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Digital Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@infrastructure.com" className="h-14 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all px-6" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px] uppercase font-bold tracking-widest" />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Security Key</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all px-6" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[10px] uppercase font-bold tracking-widest" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Verify Key</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all px-6" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[10px] uppercase font-bold tracking-widest" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20" disabled={isLoading} variant="gold">
                        {isLoading && <Loader2 className="mr-3 h-4 w-4 animate-spin" />}
                        Initialize Identity
                    </Button>
                </form>
            </Form>
            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                    <span className="bg-background px-4 text-muted-foreground/40">
                        Alternative Protocol
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading} className="h-14 rounded-2xl border-white/10 glass text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5">
                Authenticate with Google
            </Button>
            <p className="px-8 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed">
                Already part of the infrastructure?{" "}
                <Link
                    href="/login"
                    className="text-primary hover:text-primary/80 transition-colors underline-offset-4 underline"
                >
                    Authorize Session
                </Link>
            </p>
        </div>
    );
}
