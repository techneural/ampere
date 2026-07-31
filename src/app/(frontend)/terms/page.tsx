import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import RichText from '@/components/RichText'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const SLUG = 'terms'

async function getLegalPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'legal-pages',
    where: { slug: { equals: SLUG } },
    limit: 1,
    depth: 1,
  })
  return result.docs?.[0] ?? null
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage()
  if (!page) return { title: 'Terms & Conditions | Ampere Labs' }

  const title = page.meta?.title || `${page.title} | Ampere Labs`
  const description =
    page.meta?.description ||
    'Read the Terms & Conditions governing your use of Ampere Labs services.'

  const metaImage = page.meta?.image
  const rawImageUrl =
    metaImage && typeof metaImage === 'object' ? metaImage.url : undefined
  const imageUrl = rawImageUrl
    ? rawImageUrl.startsWith('http')
      ? rawImageUrl
      : `${getServerSideURL()}${rawImageUrl}`
    : `${getServerSideURL()}/website-template-OG.webp`

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      url: `${getServerSideURL()}/${SLUG}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    }),
  }
}

export default async function TermsPage() {
  const page = await getLegalPage()
  if (!page) return notFound()

  const lastUpdated = page.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <section className="container py-16 max-lg:py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 border-b border-neutral-800 pb-6">
          <h1 className="mb-3 text-4xl font-bold text-white max-md:text-3xl">
            {page.title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-neutral-400">Last updated: {lastUpdated}</p>
          )}
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-white">
          <RichText data={page.content} />
        </div>
      </div>
    </section>
  )
}
