"use client";

import { motion } from "framer-motion";

const coins = [
    { name: "Bitcoin", symbol: "BTC", price: "$96,432.10", change: "+2.4%" },
    { name: "Ethereum", symbol: "ETH", price: "$2,845.50", change: "+1.8%" },
    { name: "Solana", symbol: "SOL", price: "$145.20", change: "+5.2%" },
    { name: "Tether", symbol: "USDT", price: "$1.00", change: "+0.01%" },
    { name: "BNB", symbol: "BNB", price: "$590.10", change: "-0.5%" },
    { name: "XRP", symbol: "XRP", price: "$0.62", change: "+1.2%" },
];

export function MarketTicker() {
    return (
        <div className="w-full bg-secondary/30 border-y border-border overflow-hidden py-3">
            <div className="flex w-full whitespace-nowrap">
                <motion.div
                    className="flex gap-12 items-center"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {[...coins, ...coins, ...coins, ...coins].map((coin, index) => (
                        <div key={`${coin.symbol}-${index}`} className="flex items-center gap-3">
                            <span className="font-bold text-sm text-foreground">{coin.symbol}</span>
                            <span className="text-sm font-medium text-muted-foreground">{coin.price}</span>
                            <span className={`text-xs font-semibold ${coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {coin.change}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
