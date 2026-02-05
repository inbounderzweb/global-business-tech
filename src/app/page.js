import AboutSection from "@/components/AboutSection";
import Banner from "@/components/Banner";
import CategoryStrip from "@/components/CategoryStrip";
import DiscussWithUsSection from "@/components/DiscussWithUsSection";
import Header from "@/components/Header";
import Partnerships from "@/components/Partnerships";
import ProductsGrid from "@/components/products/ProductsGrid";
import ServicesSection from "@/components/ServicesSection";
import StatsStrip from "@/components/StatsStrip";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoSection from "@/components/VideoSection";
import Image from "next/image";
import desktopimg from '../assets/desktopbg.jpg';
import mobbg from '../assets/mobbg.jpg'
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
