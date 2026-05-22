import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/providers/query-provider";
import { ContactDialogProvider } from "@/components/contact-dialog";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    },
  ],
};

export const metadata: Metadata = {
  title: "AI Development Company India | Asyncwave",
  description:
    "Asyncwave builds AI-powered products, intelligent chatbots, agentic workflows, and web & mobile apps for businesses in India. From concept to production — we ship.",
  keywords: [
    "AI development company India",
    "AI chatbot development India",
    "agentic workflow automation",
    "LLM integration services",
    "hire AI developers India",
    "custom AI solutions India",
    "AI product development",
    "generative AI consulting India",
    "OpenAI GPT-4 integration",
    "AI automation agency India",
    "AI startup India",
    "RAG pipeline development",
    "Claude API integration",
    "LangChain developers India",
  ],
  authors: [{ name: "Asyncwave" }],
  openGraph: {
    title: "AI Development Company India | Asyncwave",
    description:
      "Asyncwave builds AI-powered products, intelligent chatbots, agentic workflows, and web & mobile apps. From concept to production — we ship.",
    url: "https://asyncwave.in",
    siteName: "Asyncwave",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://asyncwave.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asyncwave — AI Development Company India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development Company India | Asyncwave",
    description:
      "Chatbots, agentic workflows, and custom AI solutions built in India. From concept to production.",
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
  alternates: {
    canonical: "https://asyncwave.in",
    languages: {
      "en-IN": "https://asyncwave.in",
    },
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <QueryProvider>
          <ContactDialogProvider>
            {children}
            <Toaster />
          </ContactDialogProvider>
        </QueryProvider>
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
