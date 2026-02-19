"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Code2, Cpu, Database, Palette, Settings, Rocket, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="orb orb-gold w-[600px] h-[600px] -top-[10%] -left-[10%] opacity-20" />
                <div className="orb orb-cyan w-[500px] h-[500px] top-[40%] -right-[10%] opacity-15" />
                <div className="retro-grid opacity-20" />
            </div>

            <div className="container relative z-10 px-4 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Image & Personal Brand */}
                    <motion.div
                        className="lg:col-span-5 flex flex-col items-center lg:items-start"
                    >
                        <Reveal delay={0.1}>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                                <div className="relative bg-background rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-[400px] border border-white/10 shadow-2xl">
                                    <img
                                        src="/spen.webp"
                                        alt="Cyril Spencer"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="eager"
                                    />
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 lg:-right-10 glass p-5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-4 animate-float">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.3em] mb-1">Founding Principal</p>
                                        <p className="text-xl font-black font-montserrat tracking-tight">Cyril Spencer</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <div className="mt-16 text-center lg:text-left">
                            <Reveal delay={0.2}>
                                <h2 className="text-3xl font-montserrat font-bold mb-4">The Visionary Behind <span className="text-primary tracking-tight">SpenTrade</span></h2>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-muted-foreground leading-relaxed max-w-md">
                                    Blending architectural precision with creative soul, Cyril Spencer redefines the boundaries of digital finance.
                                </p>
                            </Reveal>
                        </div>
                    </motion.div>

                    {/* Right Column: Narrative & Technical Prowess */}
                    <motion.div
                        className="lg:col-span-7"
                    >
                        <Reveal delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(133,109,71,0.6)]" />
                                The Principal Architect
                            </div>
                        </Reveal>

                        <Reveal delay={0.2} width="100%">
                            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-8 leading-[1.1]">
                                Crafting Immersive <br />
                                <span className="text-gradient-gold">Institutional Legacies</span>
                            </h1>
                        </Reveal>

                        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-10">
                            <Reveal delay={0.3} width="100%">
                                <p>
                                    I’m a dedicated and forward-thinking Full-Stack Web Developer with a passion for crafting immersive, high-performance digital experiences. My technical arsenal is built for scalability, creativity, and precision.
                                </p>
                            </Reveal>
                            <Reveal delay={0.4} width="100%">
                                <p>
                                    As an expert in the modern digital landscape, I fuse advanced engineering with intuitive design, ensuring every pixel serves a purpose and every line of code drives value.
                                </p>
                            </Reveal>
                        </div>

                        {/* Technical Arsenal Grid */}
                        <Reveal delay={0.5} width="100%">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {[
                                    {
                                        icon: Code2,
                                        title: "Front-End Mastery",
                                        desc: "HTML, CSS, JS, Next.js, and TypeScript specialist. Engineering responsive, SEO-optimized application architectures."
                                    },
                                    {
                                        icon: Cpu,
                                        title: "Backend Engineering",
                                        desc: "Architecting scalable Node.js, Express.js, and PHP ecosystems designed for speed, security, and modularity."
                                    },
                                    {
                                        icon: Database,
                                        title: "Data Architecture",
                                        desc: "Relational SQL & Document-based MongoDB models. Ensuring data integrity and high-performance querying."
                                    },
                                    {
                                        icon: Palette,
                                        title: "UI/UX & Interaction",
                                        desc: "Merging design principles with technical execution through micro-interactions and elite animation frameworks."
                                    },
                                ].map((item, id) => (
                                    <div key={id} className="p-6 rounded-2xl glass glow-border hover:bg-white/5 transition-colors group">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold mb-2 text-foreground">{item.title}</h3>
                                        <p className="text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* Platforms & Optimization */}
                        <Reveal delay={0.6}>
                            <div className="flex flex-wrap gap-4 mb-12">
                                <div className="px-4 py-2 rounded-xl border border-white/5 bg-white/5 text-sm flex items-center gap-2">
                                    <Target className="h-4 w-4 text-primary" /> SharePoint & WordPress Specialist
                                </div>
                                <div className="px-4 py-2 rounded-xl border border-white/5 bg-white/5 text-sm flex items-center gap-2">
                                    <Settings className="h-4 w-4 text-primary" /> Performance Optimization Expert
                                </div>
                            </div>
                        </Reveal>

                        {/* Mission Section */}
                        <Reveal delay={0.7} width="100%">
                            <div className="relative p-8 rounded-3xl overflow-hidden border border-primary/20 bg-primary/5">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Rocket className="h-24 w-24 text-primary" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-montserrat font-black mb-4">
                                        The Mission Protocol
                                    </h3>
                                    <p className="text-muted-foreground italic leading-relaxed">
                                        "My mission is simple: to build digital environments that are not only flawless in execution but also deeply engaging and intuitive. I continuously explore emerging technologies to keep every project ahead of the curve."
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <div className="mt-12 flex flex-col sm:flex-row gap-4">
                            <Button size="lg" variant="gold" className="rounded-2xl h-14 px-8 shadow-lg shadow-primary/20">
                                Let's Collaborate
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 glass border-white/10">
                                View Technical Portfolio
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}
