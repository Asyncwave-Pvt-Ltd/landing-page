// Sanity integration for case studies. Same plumbing as lib/blog.ts, two extra fields.
//
// Content type lives in the studio repo (asyncwave-cms-test/schemaTypes/caseStudy.ts):
//   slug, title, description, publishedAt, eyebrow, services[] (service page slugs,
//   e.g. "ai-chatbot"), tags[], keywords[], coverImage (image + alt), body (Portable Text)

import { query, mapPost, CARD_FIELDS, type BlogPost, type SanityPost } from "@/lib/blog";

const CACHE_TAG = "case-studies";

export interface CaseStudy extends BlogPost {
  /** Small label above the title, e.g. "CASE STUDY · FINTECH". */
  eyebrow: string;
  /** Service page slugs this study is shown on. */
  services: string[];
}

export interface SanityCaseStudy extends SanityPost {
  eyebrow?: string | null;
  services?: string[] | null;
}

export function mapCaseStudy(raw: SanityCaseStudy): CaseStudy {
  return {
    ...mapPost(raw),
    eyebrow: raw.eyebrow ?? "Case Study",
    services: raw.services ?? [],
  };
}

const FIELDS = `${CARD_FIELDS}, eyebrow, services`;
const PUBLISHED = `_type == "caseStudy" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()`;

/** Published studies, newest first. Pass a service page slug to filter. */
export async function getCaseStudies(service?: string): Promise<CaseStudy[]> {
  const studies = await query<SanityCaseStudy[]>(
    `*[${PUBLISHED}${service ? " && $service in services" : ""}]
     | order(publishedAt desc)[0...50]{${FIELDS}}`,
    service ? { service } : {},
    CACHE_TAG,
  );
  return (studies ?? []).map(mapCaseStudy);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const study = await query<SanityCaseStudy | null>(
    `*[${PUBLISHED} && slug.current == $slug][0]{
      ${FIELDS},
      body[]{..., _type == "image" => {"url": asset->url, alt}}
    }`,
    { slug },
    CACHE_TAG,
  );
  return study ? mapCaseStudy(study) : null;
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const slugs = await query<string[]>(
    `*[${PUBLISHED}] | order(publishedAt desc)[0...1000].slug.current`,
    {},
    CACHE_TAG,
  );
  return (slugs ?? []).filter(Boolean);
}
