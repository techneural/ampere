/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Layers } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import RichText from '@/components/RichText'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

// ─── Fetch a single post by slug ─────────────────────────────────────────────

async function getBlogPost(slug: string, draft: boolean) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blogs',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

// ─── Fetch all slugs for static generation ───────────────────────────────────

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blogs',
    draft: false,
    limit: 200,
    pagination: false,
  })
  return result.docs.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const post = await getBlogPost(slug, draft)
  if (!post) return {}

  const meta = (post as any).meta

  // Prefer meta tab values, fall back to content tab fields
  const title = meta?.title || post.title
  const description = meta?.description || (post as any).excerpt || ''
  const imageUrl = meta?.image?.url || (post as any).image?.url
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${slug}`

  return {
    title: `${title} | Blog`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ampere Labs',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const post = await getBlogPost(slug, draft)

  if (!post) return notFound()

  const formattedDate = (post as any).date
    ? new Date((post as any).date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '')
  const currentUrl = `${baseUrl}/blog/${slug}`
  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(post.title)

  return (
    <>
      {draft && <LivePreviewListener />}
      <section className="min-h-screen bg-neutral-300">
        <div className="container">
          <div className="pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white font-avenirLtStd text-sm transition-colors duration-200"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to Blog
            </Link>
          </div>

          <div className="pt-8 pb-0">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4 font-avenirLtStd text-xs text-neutral-400">
                  {(post as any).source && (
                    <span className="w-max flex items-center gap-1 bg-primary text-white rounded-sm text-base font-avenirLtStd px-5 py-2">
                      <Layers size={16} />
                      {(post as any).source}
                    </span>
                  )}
                  {formattedDate && (
                    <span className="flex items-center gap-1.5 text-neutral-400 text-base">
                      {formattedDate}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1.5 text-neutral-400">
                  Share:
                  <div className="flex gap-1">
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                      target="_blank"
                      className="relative flex items-center justify-center size-9 rounded-lg bg-neutral-300 border border-neutral-800"
                    >
                      <Image src="/images/facebook.png" alt="Facebook" width={30} height={30} />
                    </Link>

                    {/* LinkedIn */}
                    <Link
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                      target="_blank"
                      className="relative flex items-center justify-center size-9 rounded-lg bg-neutral-300 border border-neutral-800"
                    >
                      <Image src="/images/linkedin.png" alt="Linkedin" width={30} height={30} />
                    </Link>

                    {/* X (Twitter) */}
                    <Link
                      href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                      target="_blank"
                      className="relative flex items-center justify-center size-9 rounded-lg bg-neutral-300 border border-neutral-800"
                    >
                      <Image src="/images/x.png" alt="X" width={30} height={30} />
                    </Link>
                  </div>
                </div>
              </div>

              <h1>{post.title}</h1>
            </div>
          </div>

          {(post as any).image?.url && (
            <div className="mt-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-500">
                <Image
                  src={(post as any).image.url}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {(post as any).excerpt && (
            <p className="text-neutral-400 text-lg max-md:text-base leading-relaxed mt-6">
              {(post as any).excerpt}
            </p>
          )}

          <div className="mt-6 pb-12">
            <article>
              {(post as any).content ? (
                <RichText data={(post as any).content} />
              ) : (
                <p className="text-neutral-400">No content available for this blog.</p>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
