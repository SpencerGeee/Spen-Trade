"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[#0a0a0f]" />

            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass-strong rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto glow-border"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        <Sparkles className="h-4 w-4" />
                        Limited Time
                    </div>

                    <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Ready to Start{" "}
                        <span className="text-gradient-gold">Trading?</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of traders who trust SpenTrade for secure, fast
                        crypto transactions. Create your free account today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button
                                size="lg"
                                variant="gold"
                                className="text-lg px-12 py-7 h-auto rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            No credit card required • Setup in 60 seconds
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
