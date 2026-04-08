import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateBlog: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating blog post at path: /blog/${doc.slug}`)
      revalidatePath(`/blog/${doc.slug}`)
      revalidateTag('blog-posts')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old blog post at path: /blog/${previousDoc.slug}`)
      revalidatePath(`/blog/${previousDoc.slug}`)
      revalidateTag('blog-posts')
    }
  }
  return doc
}

export const revalidateBlogDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/blog/${doc?.slug}`)
    revalidateTag('blog-posts')
  }
  return doc
}
