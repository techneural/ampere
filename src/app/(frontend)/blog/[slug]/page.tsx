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
import { getGlobals } from '@/lib/getGlobals'

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
    pagination: false,
    where: { slug: { equals: slug } },
    ...(draft ? {} : { overrideAccess: false }),
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
  return {
    title: `${post.title} | Blog`,
    description: (post as any).excerpt ?? '',
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const post = await getBlogPost(slug, draft)
  const { footer } = await getGlobals()

  const socialLinks = footer?.socialLinks || []

  if (!post) return notFound()

  const formattedDate = (post as any).date
    ? new Date((post as any).date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
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
                  {socialLinks.map((item: any, index: number) => (
                    <Link key={index} href={item.url || '#'} target="_blank">
                      <div className="relative flex items-center justify-center size-9 rounded-lg bg-neutral-300 border border-neutral-800">
                        {item?.icon?.url && (
                          <Image src={item.icon.url} alt={item.name} width={30} height={30} />
                        )}
                      </div>
                    </Link>
                  ))}
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
          <p className="text-neutral-400 text-lg max-md:text-base leading-relaxed">
            {(post as any).excerpt}
          </p>
        )}

        <div className="mt-6 pb-12">
          <article>
            {(post as any).content ? (
              <RichText data={(post as any).content} />
            ) : (
              <p className="text-neutral-400">No content available for this post.</p>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
