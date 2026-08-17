import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/providers/query-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { RecaptchaProvider } from "@/components/recaptcha-provider";
import { FloatingChatbot } from "@/components/floating-chatbot";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/routing";
import { alternates } from "@/i18n/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://asyncwave.in/#organization",
      name: "Asyncwave",
      url: "https://asyncwave.in",
      logo: {
        "@type": "ImageObject",
        url: "https://asyncwave.in/logo_color.png",
      },
      description:
        "AI-first software studio building chatbots, agentic workflows, and AI-powered products for businesses in India.",
      email: "contact@asyncwave.in",
      sameAs: ["https://github.com/asyncwave-pvt-ltd"],
      areaServed: "IN",
      knowsAbout: [
        "Artificial Intelligence",
        "LLM Integration",
        "AI Chatbot Development",
        "Agentic Workflow Automation",
        "Web Development",
        "Mobile App Development",
        "Generative AI",
        "RAG Pipeline Development",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "50",
        bestRating: "5",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://asyncwave.in/#website",
      url: "https://asyncwave.in",
      name: "Asyncwave",
      description:
        "AI Development Company India — Chatbots, Agents & Custom AI Solutions",
      publisher: { "@id": "https://asyncwave.in/#organization" },
      inLanguage: locales,
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("metadata.home");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "Asyncwave" }],
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: alternates("", locale).canonical,
      siteName: "Asyncwave",
      type: "website",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [
        {
          url: "https://asyncwave.in/og-image.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
      images: ["https://asyncwave.in/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: alternates("", locale),
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
      shortcut: "/favicon.ico",
      other: [{ rel: "manifest", url: "/site.webmanifest" }],
    },
    other: {
      "geo.region": "IN",
      "geo.placename": "India",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={cn("font-sans", inter.variable)}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <QueryProvider>
            <RecaptchaProvider>
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
              <Toaster />
              <FloatingChatbot />
            </RecaptchaProvider>
          </QueryProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}
