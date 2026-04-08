import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import BlogListPage from '@/components/common/BlogListPage'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog | AL',
  description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blogs',
    draft: false,
    limit: 200,
    pagination: false,
    sort: '-date',
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <BlogListPage posts={result.docs as any} />
}
