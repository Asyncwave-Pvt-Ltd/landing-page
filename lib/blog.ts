// Strapi v5 REST API integration for blog posts.
//
// Required Strapi content type (API ID: "post", collection):
//   slug        — UID, attached to title
//   title       — Short text (required)
//   description — Long text (required)
//   tags        — JSON (string[]) or comma-separated Text
//   keywords    — JSON (string[]) or comma-separated Text
//   body        — Rich Text (Blocks)
//   coverImage  — Media (single image)
//   author      — Component with `name` (Short text) field

const STRAPI_URL = (process.env.STRAPI_URL ?? "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

const API_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
};

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

// ─── Strapi v5 raw types ──────────────────────────────────────────────────────

type InlineNode =
  | {
      type: "text";
      text: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      code?: boolean;
    }
  | { type: "link"; url: string; children: InlineNode[] };

type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | {
      type: "list";
      format: "ordered" | "unordered";
      children: { type: "list-item"; children: InlineNode[] }[];
    }
  | { type: "quote"; children: InlineNode[] }
  | { type: "code"; code: string; language?: string }
  | { type: "image"; image: { url: string; alternativeText?: string } };

interface StrapiPost {
  id: number;
  documentId?: string;
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[] | string | null;
  keywords?: string[] | string | null;
  body?: BlockNode[] | null;
  coverImage?: { url: string; alternativeText?: string } | null;
  author?: { name: string; avatar?: { url: string } | null } | null;
}

// ─── Blocks → HTML ───────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlinesToHtml(nodes: InlineNode[]): string {
  return nodes
    .map((n) => {
      if (n.type === "link") {
        return `<a href="${esc(n.url)}" rel="noopener noreferrer" target="_blank">${inlinesToHtml(n.children)}</a>`;
      }
      let t = esc(n.text);
      if (n.code) return `<code>${t}</code>`;
      if (n.bold) t = `<strong>${t}</strong>`;
      if (n.italic) t = `<em>${t}</em>`;
      if (n.underline) t = `<u>${t}</u>`;
      if (n.strikethrough) t = `<s>${t}</s>`;
      return t;
    })
    .join("");
}

function blocksToHtml(blocks: BlockNode[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${inlinesToHtml(block.children)}</p>`;
        case "heading":
          return `<h${block.level}>${inlinesToHtml(block.children)}</h${block.level}>`;
        case "list": {
          const tag = block.format === "ordered" ? "ol" : "ul";
          const items = block.children
            .map((li) => `<li>${inlinesToHtml(li.children)}</li>`)
            .join("");
          return `<${tag}>${items}</${tag}>`;
        }
        case "quote":
          return `<blockquote>${inlinesToHtml(block.children)}</blockquote>`;
        case "code":
          return `<pre><code>${esc(block.code)}</code></pre>`;
        case "image": {
          const src = block.image.url.startsWith("http")
            ? block.image.url
            : `${STRAPI_URL}${block.image.url}`;
          return `<img src="${esc(src)}" alt="${esc(block.image.alternativeText ?? "")}" loading="lazy" />`;
        }
        default:
          return "";
      }
    })
    .join("\n");
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function calcReadingTime(html: string): string {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function toStringArray(val: string[] | string | null | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
  return val.split(",").map((s) => s.trim()).filter(Boolean);
}

function resolveMediaUrl(url: string): string {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

// ─── Mapper ───────────────────────────────────────────────────────────────────

function mapPost(raw: StrapiPost): BlogPost {
  const html = raw.body ? blocksToHtml(raw.body) : "";
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description ?? "",
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
    readingTime: calcReadingTime(html),
    tags: toStringArray(raw.tags),
    keywords: toStringArray(raw.keywords),
    coverImage: raw.coverImage
      ? {
          url: resolveMediaUrl(raw.coverImage.url),
          alt: raw.coverImage.alternativeText ?? raw.title,
        }
      : undefined,
    author: raw.author ? { name: raw.author.name } : undefined,
    body: html || undefined,
  };
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────

const CACHE_TAG = "blog-posts";
const REVALIDATE_SECONDS = 3600;

function basePopulate(): URLSearchParams {
  const p = new URLSearchParams();
  p.set("populate[coverImage][fields][0]", "url");
  p.set("populate[coverImage][fields][1]", "alternativeText");
  p.set("populate[author][fields][0]", "name");
  return p;
}

async function strapiGet<T>(
  endpoint: string,
  params: URLSearchParams
): Promise<T | null> {
  const url = `${STRAPI_URL}/api/${endpoint}?${params}`;
  try {
    const res = await fetch(url, {
      headers: API_HEADERS,
      next: { tags: [CACHE_TAG], revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.error(`[Strapi] ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.error(`[Strapi] fetch error [${endpoint}]:`, err);
    return null;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  const params = basePopulate();
  params.set("sort[0]", "publishedAt:desc");
  params.set("status", "published");
  params.set("pagination[pageSize]", "100");

  const json = await strapiGet<{ data: StrapiPost[] }>("posts", params);
  return (json?.data ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const params = basePopulate();
  params.set("filters[slug][$eq]", slug);
  params.set("status", "published");

  const json = await strapiGet<{ data: StrapiPost[] }>("posts", params);
  const first = json?.data?.[0];
  return first ? mapPost(first) : null;
}

export async function getAllSlugs(): Promise<string[]> {
  const params = new URLSearchParams({
    "fields[0]": "slug",
    "sort[0]": "publishedAt:desc",
    "status": "published",
    "pagination[pageSize]": "1000",
  });

  const json = await strapiGet<{ data: StrapiPost[] }>("posts", params);
  return (json?.data ?? []).map((p) => p.slug).filter(Boolean);
}
