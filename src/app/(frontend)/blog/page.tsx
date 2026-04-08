import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { unstable_cache } from 'next/cache'
import BlogListPage from '@/components/common/BlogListPage'

// ─── Cached fetch ─────────────────────────────────────────────────────────────

const getCachedBlogPosts = unstable_cache(
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
  ['blog-page-posts'],
  { tags: ['pages', 'blog-posts'], revalidate: 3600 },
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'Blog | AL',
  description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
}

export default async function BlogPage() {
  const posts = await getCachedBlogPosts()
  return <BlogListPage posts={posts} />
}
