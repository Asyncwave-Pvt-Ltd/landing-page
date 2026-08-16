/**
 * Guards the Sanity → BlogPost mapping. Run: npx tsx --env-file=.env.local lib/blog.test.ts
 * (Portable Text → HTML is the only non-trivial logic in lib/blog.ts)
 */
import assert from "node:assert";
import { mapPost, type SanityPost } from "@/lib/blog";

const raw: SanityPost = {
  slug: "hello",
  title: "Hello",
  description: "Desc",
  publishedAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-02T00:00:00Z",
  tags: ["ai"],
  keywords: null,
  plainText: Array(400).fill("word").join(" "),
  coverImage: { url: "https://cdn.sanity.io/img.png", alt: null },
  author: { name: "Asyncwave" },
  body: [
    {
      _type: "block",
      _key: "a",
      style: "normal",
      markDefs: [{ _key: "l1", _type: "link", href: "https://asyncwave.in" }],
      children: [
        { _type: "span", _key: "s1", text: "bold", marks: ["strong"] },
        { _type: "span", _key: "s2", text: "link", marks: ["l1"] },
      ],
    },
    { _type: "image", _key: "b", url: "https://cdn.sanity.io/x.png", alt: "x" },
    { _type: "code", _key: "c", code: "const a = 1 < 2;" },
  ] as unknown as SanityPost["body"],
};

const post = mapPost(raw);

assert.equal(post.slug, "hello");
assert.equal(post.readingTime, "2 min read", "reading time uses pt::text word count");
assert.equal(post.coverImage?.alt, "Hello", "cover alt falls back to the title");
assert.equal(post.author?.name, "Asyncwave");
assert.deepEqual(post.keywords, [], "null keywords become an empty array");

const html = post.body ?? "";
assert.match(html, /<strong>bold<\/strong>/, "strong mark not rendered");
assert.match(
  html,
  /<a href="https:\/\/asyncwave\.in" rel="noopener noreferrer" target="_blank">link<\/a>/,
  "link mark not rendered with rel/target",
);
assert.match(html, /<img src="https:\/\/cdn\.sanity\.io\/x\.png" alt="x" loading="lazy" \/>/, "image block not rendered");
assert.match(html, /<pre><code>const a = 1 &lt; 2;<\/code><\/pre>/, "code block not escaped");

// A post with no body must not render an empty article shell.
assert.equal(mapPost({ ...raw, body: null }).body, undefined, "empty body should be undefined");

console.log("ok: lib/blog.ts");
