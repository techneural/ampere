import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

// Module-level cache — created once, reused on every request
const getCachedGlobals = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const [header, footer] = await Promise.all([
      payload.findGlobal({ slug: 'header' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    return { header, footer }
  },
  ['globals'],
  {
    tags: ['globals'],
    revalidate: 3600,
  },
)

export const getGlobals = async () => {
  try {
    return await getCachedGlobals()
  } catch (error) {
    console.error('Error fetching globals:', error)
    return { header: null, footer: null }
  }
}