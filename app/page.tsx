import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import WhyAsyncwave from "@/components/sections/why-asyncwave";
import CaseStudies from "@/components/sections/case-studies";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import CTABanner from "@/components/sections/cta-banner";
import ContactSection from "@/components/sections/contact-form";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <WhyAsyncwave />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <ContactSection />
      <Footer />
    </main>
  );
}
