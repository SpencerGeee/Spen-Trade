"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { kycSchema, KycFormData } from "@/lib/validations/kyc";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/ui/glass-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function KycForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const form = useForm<KycFormData>({
        resolver: zodResolver(kycSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            country: "",
            documentType: "PASSPORT",
            documentUrl: "",
        },
        mode: "onChange",
    });

    const mutation = useMutation({
        mutationFn: async (data: KycFormData) => {
            const response = await fetch("/api/kyc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit KYC");
            }
            return response.json();
        },
        onSuccess: () => {
            router.push("/dashboard/profile?kyc=submitted");
        }
    });

    const onSubmit = (data: KycFormData) => {
        mutation.mutate(data);
    };

    const nextStep = async () => {
        const fieldsToValidate = step === 1
            ? ["firstName", "lastName", "dateOfBirth", "country"] as const
            : ["documentType"] as const;

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) setStep(step + 1);
    };

    return (
        <GlassCard className="max-w-2xl mx-auto border-white/10 glass-strong shadow-2xl rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <CheckCircle2 className="h-32 w-32" />
            </div>

            <div className="relative z-10 mb-12">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-1">Clearance Phase</p>
                        <h2 className="text-2xl font-montserrat font-black tracking-tight text-foreground">
                            Identity Verification
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-1">Sequence</p>
                        <span className="text-sm font-black tracking-widest text-primary">{step} / 2</span>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                    <div
                        className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(133,109,71,0.3)]"
                        style={{ width: `${(step / 2) * 100}%` }}
                    />
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Legal Giver Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} className="h-14 rounded-xl border-white/10 bg-white/5 focus:bg-white/10 transition-all font-bold" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Legal Surname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} className="h-14 rounded-xl border-white/10 bg-white/5 focus:bg-white/10 transition-all font-bold" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} className="bg-background/50" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Jurisdiction of Residence</FormLabel>
                                        <FormControl>
                                            {/* In production this would be a comprehensive Select */}
                                            <Input placeholder="Ghana" {...field} className="h-14 rounded-xl border-white/10 bg-white/5 focus:bg-white/10 transition-all font-bold" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                            <FormField
                                control={form.control}
                                name="documentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Document Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-background/50">
                                                    <SelectValue placeholder="Select ID type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="PASSPORT">Passport</SelectItem>
                                                <SelectItem value="ID_CARD">National ID Card</SelectItem>
                                                <SelectItem value="DRIVERS_LICENSE">Driver's License</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="rounded-3xl border-2 border-dashed border-white/10 p-12 text-center hover:bg-white/5 hover:border-primary/20 transition-all duration-500 cursor-pointer group/upload">
                                <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 border border-white/5 group-hover/upload:scale-110 group-hover/upload:bg-primary/10 transition-all duration-500">
                                    <CheckCircle2 className="h-8 w-8 text-primary/40 group-hover/upload:text-primary transition-colors" />
                                </div>
                                <h3 className="text-xl font-montserrat font-black tracking-tight mb-2">Initialize Asset Scan</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 leading-relaxed">
                                    Upload a high-fidelity scan of your primary identification instrument.
                                </p>
                                <p className="text-[9px] font-bold text-primary/40 mt-6 uppercase tracking-[0.3em] font-mono">Secure TLS Uplink Enabled</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-10 border-t border-white/5">
                        {step > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setStep(step - 1)}
                                className="h-14 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] hover:bg-white/5"
                            >
                                Previous Sequence
                            </Button>
                        )}

                        <div className="ml-auto flex gap-4">
                            {step < 2 ? (
                                <ShinyButton
                                    type="button"
                                    onClick={nextStep}
                                    className="h-14 rounded-xl px-10 font-black uppercase tracking-widest text-[10px]"
                                >
                                    Proceed to Governance
                                </ShinyButton>
                            ) : (
                                <ShinyButton
                                    type="submit"
                                    className="h-14 rounded-xl px-10 font-black uppercase tracking-widest text-[10px]"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                                    Finalize Application
                                </ShinyButton>
                            )}
                        </div>
                    </div>
                </form>
            </Form>
        </GlassCard>
    );
}
