import type { Metadata } from 'next'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amperelabs.com'

const imageUrl = `${baseUrl}/website-template-OG.webp`

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  title: 'Ampere Labs',
  description: 'Ampere Labs',
  siteName: 'Ampere Labs',
  url: process.env.NEXT_PUBLIC_SERVER_URL,
  images: [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
    },
  ],
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph']
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    url: og?.url || defaultOpenGraph.url,
    images: og?.images || defaultOpenGraph.images,
  }
}