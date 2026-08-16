// Sanity integration for blog posts.
//
// Content type lives in the studio repo (asyncwave-cms-test/schemaTypes/post.ts):
//   slug, title, description, publishedAt, tags[], keywords[],
//   coverImage (image + alt), author { name }, body (Portable Text)

import { toHTML, escapeHTML, type PortableTextHtmlComponents } from "@portabletext/to-html";
import type { TypedObject } from "@portabletext/types";
import { sanityClient } from "@/lib/sanity";

// ─── Public BlogPost shape (consumed by app/blog/**) ─────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  tags: string[];
  keywords: string[];
  coverImage?: { url: string; alt: string };
  author?: { name: string; avatar?: string };
  body?: string;
}

// ─── Raw query result ─────────────────────────────────────────────────────────

export interface SanityPost {
  slug: string | null;
  title: string;
  description?: string | null;
  publishedAt: string;
  updatedAt?: string | null;
  tags?: string[] | null;
  keywords?: string[] | null;
  plainText?: string | null;
  coverImage?: { url: string | null; alt: string | null } | null;
  author?: { name?: string | null } | null;
  body?: TypedObject[] | null;
}

// ─── Portable Text → HTML ────────────────────────────────────────────────────

const ptComponents: Partial<PortableTextHtmlComponents> = {
  types: {
    // `url` is resolved in the GROQ projection below
    image: ({ value }) =>
      value?.url
        ? `<img src="${escapeHTML(value.url)}" alt="${escapeHTML(value.alt ?? "")}" loading="lazy" />`
        : "",
    code: ({ value }) => `<pre><code>${escapeHTML(value?.code ?? "")}</code></pre>`,
  },
  marks: {
    link: ({ children, value }) =>
      `<a href="${escapeHTML(value?.href ?? "")}" rel="noopener noreferrer" target="_blank">${children}</a>`,
  },
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function calcReadingTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// ─── Mapper ───────────────────────────────────────────────────────────────────

export function mapPost(raw: SanityPost): BlogPost {
  return {
    slug: raw.slug ?? "",
    title: raw.title,
    description: raw.description ?? "",
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt ?? undefined,
    readingTime: calcReadingTime(raw.plainText ?? ""),
    tags: raw.tags ?? [],
    keywords: raw.keywords ?? [],
    coverImage: raw.coverImage?.url
      ? { url: raw.coverImage.url, alt: raw.coverImage.alt ?? raw.title }
      : undefined,
    author: raw.author?.name ? { name: raw.author.name } : undefined,
    body: raw.body?.length ? toHTML(raw.body, { components: ptComponents }) : undefined,
  };
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────

const CACHE_TAG = "blog-posts";
const REVALIDATE_SECONDS = 3600;

async function query<T>(groq: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(groq, params, {
      next: { tags: [CACHE_TAG], revalidate: REVALIDATE_SECONDS },
    });
  } catch (err) {
    console.error("[Sanity] query failed:", err);
    return null;
  }
}

// `pt::text(body)` gives the plain text without shipping the whole body to the list page.
const CARD_FIELDS = `
  "slug": slug.current,
  title,
  description,
  publishedAt,
  "updatedAt": _updatedAt,
  tags,
  keywords,
  "plainText": pt::text(body),
  coverImage{"url": asset->url, alt},
  author
`;

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await query<SanityPost[]>(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
     | order(publishedAt desc)[0...100]{${CARD_FIELDS}}`
  );
  return (posts ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await query<SanityPost | null>(
    `*[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0]{
      ${CARD_FIELDS},
      body[]{..., _type == "image" => {"url": asset->url, alt}}
    }`,
    { slug }
  );
  return post ? mapPost(post) : null;
}

export async function getAllSlugs(): Promise<string[]> {
  const slugs = await query<string[]>(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
     | order(publishedAt desc)[0...1000].slug.current`
  );
  return (slugs ?? []).filter(Boolean);
}
