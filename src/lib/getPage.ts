// src/lib/getPage.ts
import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

// ✅ Cached function (ONLY for published content)
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
    {
      tags: [`page-${slug}`, 'pages'],
      revalidate: 60,
    }
  )()

export const getPage = async (slug: string) => {
  try {
    const { isEnabled: draft } = await draftMode()

    // 🚫 PREVIEW MODE → NO CACHE
    if (draft) {
      const payload = await getPayload({ config })

      const res = await payload.find({
        collection: 'pages',
        draft: true,
        limit: 1,
        pagination: false,
        overrideAccess: true,
        where: { slug: { equals: slug } },
      })

      return res.docs[0] || null
    }

    // ✅ NORMAL MODE → USE CACHE
    return await getCachedPage(slug)

  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}