import AboutSection from '@/components/HomeComponents/AboutSection';
import Banner from '@/components/HomeComponents/Banner';
import CategoryStrip from '@/components/HomeComponents/CategoryStrip';
import MarqueeStrip from '@/components/HomeComponents/MarqueeStrip';
import Partnerships from '@/components/HomeComponents/Partnerships';
import ProductsGrid from '@/components/products/ProductsGrid';
import ServicesSection from '@/components/HomeComponents/ServicesSection';
import StatsStrip from '@/components/HomeComponents/StatsStrip';
import TestimonialsSection from '@/components/HomeComponents/TestimonialsSection';
import VideoSection from '@/components/HomeComponents/VideoSection';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Home() {
  return (
    <div className="">
      <div className="h-dvh flex flex-col overflow-hidden">
        <Banner />
        <MarqueeStrip />
      </div>
      <RevealOnScroll>
        <CategoryStrip />
      </RevealOnScroll>
      <RevealOnScroll>
        <AboutSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <Partnerships />
      </RevealOnScroll>
      <RevealOnScroll>
        <ProductsGrid />
      </RevealOnScroll>
      <RevealOnScroll>
        <ServicesSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <VideoSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <StatsStrip />
      </RevealOnScroll>
      <RevealOnScroll>
        <TestimonialsSection />
      </RevealOnScroll>
    </div>
  );
}
