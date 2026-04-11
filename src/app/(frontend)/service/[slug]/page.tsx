/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import ServiceDetailClient from './Servicedetailclient'
import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

const defaultImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL

async function getService(slug: string, draft: boolean) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    draft: false,
    limit: 200,
    pagination: false,
  })
  return result.docs.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const service = await getService(slug, draft)
  if (!service) return {}

  const meta = (service as any).meta
  const title = meta?.title || service.title
  const description = meta?.description || (service as any).cardDescription || ''
  const imageUrl = meta?.image?.url || defaultImageUrl
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/service/${slug}`

  return {
    title: `${title} | Services`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ampere Labs',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ServiceDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const service = await getService(slug, draft)

  if (!service) return notFound()

  const s = service as any

  return (
    <>
      {draft && <LivePreviewListener />}
      <div className="min-h-screen">
        {/* Hero Banner */}
        <section className="relative min-h-[calc(100vh-71px)] flex flex-col justify-center overflow-hidden">
          {s.heroVideo?.url && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src={s.heroVideo.url} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full container z-10">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-white/70 hover:text-primary font-avenirLtStd text-sm transition-colors duration-200"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to Home
            </Link>
          </div>

          <div className="relative z-10 container pb-10 pt-24">
            <div className="flex flex-col items-end text-right max-w-2xl ml-auto max-sm:text-center max-sm:items-center">
              <h1 className="mb-6">{s.heroTitle || service.title}</h1>
              {s.heroCtaLabel && <AppButton href={s.heroCtaLink || '#'} label={s.heroCtaLabel} />}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        {(s.approachText || s.approachImage?.url) && (
          <section className="bg-neutral-200 py-14 max-md:py-10">
            <div className="container grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-8">
              <div className="space-y-5 max-sm:text-center">
                {s.approachLabel && (
                  <FadeWrapper>
                    <h4 className="heading_b_border">{s.approachLabel}</h4>
                  </FadeWrapper>
                )}

                {s.approachText && (
                  <FadeWrapper delay={0.2}>
                    <h3>{s.approachText}</h3>
                  </FadeWrapper>
                )}
              </div>
              {s.approachImage?.url && (
                <div className="relative rounded-xl overflow-hidden border border-neutral-500 group">
                  <Image
                    src={s.approachImage.url}
                    alt="Our approach"
                    width={560}
                    height={403}
                    className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Features / Tabs */}
        {s.features?.length > 0 && (
          <ServiceDetailClient featuresTagline={s.featuresTagline} features={s.features} />
        )}

        {/* Engagement Timeline */}
        {s.timelineSteps?.length > 0 && (
          <section className="pt-20 max-md:pt-10 relative">
            <div className="container text-center mb-10 space-y-4">
              {s.timelineLabel && (
                <FadeWrapper>
                  <h4 className="heading_b_border">{s.timelineLabel}</h4>
                </FadeWrapper>
              )}
              {s.timelineHeading && (
                <FadeWrapper delay={0.2}>
                  <h3 className="max-w-4xl mx-auto">{s.timelineHeading}</h3>
                </FadeWrapper>
              )}
            </div>

            <div className="bg-base-200 py-10">
              <div className="container flex max-lg:grid grid-cols-2 gap-10 items-start max-md:grid-cols-1 max-lg:gap-5 relative">
                <div className="w-[45%] relative max-lg:w-auto">
                  {s.timelineSteps.map((step: any, i: number) => (
                    <div key={i} className="relative">
                      <FadeWrapper delay={0.3}>
                        <h4 className="heading_b_border">{step.stepLabel}</h4>
                      </FadeWrapper>

                      {step.stepDescription && (
                        <h3 className="pt-5 pl-9 pb-8 min-h-45 max-md:pl-0 max-sm:min-h-auto last:min-h-auto">
                          {step.stepDescription}
                        </h3>
                      )}
                      {i < s.timelineSteps.length - 1 && (
                        <div className="absolute left-0 bottom-2 max-md:left-1/2 max-md:-bottom-8 max-sm:hidden">
                          <Image
                            src="/images/down-arrow.png"
                            alt="down-arrow"
                            width={23}
                            height={135}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {/* <div className="absolute inset-0 bg-linear-to-t from-base-200 via-base-200/40 to-transparent" /> */}
                </div>

                {s.timelineImage?.url && (
                  <div className="w-[55%] sticky top-36 h-max max-lg:w-auto max-md:static group">
                    <div className="relative rounded-xl overflow-hidden border border-neutral-500 aspect-square max-md:aspect-video">
                      <Image
                        src={s.timelineImage.url}
                        alt="Engagement timeline"
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Work With Us */}
        <section className="pt-14 max-md:pt-10">
          <div className="container text-center mb-10">
            {s.workWithUsLabel && (
              <FadeWrapper>
                <h4 className="heading_b_border mb-6">{s.workWithUsLabel} </h4>
              </FadeWrapper>
            )}
            {s.workWithUsHeading && (
              <FadeWrapper delay={0.3}>
                <h3 className="whitespace-pre-line leading-relaxed">{s.workWithUsHeading}</h3>
              </FadeWrapper>
            )}
          </div>

          <div className="bg-base-200 py-10">
            <div className="container grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {(s.ctaCards?.length > 0
                ? s.ctaCards
                : [
                    {
                      cardTitle: 'Request a consultation',
                      cardDescription: 'Define your scope and priorities with a strategist.',
                      cardLink: '/contact',
                    },
                    {
                      cardTitle: 'Download service brief',
                      cardDescription: 'Explore methodology, benefits, and proof points.',
                      cardLink: '/contact',
                    },
                  ]
              ).map((card: any, i: number) => (
                <Link
                  key={i}
                  href={card.cardLink || '#'}
                  className="group flex flex-col justify-between gap-4 bg-neutral-200 border-2 border-neutral-500 rounded-xl p-6 hover:border-primary transition-colors duration-300"
                >
                  <div className="space-y-2">
                    <FadeWrapper delay={0.3}>
                      <h4>{card.cardTitle}</h4>
                    </FadeWrapper>

                    {card.cardDescription && (
                      <div className="h-32.5 bg-black-100 text-neutral-400 p-4 rounded-xl flex flex-col justify-between relative">
                        {card.cardDescription}
                        <div className="flex justify-end">
                          <div className="bg-neutral-200 min-w-11 h-11 flex justify-center items-center border border-neutral-500 rounded-sm group-hover:bg-white transition-colors duration-300">
                            <ArrowUpRight className="text-primary" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
