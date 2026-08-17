import type { Metadata } from "next";
import CaseStudies from "@/components/services/ai-chatbot/case-studies";
import Hero from "@/components/services/ai-chatbot/hero";
import { getLocale, getTranslations } from "next-intl/server";
import { alternates } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("metadata.serviceChatbot");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    alternates: alternates("/services/ai-chatbot", locale),
  };
}

export default function AIChatbotServicePage() {
  return (
    <div className="max-w-7xl mx-auto mb-8 space-y-4">
      <Hero />
      <CaseStudies />
    </div>
  );
}
