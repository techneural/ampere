// src/lib/getPage.ts
import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

const getCachedPage = (slug: string, draft: boolean) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const res = await payload.find({
        collection: 'pages',
        draft,
        limit: 1,
        pagination: false,
        overrideAccess: draft,
        where: { slug: { equals: slug } },
      })
      return res.docs[0] || null
    },
    [`page-${slug}`, `draft-${draft}`],
    { tags: [`page-${slug}`, 'pages'], revalidate: 60 },
  )()

export const getPage = async (slug: string) => {
  try {
    const { isEnabled: draft } = await draftMode()
    return await getCachedPage(slug, draft)
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}