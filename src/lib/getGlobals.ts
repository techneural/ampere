import { getPayload } from 'payload'
import config from '@/payload.config'

export const getGlobals = async () => {
  const payload = await getPayload({ config })

  try {
    const [header, footer] = await Promise.all([
      payload.findGlobal({ slug: 'header' }),
      payload.findGlobal({ slug: 'footer' }),
    ])

    return { header, footer }
  } catch (error) {
    console.error('Error fetching globals:', error)
    return { header: null, footer: null }
  }
}
