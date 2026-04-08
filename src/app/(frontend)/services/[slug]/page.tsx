import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Tag, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import RichText from '@/components/RichText'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

type Args = {
  params: Promise<{ slug: string }>
}

// ─── Cached fetch helpers (published only, for static/production) ─────────────

const getCachedAllServices = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 200,
      pagination: false,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const services: any[] = []
    for (const page of pages.docs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layout = (page as any).layout || []
      for (const block of layout) {
        if (block.blockType === 'mainServices' && Array.isArray(block.services)) {
          services.push(...block.services)
        }
      }
    }
    return services
  },
  ['all-services'],
  { tags: ['pages', 'services'], revalidate: 3600 },
)

// Draft-aware fetch (bypasses cache so preview always sees latest content)
async function getDraftServices() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: true,
    limit: 200,
    pagination: false,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services: any[] = []
  for (const page of pages.docs) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layout = (page as any).layout || []
    for (const block of layout) {
      if (block.blockType === 'mainServices' && Array.isArray(block.services)) {
        services.push(...block.services)
      }
    }
  }
  return services
}

async function getService(slug: string, draft: boolean) {
  const services = draft ? await getDraftServices() : await getCachedAllServices()
  return services.find((s) => s.slug === slug) ?? null
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const services = await getCachedAllServices()
  return services.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const service = await getService(slug, draft)
  if (!service) return {}
  return {
    title: `${service.title} | Services`,
    description: service.excerpt ?? service.description ?? '',
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const service = await getService(slug, draft)
  if (!service) return notFound()

  return (
    <div className="min-h-screen">
      <div className="container pt-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white font-avenirLtStd text-sm transition-colors duration-200"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          Back to Home
        </Link>
      </div>

      <div className="container pt-8 pb-0">
        <div className="max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-4 font-avenirLtStd text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 text-primary border border-primary/30 rounded-sm px-2.5 py-1">
              <Tag size={11} />
              Service
            </span>
          </div>

          <div className="flex items-center gap-5">
            {service.icon?.url && (
              <div className="shrink-0 flex items-center justify-center size-16 rounded-xl bg-neutral-200 border border-neutral-500">
                <Image
                  src={service.icon.url}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="size-10"
                />
              </div>
            )}
            <h1 className="text-4xl max-md:text-2xl font-bold leading-tight">{service.title}</h1>
          </div>

          {(service.excerpt || service.description) && (
            <p className="text-neutral-400 text-lg max-md:text-base leading-relaxed">
              {service.excerpt || service.description}
            </p>
          )}

          <div className="flex items-center justify-end pt-2 border-t border-neutral-500">
            <button className="flex items-center gap-2 border border-neutral-500 hover:border-primary text-neutral-400 hover:text-white rounded-sm px-3 py-1.5 text-xs font-avenirLtStd transition-colors duration-200">
              <Share2 size={12} />
              Share
            </button>
          </div>
        </div>
      </div>

      {service.image?.url && (
        <div className="container mt-10">
          <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-500">
            <Image
              src={service.image.url}
              alt={service.title}
              width={1200}
              height={600}
              className="w-full h-120 max-md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>
      )}

      <div className="container mt-14 pb-20">
        <article className="max-w-3xl">
          {service.content ? (
            <RichText data={service.content} />
          ) : (
            <p className="text-neutral-400">No content available for this service.</p>
          )}

          <div className="mt-16 bg-neutral-200 border-2 border-neutral-500 rounded-2xl p-8 space-y-4">
            <h3 className="text-xl font-bold">Interested in this service?</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Ampere Labs designs and deploys custom hardware solutions for AI-first enterprises.
              Let&apos;s discuss how we can help you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-avenirLtStd text-sm rounded-sm px-5 py-2.5 transition-colors duration-200"
            >
              Book a Consultation
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
