import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import RichText from '@/components/RichText'
import { unstable_cache } from 'next/cache'

type Args = {
  params: Promise<{ slug: string }>
}

// ─── Cached fetch helpers ─────────────────────────────────────────────────────

// Fetch all blog posts once and cache the result
const getCachedAllBlogPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 200,
      pagination: false,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: any[] = []
    for (const page of pages.docs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layout = (page as any).layout || []
      for (const block of layout) {
        if (block.blockType === 'blog' && Array.isArray(block.posts)) {
          posts.push(...block.posts)
        }
      }
    }
    return posts
  },
  ['all-blog-posts'],
  { tags: ['pages', 'blog-posts'], revalidate: 3600 },
)

async function getBlogPost(slug: string) {
  const posts = await getCachedAllBlogPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getCachedAllBlogPosts()
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt ?? '',
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const post = await getBlogPost(slug)
  if (!post) return notFound()

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <section className="min-h-screen">
      <div className="container">
        <div className="pt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white font-avenirLtStd text-sm transition-colors duration-200"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            Back to Home
          </Link>
        </div>

        <div className="pt-8 pb-0">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-4 font-avenirLtStd text-xs text-neutral-400">
              {post.source && (
                <span className="flex items-center gap-1.5 text-primary border border-primary/30 rounded-sm px-2.5 py-1">
                  <Tag size={11} />
                  {post.source}
                </span>
              )}
              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  {formattedDate}
                </span>
              )}
            </div>

            <h1 className="text-4xl max-md:text-2xl font-bold leading-tight">{post.title}</h1>

            {post.excerpt && (
              <p className="text-neutral-400 text-lg max-md:text-base leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-end pt-2 border-t border-neutral-500">
              <button className="flex items-center gap-2 border border-neutral-500 hover:border-primary text-neutral-400 hover:text-white rounded-sm px-3 py-1.5 text-xs font-avenirLtStd transition-colors duration-200">
                <Share2 size={12} />
                Share
              </button>
            </div>
          </div>
        </div>

        {post.image?.url && (
          <div className="mt-10">
            <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-500">
              <Image
                src={post.image.url}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-120 max-md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        )}

        <div className="mt-14 pb-20">
          <article>
            {post.content ? (
              <RichText data={post.content} />
            ) : (
              <p className="text-neutral-400">No content available for this post.</p>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}