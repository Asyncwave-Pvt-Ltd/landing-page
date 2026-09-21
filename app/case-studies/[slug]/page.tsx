import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { ArrowLeft, Tag } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/i18n/seo";
import { localeHreflang, type Locale } from "@/i18n/routing";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) return {};

  const locale = await getLocale();
  const path = `/case-studies/${study.slug}`;

  return {
    title: `${study.title} | Asyncwave`,
    description: study.description,
    keywords: study.keywords,
    alternates: alternates(path, locale),
    openGraph: {
      title: study.title,
      description: study.description,
      url: alternates(path, locale).canonical,
      siteName: "Asyncwave",
      type: "article",
      publishedTime: study.publishedAt,
      modifiedTime: study.updatedAt ?? study.publishedAt,
      images: study.coverImage
        ? [{ url: study.coverImage.url, alt: study.coverImage.alt }]
        : [
            {
              url: "https://asyncwave.in/og-image.png",
              width: 1200,
              height: 630,
              alt: study.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  const locale = await getLocale();
  const t = await getTranslations("caseStudy");
  const tPost = await getTranslations("post");
  const dateLocale = localeHreflang[locale as Locale];

  // Studies belong to a service page; fall back to the index when none is set.
  const backHref = study.services[0]
    ? `/services/${study.services[0]}`
    : "/case-studies";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    datePublished: study.publishedAt,
    dateModified: study.updatedAt ?? study.publishedAt,
    author: {
      "@type": "Organization",
      name: "Asyncwave",
      url: "https://asyncwave.in",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://asyncwave.in/#organization",
      name: "Asyncwave",
      logo: {
        "@type": "ImageObject",
        url: "https://asyncwave.in/logo_color.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": alternates(`/case-studies/${study.slug}`, locale).canonical,
    },
    ...(study.coverImage && { image: study.coverImage.url }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen bg-white pt-24">
        {/* Study header */}
        <header className="bg-[#F8F9FA] border-b border-gray-100 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#FF5722] transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("back")}
            </Link>

            <div className="font-mono text-[11px] tracking-[0.06em] text-[#FF5722] mb-4">
              {study.eyebrow}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] leading-tight mb-4">
              {study.title}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              {study.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-sm text-gray-400">
              {new Date(study.publishedAt).toLocaleDateString(dateLocale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Body — CMS renders HTML here */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          {study.body ? (
            <div
              className="prose prose-lg prose-headings:text-[#0D1B2A] prose-headings:font-extrabold prose-a:text-[#FF5722] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0D1B2A] prose-code:text-[#FF5722] prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded max-w-none"
              dangerouslySetInnerHTML={{ __html: study.body }}
            />
          ) : (
            <p className="text-gray-400 text-center py-16">{tPost("loading")}</p>
          )}
        </article>

        {/* CTA */}
        <section className="bg-[#0D1B2A] py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              {tPost("ctaTitle")}
            </h2>
            <p className="text-white/60 mb-8">{tPost("ctaSubtitle")}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold px-8 py-4 rounded transition-colors text-sm uppercase tracking-wide"
            >
              {tPost("ctaButton")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
