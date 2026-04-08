import { getPayload } from 'payload'
import config from '@/payload.config'
import { draftMode } from 'next/headers'

export const getPage = async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'pages',
    draft: draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return res.docs[0] || null
}
