"use client";

const coins = [
    { name: "Bitcoin", symbol: "BTC", price: "$96,432.10", change: "+2.4%", color: "#F7931A" },
    { name: "Ethereum", symbol: "ETH", price: "$2,845.50", change: "+1.8%", color: "#627EEA" },
    { name: "Solana", symbol: "SOL", price: "$145.20", change: "+5.2%", color: "#9945FF" },
    { name: "Tether", symbol: "USDT", price: "$1.00", change: "+0.01%", color: "#26A17B" },
    { name: "BNB", symbol: "BNB", price: "$590.10", change: "-0.5%", color: "#F3BA2F" },
    { name: "XRP", symbol: "XRP", price: "$0.62", change: "+1.2%", color: "#23292F" },
    { name: "Cardano", symbol: "ADA", price: "$0.45", change: "+3.1%", color: "#0033AD" },
    { name: "Polygon", symbol: "MATIC", price: "$0.89", change: "+1.5%", color: "#8247E5" },
];

function CoinItem({ coin }: { coin: typeof coins[0] }) {
    const isPositive = coin.change.startsWith("+");
    return (
        <div className="flex items-center gap-3 px-4 shrink-0">
            <div
                className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: coin.color }}
            >
                {coin.symbol.slice(0, 2)}
            </div>
            <span className="font-bold text-sm text-foreground whitespace-nowrap">{coin.symbol}</span>
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{coin.price}</span>
            <span className={`text-xs font-semibold whitespace-nowrap ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? "▲" : "▼"} {coin.change}
            </span>
        </div>
    );
}

export function MarketTicker() {
    const doubled = [...coins, ...coins];

    return (
        <div className="w-full glass border-y border-white/5 overflow-hidden py-3 relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="marquee-track">
                {doubled.map((coin, index) => (
                    <CoinItem key={`${coin.symbol}-${index}`} coin={coin} />
                ))}
            </div>
        </div>
    );
}
