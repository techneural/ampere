// src/lib/getHomePage.ts
import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

export const getHomePage = async () => {
  try {
    const { isEnabled: draft } = await draftMode()

    const getCachedHomePage = unstable_cache(
      async () => {
        const payload = await getPayload({ config })

        const res = await payload.find({
          collection: 'pages',
          draft,
          limit: 1,
          pagination: false,
          overrideAccess: draft,
          where: {
            or: [
              { slug: { equals: 'home' } },
              { slug: { equals: '/home' } },
              { slug: { equals: '/' } },
            ],
          },
        })

        return res.docs[0] || null
      },
      ['home-page'],
      { tags: ['home-page', 'pages'], revalidate: 60 }
    )

    return await getCachedHomePage()
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}
