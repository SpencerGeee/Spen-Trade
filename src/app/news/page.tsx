"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Clock, TrendingUp, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

interface NewsItem {
    title: string;
    url: string;
    source: string;
    time: string;
    image?: string;
    category?: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                // Using the CryptoCompare free news API (no key required)
                const response = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
                if (!response.ok) throw new Error("Failed to fetch news");
                const data = await response.json();

                // Map CryptoCompare data to our interface
                const formattedNews = (data.Data || []).slice(0, 12).map((item: any) => ({
                    title: item.title,
                    url: item.url || item.guid,
                    source: item.source_info?.name || item.source || "Crypto News",
                    time: item.published_on
                        ? new Date(item.published_on * 1000).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                        })
                        : new Date().toLocaleDateString(),
                    image: item.imageurl || null,
                    category: item.categories?.split("|")[0] || "General"
                }));

                setNews(formattedNews);
                setError(false);
            } catch (err) {
                console.error(err);
                setError(true);
                // Fallback mock data if API fails
                setNews([
                    {
                        title: "Bitcoin Surges Past $100k as Institutional Adoption Accelerates",
                        url: "#",
                        source: "Market Watch",
                        time: "2 hours ago",
                        category: "Bullish"
                    },
                    {
                        title: "Ethereum 2.0 Staking Hits All-Time High Amid Network Upgrades",
                        url: "#",
                        source: "Chain Insights",
                        time: "4 hours ago",
                        category: "Tech"
                    },
                    {
                        title: "Major Banks Integrate Blockchain for Cross-Border Settlements",
                        url: "#",
                        source: "Finance Daily",
                        time: "6 hours ago",
                        category: "Institutional"
                    },
                    {
                        title: "DeFi Protocols See 200% Growth in Total Value Locked",
                        url: "#",
                        source: "DeFi Pulse",
                        time: "Yesterday",
                        category: "Ecosystem"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);


    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="orb orb-gold w-[700px] h-[700px] -top-[15%] -left-[10%] opacity-15" />
                <div className="orb orb-cyan w-[600px] h-[600px] top-[60%] -right-[10%] opacity-10" />
            </div>

            <div className="container relative z-10 px-4 py-20 md:py-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-6">
                        <Reveal delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
                                <TrendingUp className="h-3.5 w-3.5" />
                                Market Intelligence
                            </div>
                        </Reveal>
                        <Reveal delay={0.2} width="100%">
                            <h1 className="text-4xl md:text-7xl font-montserrat font-extrabold tracking-tighter leading-[1.1]">
                                Global <span className="text-gradient-gold">Crypto Narratives</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="text-muted-foreground text-xl max-w-xl font-medium opacity-80 leading-relaxed">
                                Stay ahead of the flux with real-time updates and deep institutional insights.
                            </p>
                        </Reveal>
                    </div>

                    <Button
                        variant="outline"
                        className="rounded-xl glass border-white/10 flex gap-2 h-12"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCw className="h-4 w-4" /> Refresh Feed
                    </Button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[400px] rounded-3xl glass border border-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center p-20 rounded-3xl glass border border-red-500/20 bg-red-500/5 text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Service Temporarily Unavailable</h2>
                        <p className="text-muted-foreground max-w-md mb-8">We're having trouble connecting to the live news feed. Showing recent highlights instead.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl text-left">
                            {news.map((item, idx) => (
                                <Reveal key={idx} delay={idx * 0.1} direction="up" width="100%">
                                    <NewsCard item={item} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {news.map((item, index) => (
                            <Reveal key={index} delay={index * 0.05} direction="up" width="100%">
                                <NewsCard item={item} />
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function NewsCard({ item }: { item: NewsItem }) {
    return (
        <div
            className="group flex flex-col h-full rounded-[2.5rem] glass border border-white/10 overflow-hidden glow-border hover:bg-white/5 transition-all duration-300"
        >
            <div className="relative h-56 w-full overflow-hidden">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center">
                        <Newspaper className="h-16 w-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="glass border-white/20 px-3 py-1 backdrop-blur-md">
                        {item.category}
                    </Badge>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 uppercase tracking-wider font-semibold">
                    <span className="flex items-center gap-1.5 font-bold text-primary">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item.source}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {item.time}
                    </span>
                </div>

                <h3 className="text-xl font-bold font-montserrat leading-tight mb-6 group-hover:text-primary transition-colors flex-1">
                    {item.title}
                </h3>

                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-foreground group/link"
                >
                    Read Full Insight
                    <span className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all duration-300">
                        <ExternalLink className="h-4 w-4" />
                    </span>
                </a>
            </div>
        </div>
    );
}
