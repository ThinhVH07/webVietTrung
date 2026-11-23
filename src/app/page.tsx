import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import FeatureGrid from "@/components/home/FeatureGrid";
import TimelineProcess from "@/components/home/TimelineProcess";
import LatestNews from "@/components/home/LatestNews";
import CTABanner from "@/components/home/CTABanner";
import PartnersSection from "@/components/home/PartnersSection";
import LazySection from "@/components/ui/LazySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsCounter />

      {/* FeatureGrid mounts immediately to pre-load programs without skeleton delay */}
      <LazySection minHeight="650px" rootMargin="350px">
        <FeatureGrid />
      </LazySection>

      {/* TimelineProcess uses native position: sticky card stacking, rendered without contentVisibility */}
      <TimelineProcess />

      <LazySection minHeight="550px" deferMount>
        <LatestNews />
      </LazySection>

      <LazySection minHeight="500px" deferMount>
        <CTABanner />
      </LazySection>

      <LazySection minHeight="400px" deferMount>
        <PartnersSection />
      </LazySection>
    </>
  );
}
