import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import BlogListPage from '@/components/common/BlogListPage'

export const dynamic = 'force-dynamic'

import { getServerSideURL } from '@/utilities/getURL'

const imageUrl = 'https://teamwallet.s3.eu-north-1.amazonaws.com/media/Ampere-labs.png'

export const metadata = {
  title: 'Blog | Ampere Labs',
  description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
  openGraph: {
    title: 'Blog | Ampere Labs',
    description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
    url: `${getServerSideURL()}/blog`,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'Ampere Labs Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ampere Labs',
    description: 'Explore expert perspectives, emerging technologies, and proven strategies.',
    images: [imageUrl],
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
