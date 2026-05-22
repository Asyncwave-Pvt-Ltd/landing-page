"use client";

import {
  Bot,
  Brain,
  Rocket,
  Smartphone,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useContactDialog } from "../contact-dialog";

const services = [
  {
    icon: Rocket,
    title: "AI Product Development",
    description:
      "From vision to production — we architect and build AI-powered products end-to-end, handling everything from model integration to deployment.",
  },
  {
    icon: Bot,
    title: "AI Chatbot Development Services",
    description:
      "Intelligent chatbots that understand context, resolve queries instantly, and provide 24/7 support across every channel your customers use.",
  },
  {
    icon: Brain,
    title: "Custom AI Solutions & LLM Integration",
    description:
      "Custom AI experiences — personal tutors, assistants, recommendation engines — tailored to your exact domain and business requirements.",
  },
  {
    icon: Workflow,
    title: "Agentic Workflow Automation",
    description:
      "Automate complex multi-step processes: report generation, customer management, sales pipelines — let agents do the heavy lifting.",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Development",
    description:
      "High-performance web and mobile apps with cloud deployment, scalability, and ongoing support built in from the ground up.",
  },
];

export default function Services() {
  const contactDialog = useContactDialog();
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            What We Do
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4">
            Exclusive AI Development Services
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We combine deep AI expertise with solid engineering to deliver
            products that truly work.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group bg-white border border-gray-100 rounded-lg p-8 shadow-sm hover:shadow-lg hover:border-[#FF5722] transition-all duration-300 cursor-pointer"
                // onClick={() => scrollToElement("contact")}
              >
                {/* Orange circle icon */}
                <div className="flex gap-2 items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF5722] flex items-center justify-center group-hover:bg-[#E64A19] transition-colors">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0D1B2A] leading-snug">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* <span className="inline-flex items-center gap-1 text-[#FF5722] text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span> */}
              </Card>
            );
          })}

          {/* CTA card */}
          <Card
            className="bg-[#0D1B2A] rounded-lg p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#0F2231] transition-colors"
            // onClick={() => scrollToElement("contact")}
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                Have a custom AI project in mind?
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Tell us your challenge — we'll figure out the best solution
                together.
              </p>
            </div>
            <Button
              className="mt-8 inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold px-6 py-3 rounded transition-colors w-fit"
              onClick={() => contactDialog?.openDialog()}
            >
              Talk to Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
