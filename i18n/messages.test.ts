/**
 * Guards message-catalog parity. Adding a language means adding
 * messages/<locale>.json — this fails loudly when it drifts from en.json.
 * Run: npx tsx i18n/messages.test.ts
 */
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { routing } from "./routing";

// Leaf key paths, with array indices collapsed so list lengths are compared too.
function keys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value))
    return value.flatMap((v, i) => keys(v, `${prefix}[${i}]`));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) =>
      keys(v, prefix ? `${prefix}.${k}` : k),
    );
  return [prefix];
}

const load = (locale: string) =>
  JSON.parse(
    readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"),
  );

const base = keys(load(routing.defaultLocale)).sort();

for (const locale of routing.locales) {
  if (locale === routing.defaultLocale) continue;
  const other = keys(load(locale)).sort();

  const missing = base.filter((k) => !other.includes(k));
  const extra = other.filter((k) => !base.includes(k));

  assert.deepStrictEqual(missing, [], `${locale}.json missing: ${missing}`);
  assert.deepStrictEqual(extra, [], `${locale}.json has extra: ${extra}`);
}

console.log("ok");
