import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { unstable_cache } from 'next/cache'
import BlogListPage from '@/components/common/BlogListPage'

// ─── Cached fetch ─────────────────────────────────────────────────────────────

const getCachedBlogPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    // First: try to find the page whose slug is 'blog' directly
    const blogPage = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1,
      pagination: false,
      where: {
        or: [{ slug: { equals: 'blog' } }, { slug: { equals: '/blog' } }],
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: any[] = []

    const targetPages =
      blogPage.docs.length > 0
        ? blogPage.docs // found the blog page directly
        : (
            await payload.find({
              // fallback: scan all pages (same as before)
              collection: 'pages',
              draft: false,
              limit: 200,
              pagination: false,
            })
          ).docs

    for (const page of targetPages) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layout = (page as any).layout || []
      for (const block of layout) {
        if (block.blockType === 'blogPage' && Array.isArray(block.posts)) {
          posts.push(...block.posts)
        }
      }
    }

    console.log('[/blog] getCachedBlogPosts → found', posts.length, 'posts')
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
