import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { getLocale, getTranslations } from "next-intl/server";
import { alternates } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("metadata.contact");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    alternates: alternates("/contact", locale),
  };
}

// reCAPTCHA provider now lives in the root layout — shared with the chatbot.
export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="bg-card rounded-2xl border p-4 m-4 md:m-6 lg:m-8 mt-20 md:mt-20 lg:mt-20">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-gray-600">{t("subtitle")}</p>
      </div>
      <ContactForm />
    </div>
  );
}
