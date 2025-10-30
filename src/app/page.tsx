import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
// import Features from "@/components/home/Features";
import WalletPromo from "@/components/home/WalletPromo";
import PromoBanner from "@/components/home/PromoBanner";
import HowItWorks from "@/components/home/HowItWorks";
import TechLogoBanner from "@/components/home/TechLogoBanner";
import FeatureProducts from "@/components/home/FeatureProducts";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

// Metadata is now handled in root layout.tsx

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section - Trust Building */}
      <Stats />

      {/* Spacer */}
      <div className="h-16 md:h-10"></div>

      {/* Features Section */}
      {/* <Features /> */}

      {/* Wallet Promo - Giới thiệu hệ thống Cá */}
      <WalletPromo />

      {/* Promo Banner Carousel */}
      <PromoBanner />

      {/* How It Works - 3 bước */}
      <HowItWorks />

      {/* Tech Logo Banner */}
      <TechLogoBanner />

      {/* Feature Products Section */}
      <FeatureProducts />

      {/* Testimonials - Customer Reviews */}
      <Testimonials />

      {/* Final CTA - Đăng ký ngay */}
      {/* <FinalCTA /> */}
    </main>
  );
}
