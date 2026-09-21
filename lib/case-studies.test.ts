/**
 * Guards the Sanity → CaseStudy mapping. Run: npx tsx --env-file=.env.local lib/case-studies.test.ts
 */
import assert from "node:assert";
import { mapCaseStudy, type SanityCaseStudy } from "@/lib/case-studies";

const raw: SanityCaseStudy = {
  slug: "fintech-support-bot",
  title: "Multilingual support bot",
  description: "−62% tickets",
  publishedAt: "2026-01-01T00:00:00Z",
  eyebrow: "CASE STUDY · FINTECH",
  services: ["ai-chatbot"],
  tags: ["chatbot"],
  keywords: null,
  plainText: "word",
  coverImage: null,
  body: null,
};

const study = mapCaseStudy(raw);

assert.equal(study.slug, "fintech-support-bot");
assert.equal(study.eyebrow, "CASE STUDY · FINTECH");
assert.deepEqual(study.services, ["ai-chatbot"]);
assert.equal(study.body, undefined, "empty body should be undefined");

const bare = mapCaseStudy({ ...raw, eyebrow: null, services: null });
assert.equal(bare.eyebrow, "Case Study", "eyebrow falls back");
assert.deepEqual(bare.services, [], "null services become an empty array");

console.log("ok: lib/case-studies.ts");
