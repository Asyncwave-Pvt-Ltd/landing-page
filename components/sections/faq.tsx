"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What types of AI projects do you work on?",
    a: "We work on a wide range of AI projects including LLM-powered products, AI chatbots, agentic workflow automation, specialized AI solutions (tutors, assistants, recommenders), and web/mobile apps with AI integrations. If it involves AI, we can help.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on complexity. A basic AI chatbot integration can take 2–4 weeks. A custom AI product typically takes 6–12 weeks. We work in short iteration cycles so you see progress quickly and can provide feedback throughout.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes — we offer ongoing support, monitoring, and optimization after launch. AI systems benefit from continuous improvement, and we stay engaged to make sure your product keeps delivering value as your needs evolve.",
  },
  {
    q: "Which AI models and technologies do you work with?",
    a: "We work with OpenAI (GPT-4o, o1), Anthropic (Claude), Google (Gemini), and open-source models. On the infra side: AWS, GCP, Azure, LangChain, LlamaIndex, and more. We recommend the best stack for your specific use case.",
  },
  {
    q: "How do you handle data privacy and security?",
    a: "We take data security seriously. We implement best practices including encryption at rest and in transit, secure API key management, and comply with relevant data protection standards. We'll discuss your specific requirements before starting.",
  },
  {
    q: "What information do you need to provide a quote?",
    a: "A brief description of your project, your goals, any existing systems it needs to integrate with, and your approximate timeline and budget. Fill in our contact form and we'll get back to you within 24 hours with initial thoughts.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-6 leading-tight">
              Frequently Asked<br />
              <span className="text-[#FF5722]">Questions</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Have a question that isn&apos;t answered here? Reach out via the
              contact form and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-semibold text-[#0D1B2A] text-sm pr-4">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF5722] flex items-center justify-center">
                    {openIndex === i ? (
                      <Minus className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-white" />
                    )}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
