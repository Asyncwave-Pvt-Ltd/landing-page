import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import WhyAsyncwave from "@/components/sections/why-asyncwave";
import FAQ from "@/components/sections/faq";
import CTABanner from "@/components/sections/cta-banner";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "faq" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: params.locale,
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
