"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare, Globe, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/reveal";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="orb orb-cyan w-[600px] h-[600px] -top-[10%] -right-[10%] opacity-15" />
                <div className="orb orb-gold w-[500px] h-[500px] bottom-[10%] -left-[10%] opacity-10" />
                <div className="retro-grid opacity-15" />
            </div>

            <div className="container relative z-10 px-4 py-20 md:py-32">
                <div className="flex flex-col items-center text-center mb-24">
                    <Reveal delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 glass text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            Communication Protocol
                        </div>
                    </Reveal>

                    <Reveal delay={0.2} width="100%">
                        <h1 className="text-4xl md:text-7xl font-montserrat font-extrabold mb-8 tracking-tighter leading-[1.1]">
                            Architecting Your <br />
                            <span className="text-gradient-gold">Next Great Trade</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed font-medium opacity-80">
                            Our elite team is available 24/7 to ensure your high-value transactions are handled with absolute precision.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Information Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <Reveal delay={0.4} direction="right">
                            <div className="p-8 rounded-3xl glass border border-white/10 glow-border hover:bg-white/5 transition-all group">
                                <div className="flex items-start gap-6">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-4">Direct Uplinks</h3>
                                        <div className="space-y-3">
                                            <a href="tel:0594198370" className="block text-2xl hover:text-primary transition-colors font-montserrat font-bold tracking-tight">0594198370</a>
                                            <a href="tel:0544287261" className="block text-2xl hover:text-primary transition-colors font-montserrat font-bold tracking-tight">0544287261</a>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2 font-medium">
                                            <Clock className="h-4 w-4" /> Available 24/7 for elite inquiries.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.5} direction="right">
                            <div className="p-8 rounded-3xl glass border border-white/10 glow-border hover:bg-white/5 transition-all group">
                                <div className="flex items-start gap-6">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-4">Secure Correspondence</h3>
                                        <a href="mailto:support@spentrade.com" className="text-lg hover:text-primary transition-colors font-bold tracking-tight border-b border-primary/20 pb-1">support@spentrade.com</a>
                                        <p className="text-sm text-muted-foreground mt-4 font-medium">Exceptional response velocity.</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.6} direction="right">
                            <div className="p-8 rounded-3xl glass border border-white/10 glow-border hover:bg-white/5 transition-all group">
                                <div className="flex items-start gap-6">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-4">Global Network</h3>
                                        <p className="text-lg font-bold">Digital Sovereign Presence</p>
                                        <p className="text-sm text-muted-foreground mt-2 font-medium leading-relaxed">Serving an international clientele across 150+ borders.</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.7} direction="right">
                            <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 flex items-center gap-5">
                                <ShieldCheck className="h-10 w-10 text-primary" />
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    All transmissions are secured through military-grade encryption protocols.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <Reveal delay={0.5} direction="left">
                            <div className="p-8 md:p-12 rounded-[3.5rem] glass border border-white/10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Globe className="h-40 w-40 text-primary" />
                                </div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl font-montserrat font-black mb-8 tracking-tighter">Initiate <span className="text-gradient-gold">Protocol</span></h2>

                                    <form className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Legal Identity</label>
                                                <Input id="name" placeholder="John Spencer" className="h-14 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all px-6 font-bold" />
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Digital Address</label>
                                                <Input id="email" type="email" placeholder="john@example.com" className="h-14 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all px-6 font-bold" />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Subject of Matter</label>
                                            <Input id="subject" placeholder="Market Strategy Connection" className="h-14 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all px-6 font-bold" />
                                        </div>

                                        <div className="space-y-3">
                                            <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Detailed Brief</label>
                                            <Textarea id="message" placeholder="Describe your requirements in detail..." className="min-h-[220px] rounded-3xl glass border-white/10 focus:border-primary/50 transition-all p-7 resize-none font-medium" />
                                        </div>

                                        <Button variant="gold" className="w-full h-18 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                            Transmit Request <ArrowRight className="ml-3 h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div >
        </div >
    );
}
