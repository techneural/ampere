/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Layers } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import RichText from '@/components/RichText'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getGlobals } from '@/lib/getGlobals'

type Args = {
  params: Promise<{ slug: string }>
}

const getCachedAllBlogPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 200,
      pagination: false,
    })

    const posts: any[] = []
    for (const page of pages.docs) {
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

async function getDraftBlogPosts() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: true,
    limit: 200,
    pagination: false,
  })

  const posts: any[] = []
  for (const page of pages.docs) {
    const layout = (page as any).layout || []
    for (const block of layout) {
      if (block.blockType === 'blog' && Array.isArray(block.posts)) {
        posts.push(...block.posts)
      }
    }
  }
  return posts
}

async function getBlogPost(slug: string, draft: boolean) {
  const posts = draft ? await getDraftBlogPosts() : await getCachedAllBlogPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function generateStaticParams() {
  const posts = await getCachedAllBlogPosts()
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const post = await getBlogPost(slug, draft)
  if (!post) return {}
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt ?? '',
  }
}

export default async function BlogDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const post = await getBlogPost(slug, draft)
  const { footer } = await getGlobals()

  const socialLinks = footer?.socialLinks || []

  if (!post) return notFound()

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
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
                {post.source && (
                  <span className="w-max flex items-center gap-1 bg-primary text-white rounded-sm text-base font-avenirLtStd px-5 py-2">
                    <Layers size={16} />
                    {post.source}
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

        {post.image?.url && (
          <div className="mt-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-500">
              <Image
                src={post.image.url}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-120 max-md:h-64 object-cover"
              />
              {/* <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" /> */}
            </div>
          </div>
        )}

        {post.excerpt && (
          <p className="text-neutral-400 text-lg max-md:text-base leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="mt-6 pb-12">
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
