// src/lib/getPage.ts
import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

const getCachedPage = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const res = await payload.find({
        collection: 'pages',
        draft: false,
        limit: 1,
        pagination: false,
        overrideAccess: false,
        where: { slug: { equals: slug } },
      })
      return res.docs[0] || null
    },
    [`page-${slug}`],
    { tags: [`page-${slug}`, 'pages'], revalidate: 60 },
  )()

export const getPage = async (slug: string) => {
  try {
    return await getCachedPage(slug)
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}