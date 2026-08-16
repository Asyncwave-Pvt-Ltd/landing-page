"use client";

import { Bot, Brain, Rocket, Smartphone, Workflow, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Positional — same order as `services.items` in the message files.
const icons = [Rocket, Bot, Brain, Workflow, Smartphone];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            {t("eyebrow")}
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service, i) => {
            const Icon = icons[i];
            return (
              <Card
                key={service.title}
                className="group bg-white border border-gray-100 rounded-lg p-8 shadow-sm hover:shadow-lg hover:border-[#FF5722] transition-all duration-300 cursor-pointer"
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
              </Card>
            );
          })}

          {/* CTA card */}
          <Card className="bg-[#0D1B2A] rounded-lg p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#0F2231] transition-colors">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                {t("ctaCard.title")}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {t("ctaCard.description")}
              </p>
            </div>
            <Link
              className="mt-8 inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold px-6 py-3 rounded transition-colors w-fit"
              href="/contact"
            >
              {t("ctaCard.button")} <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
