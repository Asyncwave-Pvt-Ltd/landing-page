import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { defaultLocale, locales, localeHreflang } from "@/i18n/routing";
import { localeUrl } from "@/i18n/seo";
import { SERVICE_SLUGS } from "@/lib/services";

type Entry = MetadataRoute.Sitemap[number];

/** One entry per path, with every locale listed as an hreflang alternate. */
function entry(path: string, rest: Omit<Entry, "url" | "alternates">): Entry {
  return {
    url: localeUrl(path, defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [localeHreflang[l], localeUrl(path, l)]),
      ),
    },
    ...rest,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const lastModified = new Date();

  return [
    entry("", { lastModified, changeFrequency: "monthly", priority: 1 }),
    entry("/about-us", {
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...SERVICE_SLUGS.map((slug) =>
      entry(`/services/${slug}`, {
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
    entry("/blog", { lastModified, changeFrequency: "weekly", priority: 0.8 }),
    entry("/contact", {
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...slugs.map((slug) =>
      entry(`/blog/${slug}`, {
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    ),
  ];
}
