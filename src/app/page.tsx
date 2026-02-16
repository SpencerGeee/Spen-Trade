import { HeroSection } from "@/components/home/hero-section";
import { MarketTicker } from "@/components/home/market-ticker";
import { FeaturesSection } from "@/components/home/features-section";
import { StatsSection } from "@/components/home/stats-section";
import { TrustSection } from "@/components/home/trust-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { TradeWidget } from "@/components/home/trade-widget";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />
      <MarketTicker />
      <TradeWidget />
      <FeaturesSection />
      <StatsSection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
