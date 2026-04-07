import { PayloadRequest, CollectionSlug } from 'payload'
import { getServerSideURL } from './getURL'

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

  // For homepage preview path is "/"
  const previewPath =
    normalizedSlug === 'home' ? '/' : `${collectionPrefixMap[collection]}/${normalizedSlug}`

  const encodedParams = new URLSearchParams({
    slug: normalizedSlug,
    collection,
    path: previewPath,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  // ✅ Return FULL absolute URL so the Preview button opens the correct port
  const serverURL = getServerSideURL()
  const url = `${serverURL}/next/preview?${encodedParams.toString()}`

  return url
}