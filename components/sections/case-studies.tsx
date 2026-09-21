import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseStudies } from "@/lib/case-studies";

/** Newest studies on the home page. Renders nothing until the CMS has some. */
const LIMIT = 4;

export default async function CaseStudies() {
  const [t, studies] = await Promise.all([
    getTranslations("caseStudies"),
    getCaseStudies(),
  ]);

  if (studies.length === 0) return null;

  return (
    <section id="case-studies" className="py-24 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {t("title")}
            </h2>
          </div>
          <p className="text-white/50 max-w-xs text-sm">{t("subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {studies.slice(0, LIMIT).map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group">
              <Card className="h-full bg-[#0F2231] border border-white/10 rounded-lg p-8 hover:border-[#FF5722] transition-colors">
                <span className="inline-block text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
                  {c.eyebrow}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {c.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full border-transparent"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[#FF5722] text-sm font-semibold group-hover:gap-2 transition-all">
                  {t("view")} <ArrowRight className="w-4 h-4" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
