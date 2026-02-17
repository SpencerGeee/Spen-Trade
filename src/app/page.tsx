import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";

// Lazy load off-screen sections for better performance
const MarketTicker = dynamic(() => import("@/components/home/market-ticker"));
const TradeWidget = dynamic(() => import("@/components/home/trade-widget"));
const FeaturesSection = dynamic(() => import("@/components/home/features-section"));
const StatsSection = dynamic(() => import("@/components/home/stats-section"));
const TrustSection = dynamic(() => import("@/components/home/trust-section"));
const TestimonialsSection = dynamic(() => import("@/components/home/testimonials-section"));
const CTASection = dynamic(() => import("@/components/home/cta-section"));

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
