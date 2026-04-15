export const revalidate = 60

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getHomePage } from '@/lib/getHomePage'

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = (home as any)?.meta

  const title = meta?.title || 'Ampere Labs'
  const description =
    meta?.description ||
    'Ampere Labs delivers high-performance custom hardware, data center solutions, and deployment-ready AI infrastructure for modern enterprises.'

  const getImageUrl = (url?: string) => {
    if (!url) return `${getServerSideURL()}/website-template-OG.webp`
    if (url.startsWith('http')) return url
    return `${getServerSideURL()}${url}`
  }

  const ogImageUrl = getImageUrl(meta?.image?.url)
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
  const home = await getHomePage()

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={home?.layout || []} />
    </>
  )
}