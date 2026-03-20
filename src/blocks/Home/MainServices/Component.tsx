import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'

type Props = {
  title: string
  description?: string
  services: {
    title: string
    description: string
    link?: string
    icon: {
      url: string
    }
  }[]
}

export const MainServicesBlock: React.FC<Props> = ({ title, description, services }) => {
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
          {services?.map((item, index) => (
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

                <Link href={item.link || '#'}>
                  <FadeWrapper delay={0.4}>
                    <h3 className="max-xl:mb-3 mb-5 group-hover:text-primary">{item.title}</h3>
                  </FadeWrapper>
                </Link>
                <FadeWrapper delay={0.5}>
                  <p className="font-avenirLtStd text-neutral-400">{item.description}</p>
                </FadeWrapper>
              </div>

              <FadeWrapper delay={0.6}>
                <AppButton
                  href={item.link}
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
          ))}
        </div>
      </div>
    </section>
  )
}
