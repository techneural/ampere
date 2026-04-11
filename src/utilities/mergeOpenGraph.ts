import type { Metadata } from 'next'

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://teamwallet.s3.eu-north-1.amazonaws.com/media/logo-bg.png'

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

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    url: og?.url || defaultOpenGraph.url,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
