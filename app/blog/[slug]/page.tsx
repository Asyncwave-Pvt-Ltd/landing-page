import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { ArrowLeft, Clock, Tag } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Asyncwave Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://asyncwave.in/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://asyncwave.in/blog/${post.slug}`,
      siteName: "Asyncwave",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: post.coverImage
        ? [{ url: post.coverImage.url, alt: post.coverImage.alt }]
        : [{ url: "https://asyncwave.in/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Asyncwave",
      url: "https://asyncwave.in",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://asyncwave.in/#organization",
      name: "Asyncwave",
      logo: {
        "@type": "ImageObject",
        url: "https://asyncwave.in/logo_color.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://asyncwave.in/blog/${post.slug}`,
    },
    ...(post.coverImage && { image: post.coverImage.url }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        {/* Article header */}
        <header className="bg-[#F8F9FA] border-b border-gray-100 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#FF5722] transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              {post.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              {post.author && (
                <>
                  <span>·</span>
                  <span>By {post.author.name}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Article body — CMS renders HTML here */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          {post.body ? (
            <div
              className="prose prose-lg prose-headings:text-[#0D1B2A] prose-headings:font-extrabold prose-a:text-[#FF5722] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0D1B2A] prose-code:text-[#FF5722] prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded max-w-none"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          ) : (
            <p className="text-gray-400 text-center py-16">
              Content loading from CMS…
            </p>
          )}
        </article>

        {/* CTA */}
        <section className="bg-[#0D1B2A] py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Ready to Build with AI?
            </h2>
            <p className="text-white/60 mb-8">
              Let&apos;s discuss your AI project. We respond within 24 hours.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold px-8 py-4 rounded transition-colors text-sm uppercase tracking-wide"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
