import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/providers/query-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Asyncwave | Assisting Human Intelligence",
  description:
    "AI-powered product development, chatbots, agentic workflows, and web & mobile apps. Asyncwave builds the future with AI — from concept to market.",
  keywords: [
    "AI development",
    "AI chatbot",
    "agentic workflows",
    "web development",
    "mobile app development",
    "AI solutions",
    "LLM integration",
    "AI startup",
  ],
  authors: [{ name: "Asyncwave" }],
  openGraph: {
    title: "Asyncwave | Assisting Human Intelligence",
    description:
      "From concept to market with AI. Chatbots, agentic workflows, specialized AI solutions, and web & mobile apps.",
    url: "https://asyncwave.in",
    siteName: "Asyncwave",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asyncwave | Assisting Human Intelligence",
    description: "AI-powered development studio. We build what others think is too hard.",
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
          {children}
          <Toaster />
        </QueryProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
