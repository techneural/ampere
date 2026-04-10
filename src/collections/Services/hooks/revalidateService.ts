import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateService: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating service at path: /services/${doc.slug}`)
      revalidatePath(`/services/${doc.slug}`)
      revalidateTag('services')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old service at path: /services/${previousDoc.slug}`)
      revalidatePath(`/services/${previousDoc.slug}`)
      revalidateTag('services')
    }
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/services/${doc?.slug}`)
    revalidateTag('services')
  }
  return doc
}