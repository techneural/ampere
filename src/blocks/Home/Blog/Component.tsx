import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { unstable_cache } from 'next/cache'
import { FadeWrapper } from '@/components/animations'
import BlogCard from '@/components/common/BlogCard'

// ─── Types ────────────────────────────────────────────────────────────────────

type Post = {
  title: string
  source?: string
  date?: string
  slug?: string
  excerpt?: string
  image: { url: string }
}

type Props = {
  heading: string
  description?: string
}

// ─── Fetch latest 2 posts from BlogPage block (single source of truth) ───────

const getLatest2Posts = unstable_cache(
  async (): Promise<Post[]> => {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 200,
      pagination: false,
    })

    const posts: Post[] = []
    for (const page of pages.docs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layout = (page as any).layout || []
      for (const block of layout) {
        if (block.blockType === 'blogPage' && Array.isArray(block.posts)) {
          posts.push(...block.posts)
          // Stop as soon as we have enough
          if (posts.length >= 2) break
        }
      }
      if (posts.length >= 2) break
    }

    return posts.slice(0, 2)
  },
  ['home-latest-2-blog-posts'],
  { tags: ['pages', 'blog-posts'], revalidate: 3600 },
)

// ─── Component ────────────────────────────────────────────────────────────────

const LatestBlogSection = async ({ heading, description }: Props) => {
  const posts = await getLatest2Posts()

  return (
    <section className="pt-14">
      <div className="container">
        <div className="text-center max-w-203 mx-auto space-y-8">
          <FadeWrapper>
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>
          {description && (
            <FadeWrapper delay={0.2}>
              <h3>{description}</h3>
            </FadeWrapper>
          )}
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 py-8 max-xl:py-10">
        <div className="container relative grid grid-cols-2 gap-7.5 max-md:flex-col justify-center">
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <BlogCard key={index} item={item} comingSoon={!item.slug} />
            ))
          ) : (
            <p className="text-neutral-400 font-avenirLtStd py-8">
              No blog posts yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default LatestBlogSection
