import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// On-demand ISR via Sanity webhook.
// In sanity.io/manage → API → Webhooks, add:
//   URL:        https://asyncwave.in/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
//   Dataset:    production
//   Trigger on: Create, Update, Delete
//   Filter:     _type == "post"
//   Projection: {"slug": slug.current}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let slug: string | null = null;
  try {
    const body = await req.json();
    // projected `{"slug": slug.current}` gives a string; a raw document gives `{current}`
    slug = typeof body?.slug === "string" ? body.slug : body?.slug?.current ?? null;
  } catch {
    // body parse failure — revalidate everything
  }

  revalidateTag("blog-posts");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? "all",
    at: new Date().toISOString(),
  });
}
