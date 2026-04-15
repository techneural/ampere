export const revalidate = 60

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPage } from '@/lib/getPage'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return pages.docs?.filter((doc) => doc.slug !== 'home').map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const page = await getPage(decodedSlug)

  if (!page) return {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = (page as any)?.meta

  const title = meta?.title || page.title || 'Ampere Labs'
  const description =
    meta?.description ||
    'Ampere Labs delivers high-performance custom hardware, data center solutions, and deployment-ready AI infrastructure for modern enterprises.'
  const getImageUrl = (url?: string) => {
    if (!url) return `${getServerSideURL()}/website-template-OG.webp`

    // already full URL (S3, Cloudinary, etc.)
    if (url.startsWith('http')) return url

    // relative URL from Payload
    return `${getServerSideURL()}${url}`
  }

  const ogImageUrl = getImageUrl(meta?.image?.url)
  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      url: `${getServerSideURL()}/${decodedSlug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await getPage(decodedSlug)

  if (!page) return notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.layout} />
    </>
  )
}

export default Page
