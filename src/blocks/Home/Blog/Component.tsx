import { getPayload } from 'payload'
import configPromise from '@/payload.config'
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

// ─── Component ────────────────────────────────────────────────────────────────

const LatestBlogSection = async ({ heading, description }: Props) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blogs',
    draft: false,
    limit: 2,
    pagination: false,
    sort: '-publishedAt',
  })

  const posts = result.docs as unknown as Post[]

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
        <div className="container relative grid grid-cols-2 gap-7.5 max-md:flex-col justify-center max-md:grid-cols-1">
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <BlogCard key={item.slug ?? index} item={item} comingSoon={!item.slug} />
            ))
          ) : (
            <p className="text-neutral-400 font-avenirLtStd py-8">No blog posts yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default LatestBlogSection
