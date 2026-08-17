/**
 * Service slugs, in navbar order. Each one is a `nav.servicesSubmenu.<slug>`
 * label and a `/services/<slug>` route.
 */
export const SERVICE_SLUGS = [
  "ai-chatbot",
  "productive-analysis",
  "custom-ml",
  "text-intelligence",
  "healthcare",
  "ecomm",
  "doc-processing",
  "ed-tech",
  "fintech",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Slugs served by app/services/[slug]. ai-chatbot has its own hand-built page. */
export const GENERIC_SERVICE_SLUGS = SERVICE_SLUGS.filter(
  (slug) => slug !== "ai-chatbot",
);

export type GenericServiceSlug = Exclude<ServiceSlug, "ai-chatbot">;

export function isGenericServiceSlug(value: string): value is GenericServiceSlug {
  return (GENERIC_SERVICE_SLUGS as readonly string[]).includes(value);
}
