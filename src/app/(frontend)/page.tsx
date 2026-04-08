export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const page = await payload.find({
    collection: 'pages',
    draft: draft,
    limit: 1,
    pagination: false,
    where: {
      or: [{ slug: { equals: 'home' } }, { slug: { equals: '/home' } }, { slug: { equals: '/' } }],
    },
  })

  const home = page.docs?.[0]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = (home as any)?.meta

  const title = meta?.title || 'Ampere Labs'
  const description =
    meta?.description ||
    'Ampere Labs delivers high-performance custom hardware, data center solutions, and deployment-ready AI infrastructure for modern enterprises.'
  const ogImageUrl = meta?.image?.url
    ? `${getServerSideURL()}${meta.image.url}`
    : `${getServerSideURL()}/website-template-OG.webp`

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      url: getServerSideURL(),
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

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })
  console.log('get home slug draft ::', draft)

  const page = await payload.find({
    collection: 'pages',
    draft: draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      or: [{ slug: { equals: 'home' } }, { slug: { equals: '/home' } }, { slug: { equals: '/' } }],
    },
  })

  const home = page.docs?.[0]

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={home?.layout || []} />
    </>
  )
}
