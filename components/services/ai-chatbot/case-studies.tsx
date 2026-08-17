import { getTranslations } from "next-intl/server";

// ponytail: placeholder deck — every card renders the same sample study.
// Swap for real per-case data (and per-case message keys) when the studies exist.
const CARD_COUNT = 4;

export async function CaseStudyCard() {
  const t = await getTranslations("serviceChatbot");

  return (
    <div className="flex h-full gap-[13px] rounded-[16px] border border-[#e9edf0] bg-white p-[13px] text-left transition-shadow hover:shadow-[0_4px_14px_rgba(12,17,22,.08)]">
      <div className="h-[60px] w-[74px] flex-none rounded-[10px] bg-[repeating-linear-gradient(135deg,#eef1f4_0_8px,#f6f8f9_8px_16px)]" />
      <div className="flex-1">
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-[#8b949c]">
          {t("caseEyebrow")}
        </div>
        <div className="mt-[5px] text-[14.5px] font-bold tracking-[-0.01em]">
          {t("caseTitle")}
        </div>
        <div className="mt-[6px] text-[13px] font-semibold text-[oklch(0.62_0.15_245)]">
          {t("caseLink")}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
    >
      {Array.from({ length: CARD_COUNT }, (_, i) => (
        <div
          key={i}
          className="w-full flex-none snap-start md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
        >
          <CaseStudyCard />
        </div>
      ))}
    </section>
  );
}
