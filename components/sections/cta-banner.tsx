"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CTABanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="bg-[#FF5722] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {t("titleLine1")}
              <br className="hidden md:block" />
              {t("titleLine2")}
            </h2>
            <p className="text-white/80 mt-3 max-w-xl">{t("subtitle")}</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#FF5722] font-bold px-8 py-4 rounded transition-colors text-sm uppercase tracking-wide"
          >
            {t("button")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
