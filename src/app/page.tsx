import { HeroSection } from "@/components/home/hero-section";
import { MarketTicker } from "@/components/home/market-ticker";
import { FeaturesSection } from "@/components/home/features-section";
import { StatsSection } from "@/components/home/stats-section";
import { CTASection } from "@/components/home/cta-section";
import { Reveal } from "@/components/reveal";
import { TradeWidget } from "@/components/home/trade-widget";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Reveal width="100%" direction="up" delay={0.1}>
        <HeroSection />
      </Reveal>

      <TradeWidget />

      <Reveal width="100%" direction="up" delay={0.2}>
        <MarketTicker />
      </Reveal>

      <Reveal width="100%" direction="up" delay={0.3}>
        <FeaturesSection />
      </Reveal>

      <Reveal width="100%" direction="up" delay={0.4}>
        <StatsSection />
      </Reveal>

      <Reveal width="100%" direction="up" delay={0.5}>
        <CTASection />
      </Reveal>
    </div>
  );
}
