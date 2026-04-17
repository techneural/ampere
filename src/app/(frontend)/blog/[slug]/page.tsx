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

export const revalidate = 60
type Args = {
  params: Promise<{ slug: string }>
}

// ─── Fetch a single post by slug ─────────────────────────────────────────────

type ShareItem = {
  name: string
  icon: string
  getHref: (url: string, title?: string) => string
}

const socialLinks: ShareItem[] = [
  {
    name: 'Facebook',
    icon: '/images/facebook.png',
    getHref: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    name: 'LinkedIn',
    icon: '/images/linkedin.png',
    getHref: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  },
  {
    name: 'X',
    icon: '/images/x.png',
    getHref: (url, title) => `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
  },
]

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

  const formattedDate = (post as any).publishedAt
    ? new Date((post as any).publishedAt).toLocaleDateString('en-US', {
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
          <div className="pt-8 max-sm:pt-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white font-avenirLtStd text-sm transition-colors duration-200 max-sm:text-xs"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to Blog
            </Link>
          </div>

          <div className="pt-8 pb-0 max-sm:pt-4">
            <div className="space-y-5">
              <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <div className="flex flex-col gap-4 font-avenirLtStd text-xs text-neutral-400 max-sm:flex-row max-sm:justify-between max-sm:w-full">
                  {(post as any).source && (
                    <span className="w-max flex items-center gap-1 bg-primary text-white rounded-sm text-base font-avenirLtStd px-5 py-2 max-sm:p-2 max-sm:text-xs">
                      <Layers size={16} className="max-sm:size-3" />
                      {(post as any).source}
                    </span>
                  )}
                  {formattedDate && (
                    <span className="flex items-center gap-1.5 text-neutral-400 text-base max-sm:text-xs">
                      {formattedDate}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1.5 text-neutral-400 max-sm:text-xs">
                  Share:
                  <div className="flex gap-1">
                    {socialLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.getHref(encodedUrl, encodedTitle)}
                        target="_blank"
                        className="relative flex items-center justify-center size-9 rounded-lg bg-neutral-300 border border-neutral-800"
                      >
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={30}
                          height={30}
                          className="max-sm:size-6"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <h2 className="font-bold">{post.title}</h2>
            </div>
          </div>

          {(post as any).image?.url && (
            <div className="mt-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-500 max-w-3xl mx-auto">
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
                <p className="text-neutral-400 text-center">No content available for this blog.</p>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
