import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseStudies, type CaseStudy } from "@/lib/case-studies";

const SERVICE = "ai-chatbot";

export function CaseStudyCard({
  study,
  linkLabel,
}: {
  study: CaseStudy;
  linkLabel: string;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="flex h-full gap-[13px] rounded-[16px] border border-[#e9edf0] bg-white p-[13px] text-left transition-shadow hover:shadow-[0_4px_14px_rgba(12,17,22,.08)]"
    >
      {study.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={study.coverImage.url}
          alt={study.coverImage.alt}
          className="h-[60px] w-[74px] flex-none rounded-[10px] object-cover"
        />
      ) : (
        <div className="h-[60px] w-[74px] flex-none rounded-[10px] bg-[repeating-linear-gradient(135deg,#eef1f4_0_8px,#f6f8f9_8px_16px)]" />
      )}
      <div className="flex-1">
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-[#8b949c]">
          {study.eyebrow}
        </div>
        <div className="mt-[5px] text-[14.5px] font-bold tracking-[-0.01em]">
          {study.title}
        </div>
        <div className="mt-[6px] text-[13px] font-semibold text-[oklch(0.62_0.15_245)]">
          {linkLabel}
        </div>
      </div>
    </Link>
  );
}

export default async function CaseStudies() {
  const [t, studies] = await Promise.all([
    getTranslations("serviceChatbot"),
    getCaseStudies(SERVICE),
  ]);

  if (studies.length === 0) return null;

  return (
    <section
      id="case-studies"
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
    >
      {studies.map((study) => (
        <div
          key={study.slug}
          className="w-full flex-none snap-start md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
        >
          <CaseStudyCard study={study} linkLabel={t("caseLink")} />
        </div>
      ))}
    </section>
  );
}
