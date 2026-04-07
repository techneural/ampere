import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

// IMPORTANT: unstable_cache must be defined at module level (outside any function).
// If you create it inside a function, a new cache instance is made on every call
// and the cache is never actually hit.

const getCachedPage = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
    })
    return res.docs[0] || null
  },
  ['page'],
  {
    tags: ['pages'],
    revalidate: 3600,
  },
)

export const getPage = (slug: string) => getCachedPage(slug)

// Uncached — only used in draft/preview mode
export const getPageDraft = async (slug: string) => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'pages',
    draft: true,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return res.docs[0] || null
}