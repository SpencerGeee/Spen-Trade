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
import { Loader2, CheckCircle2 } from "lucide-react";
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
        <GlassCard className="max-w-2xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                        Identity Verification
                    </h2>
                    <span className="text-sm text-muted-foreground">Step {step} of 2</span>
                </div>
                {/* Progress Bar */}
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
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
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} className="bg-background/50" />
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
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} className="bg-background/50" />
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
                                        <FormLabel>Country of Residence</FormLabel>
                                        <FormControl>
                                            {/* In production this would be a comprehensive Select */}
                                            <Input placeholder="Ghana" {...field} className="bg-background/50" />
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

                            <div className="rounded-lg border-2 border-dashed border-primary/20 p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold">Upload ID Document</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Drag and drop or click to upload front side.
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">(Mock Upload for MVP)</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-6">
                        {step > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setStep(step - 1)}
                            >
                                Back
                            </Button>
                        )}

                        {step < 2 ? (
                            <ShinyButton
                                type="button"
                                onClick={nextStep}
                                className="ml-auto"
                            >
                                Continue
                            </ShinyButton>
                        ) : (
                            <ShinyButton
                                type="submit"
                                className="ml-auto"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit Application
                            </ShinyButton>
                        )}
                    </div>
                </form>
            </Form>
        </GlassCard>
    );
}
