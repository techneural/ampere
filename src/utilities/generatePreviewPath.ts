import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Normalize slug: strip leading slash and treat empty/home as homepage
  const normalizedSlug = slug.replace(/^\/+/, '') || 'home'

  // For homepage (slug is "home" or was "/" or "/home"), preview path is "/"
  const previewPath =
    normalizedSlug === 'home' ? '/' : `${collectionPrefixMap[collection]}/${normalizedSlug}`

  const encodedParams = new URLSearchParams({
    slug: normalizedSlug,
    collection,
    path: previewPath,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
