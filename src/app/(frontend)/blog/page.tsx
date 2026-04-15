import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import BlogListPage from '@/components/common/BlogListPage'

export const dynamic = 'force-dynamic'

import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata = {
  title: 'Blog | Ampere Labs',
  description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
  openGraph: mergeOpenGraph({
    title: 'Blog | Ampere Labs',
    description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
    url: `${getServerSideURL()}/blog`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ampere Labs',
    description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
    images: [`${getServerSideURL()}/website-template-OG.webp`],
  },
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
