import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import Features from "@/components/home/Features";
import FeatureProducts from "@/components/home/FeatureProducts";
import TechLogoBanner from "@/components/home/TechLogoBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Promo Banner Carousel */}
      <PromoBanner />

      {/* Tech Logo Banner */}
      <TechLogoBanner />
      
      {/* Feature Products Section */}
      <FeatureProducts />
    </main>
  );
}
