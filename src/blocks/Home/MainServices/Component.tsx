import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

type Props = {
  title: string
  description?: string
}

export const MainServicesBlock: React.FC<Props> = async ({ title, description }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft: false,
    limit: 100,
    pagination: false,
    sort: 'createdAt',
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services = result.docs as any[]

  return (
    <section className="pt-14">
      <div className="container">
        <div className="text-center max-w-191.5 mx-auto space-y-8">
          <FadeWrapper>
            <h4 className="heading_b_border">{title}</h4>
          </FadeWrapper>
          {description && (
            <FadeWrapper delay={0.2}>
              <h3>{description}</h3>
            </FadeWrapper>
          )}
        </div>
      </div>
      <div className="bg-neutral-300 mt-14 py-14 max-xl:py-10">
        <div className="container grid grid-cols-3 gap-21 relative max-md:grid-cols-1 max-md:gap-10">
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-52.25 flex justify-center pointer-events-none max-md:hidden">
            <div className="absolute w-1.5 h-full bg-primary blur-xl opacity-40"></div>
            <div className="w-0.5 h-full bg-linear-to-b from-transparent via-primary to-transparent"></div>
          </div>

          <div className="absolute left-2/3 top-1/2 -translate-y-1/2 h-52.25 flex justify-center pointer-events-none max-md:hidden">
            <div className="absolute w-1.5 h-full bg-primary blur-xl opacity-40"></div>
            <div className="w-0.5 h-full bg-linear-to-b from-transparent via-primary to-transparent"></div>
          </div>

          {services?.map((item, index) => {
            const href = item.slug ? `/service/${item.slug}` : '#'

            return (
              <div key={index} className="group flex flex-col max-md:text-center">
                <div className="flex-1">
                  <div className="relative flex items-center justify-center size-15 rounded-lg bg-neutral-300 border border-neutral-800 mb-8 max-md:mx-auto">
                    {item.icon?.url && (
                      <Image
                        src={item.icon.url}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="size-12.5"
                      />
                    )}
                  </div>

                  <Link href={href}>
                    <FadeWrapper delay={0.4}>
                      <h3 className="max-xl:mb-3 mb-5 group-hover:text-primary line-clamp-2">{item.title}</h3>
                    </FadeWrapper>
                  </Link>
                  <FadeWrapper delay={0.5}>
                    <p className="font-avenirLtStd text-neutral-400 line-clamp-4">{item.cardDescription}</p>
                  </FadeWrapper>
                </div>

                <FadeWrapper delay={0.6}>
                  <AppButton
                    href={href}
                    // href="/coming-soon"
                    label={
                      <>
                        Learn more
                        <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    }
                    className="max-xl:mt-6 mt-12 bg-neutral-200! hover:bg-neutral-200/60 border-0 w-full group-hover:bg-primary!"
                  />
                </FadeWrapper>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
