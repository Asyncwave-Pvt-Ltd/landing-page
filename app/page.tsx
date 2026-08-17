import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import WhyAsyncwave from "@/components/sections/why-asyncwave";
import FAQ from "@/components/sections/faq";
import CTABanner from "@/components/sections/cta-banner";
import { getLocale, getTranslations } from "next-intl/server";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("faq");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: (t.raw("items") as { q: string; a: string }[]).map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Services />
      <WhyAsyncwave />
      <FAQ />
      <CTABanner />
    </main>
  );
}
