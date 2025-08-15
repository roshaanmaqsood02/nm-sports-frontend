import CTASection from "../components/CTASection";
import HeroSection from "../components/Hero";
import FeaturePage from "./FeaturePage";
import PricingPage from "./Pricing";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturePage />
      <Testimonials />
      <PricingPage />
      <CTASection />
    </>
  );
}
