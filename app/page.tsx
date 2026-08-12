import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import WhyAsyncwave from "@/components/sections/why-asyncwave";
// import CaseStudies from "@/components/sections/case-studies";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of AI projects do you work on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work on a wide range of AI projects including LLM-powered products, AI chatbots, agentic workflow automation, specialized AI solutions (tutors, assistants, recommenders), and web/mobile apps with AI integrations. If it involves AI, we can help.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project timelines vary based on complexity. A basic AI chatbot integration can take 2–4 weeks. A custom AI product typically takes 6–12 weeks. We work in short iteration cycles so you see progress quickly and can provide feedback throughout.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide ongoing support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we offer ongoing support, monitoring, and optimization after launch. AI systems benefit from continuous improvement, and we stay engaged to make sure your product keeps delivering value as your needs evolve.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI models and technologies do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with OpenAI (GPT-4o, o1), Anthropic (Claude), Google (Gemini), and open-source models. On the infra side: AWS, GCP, Azure, LangChain, LlamaIndex, and more. We recommend the best stack for your specific use case.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle data privacy and security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We take data security seriously. We implement best practices including encryption at rest and in transit, secure API key management, and comply with relevant data protection standards. We'll discuss your specific requirements before starting.",
      },
    },
    {
      "@type": "Question",
      name: "What information do you need to provide a quote?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A brief description of your project, your goals, any existing systems it needs to integrate with, and your approximate timeline and budget. Fill in our contact form and we'll get back to you within 24 hours with initial thoughts.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Services />
      <WhyAsyncwave />
      {/* <CaseStudies /> */}
      {/* <Testimonials /> */}
      <FAQ />
      <CTABanner />
    </main>
  );
}
