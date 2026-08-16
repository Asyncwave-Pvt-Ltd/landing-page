import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/i18n/seo";
import { localeHreflang, type Locale } from "@/i18n/routing";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata.blog",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    alternates: alternates("/blog", params.locale),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: alternates("/blog", params.locale).canonical,
      siteName: "Asyncwave",
      type: "website",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  const posts = await getAllPosts();
  const dateLocale = localeHreflang[params.locale as Locale];

  return (
    <main className="h-full bg-white">
      {/* Header */}
      <section className="bg-[#0D1B2A] pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            {t("eyebrow")}
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">{t("emptyTitle")}</p>
            <p className="text-gray-400 text-sm">
              {t("emptyBodyBefore")}{" "}
              <Link href="/contact" className="text-[#FF5722] hover:underline">
                {t("emptyLink")}
              </Link>{" "}
              {t("emptyBodyAfter")}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-[#FF5722] transition-all duration-300 flex flex-col"
              >
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage.url}
                    alt={post.coverImage.alt}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-widest text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-bold text-[#0D1B2A] mb-3 leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#FF5722] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString(
                        dateLocale,
                        { day: "numeric", month: "short", year: "numeric" },
                      )}{" "}
                      · {post.readingTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[#FF5722] text-sm font-semibold hover:gap-2 transition-all"
                    >
                      {t("read")} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
