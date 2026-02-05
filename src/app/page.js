import AboutSection from "@/components/HomeComponents/AboutSection";
import Banner from "@/components/HomeComponents/Banner";
import CategoryStrip from "@/components/HomeComponents/CategoryStrip";
import DiscussWithUsSection from "@/components/HomeComponents/DiscussWithUsSection";
import Header from "@/components/Header";
import Partnerships from "@/components/HomeComponents/Partnerships";
import ProductsGrid from "@/components/products/ProductsGrid";
import ServicesSection from "@/components/HomeComponents/ServicesSection";
import StatsStrip from "@/components/HomeComponents/StatsStrip";
import TestimonialsSection from "@/components/HomeComponents/TestimonialsSection";
import VideoSection from "@/components/HomeComponents/VideoSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
   <div className="">
    <Header />
    <Banner />
    <CategoryStrip />
    <AboutSection />
    <Partnerships />
    <ProductsGrid />
    <ServicesSection />
    <VideoSection />
    <StatsStrip />
    <TestimonialsSection />
    <DiscussWithUsSection/>
    <FooterSection />
   </div>
  );
}
