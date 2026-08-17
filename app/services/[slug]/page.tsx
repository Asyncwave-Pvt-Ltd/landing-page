import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import CTABanner from "@/components/sections/cta-banner";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/i18n/seo";
import { GENERIC_SERVICE_SLUGS, isGenericServiceSlug } from "@/lib/services";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return GENERIC_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isGenericServiceSlug(params.slug)) return {};

  const locale = await getLocale();
  const t = await getTranslations(`metadata.servicePages.${params.slug}`);

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    alternates: alternates(`/services/${params.slug}`, locale),
  };
}

export default async function ServicePage({ params }: Props) {
  if (!isGenericServiceSlug(params.slug)) notFound();

  const t = await getTranslations(`servicePages.${params.slug}`);
  const features = t.raw("features") as { title: string; description: string }[];

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#f7f9fb_0%,#fff_100%)] px-6 pb-14 pt-32 text-center md:px-16">
        <Badge
          variant="outline"
          className="gap-[9px] border-[#FF5722] bg-[#FF572222] px-[15px] py-[7px] font-mono text-[12px] font-medium tracking-[0.06em] text-[#FF5722]"
        >
          <span className="h-[6px] w-[6px] rounded-full bg-[#FF5722]" />
          {t("badge")}
        </Badge>

        <h1 className="mx-auto mt-[26px] max-w-[880px] text-balance text-[40px] font-extrabold leading-[1.06] tracking-[-0.035em] text-[#0D1B2A] md:text-[62px]">
          {t("titlePrefix")}{" "}
          <span className="text-[#FF5722]">{t("titleHighlight")}</span>
        </h1>

        <p className="mx-auto mb-[30px] mt-[22px] max-w-[620px] text-pretty text-[18px] leading-[1.6] text-[#5c6670]">
          {t("subtitle")}
        </p>

        <Link
          href="/contact"
          className="inline-block rounded-xl bg-[#FF5722] px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-[#E64A19]"
        >
          {t("cta")}
        </Link>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#FF5722] hover:shadow-lg"
            >
              <span className="mb-4 block h-[3px] w-8 bg-[#FF5722]" />
              <h2 className="mb-3 text-xl font-bold leading-snug text-[#0D1B2A]">
                {feature.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
