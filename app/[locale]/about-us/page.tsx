import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  MessagesSquare,
  BadgeCheck,
  Eye,
  TrendingUp,
} from "lucide-react";
import CTABanner from "@/components/sections/cta-banner";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/i18n/seo";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.about",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    alternates: alternates("/about-us", params.locale),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: alternates("/about-us", params.locale).canonical,
      siteName: "Asyncwave",
      type: "website",
    },
  };
}

// Positional — same order as `about.beliefs` in the message files.
const beliefIcons = [MessagesSquare, BadgeCheck, Eye, TrendingUp];

// Steps 1-3 fill row one left to right; steps 4-6 are pinned right to left on row two.
const stepPlacement = [
  "",
  "",
  "",
  "sm:col-start-3 sm:row-start-2",
  "sm:col-start-2 sm:row-start-2",
  "sm:col-start-1 sm:row-start-2",
];
// Arrow from each step to the next one, following the snake direction.
const stepArrows = [
  { icon: ArrowRight, className: "top-1/2 -right-10 -translate-y-1/2" },
  { icon: ArrowRight, className: "top-1/2 -right-10 -translate-y-1/2" },
  { icon: ArrowDown, className: "-bottom-16 left-1/2 -translate-x-1/2" },
  { icon: ArrowLeft, className: "top-1/2 -left-10 -translate-y-1/2" },
  { icon: ArrowLeft, className: "top-1/2 -left-10 -translate-y-1/2" },
  null,
];

export default async function AboutUsPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "about" });

  const steps = t.raw("steps") as { title: string; description: string }[];
  const beliefs = t.raw("beliefs") as { title: string; description: string }[];

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#0D1B2A] pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            {t("eyebrow")}
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {t("titlePrefix")}{" "}
            <span className="text-[#FF5722]">{t("titleHighlight")}</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="pt-24 pb-12 bg-[#F8F9FA] px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              {t("howEyebrow")}
              <span className="w-6 h-[2px] bg-[#FF5722]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4 leading-tight">
              {t("howTitlePrefix")}{" "}
              <span className="text-[#FF5722]">{t("howTitleHighlight")}</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">{t("howSubtitle")}</p>
          </div>

          {/* Snake flow: steps 1-3 left to right, steps 4-6 right to left */}
          <ol className="grid gap-y-14 sm:grid-cols-3 sm:gap-x-14 sm:gap-y-24">
            {steps.map((step, i) => {
              const Arrow = stepArrows[i];
              return (
                <li
                  key={step.title}
                  className={`group relative ${stepPlacement[i]}`}
                >
                  <div className="relative h-full rounded-xl border border-gray-200 bg-white px-6 pt-8 pb-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5722]/40 hover:shadow-xl">
                    <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF5722] to-[#FF8A50] text-sm font-bold text-white shadow-lg ring-4 ring-[#F8F9FA]">
                      {i + 1}
                    </span>
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#FF5722]/70">
                      {t("stepLabel", {
                        number: String(i + 1).padStart(2, "0"),
                      })}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-[#0D1B2A]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {step.description}
                    </p>
                  </div>

                  {Arrow && (
                    <Arrow.icon
                      aria-hidden
                      strokeWidth={2.5}
                      className={`hidden sm:block absolute w-6 h-6 text-[#FF5722]/50 ${Arrow.className}`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <Link
          href="/contact"
          className="mx-auto flex-shrink-0 inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#df542a] text-white font-bold px-8 py-4 rounded transition-colors text-sm uppercase tracking-wide"
        >
          {t("getStarted")} <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* What we believe */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              {t("missionEyebrow")}
              <span className="w-6 h-[2px] bg-[#FF5722]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4">
              {t("missionTitle")}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t("missionSubtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefs.map((belief, i) => {
              const Icon = beliefIcons[i];
              return (
                <div key={belief.title} className="text-center">
                  <div className="inline-flex w-16 h-16 rounded-full bg-[#FF5722] items-center justify-center shadow-lg mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">
                    {belief.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {belief.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-[#0D1B2A] py-20 px-4">
        <p className="max-w-3xl mx-auto text-center text-2xl md:text-3xl font-extrabold text-white leading-snug">
          {t("closingPrefix")}{" "}
          <span className="text-[#FF5722]">{t("closingHighlight")}</span>{" "}
          {t("closingSuffix")}
        </p>
      </section>

      <CTABanner />
    </main>
  );
}
