import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// On-demand ISR via Strapi webhook.
// In Strapi admin → Settings → Webhooks, add:
//   URL:     https://asyncwave.in/api/revalidate?secret=<STRAPI_REVALIDATE_SECRET>
//   Events:  entry.publish, entry.unpublish, entry.update, entry.delete
//   Filter:  Content-Type = post

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.STRAPI_REVALIDATE_SECRET || secret !== process.env.STRAPI_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let slug: string | null = null;
  try {
    const body = await req.json();
    slug = body?.entry?.slug ?? body?.data?.slug ?? null;
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
