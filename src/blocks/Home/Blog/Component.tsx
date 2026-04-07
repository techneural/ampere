import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeWrapper } from '@/components/animations'

type Post = {
  title: string
  source?: string
  date?: string
  slug?: string
  image: {
    url: string
  }
  link?: string
}

type Props = {
  heading: string
  description?: string
  posts: Post[]
}

const SmarterDecisions = ({ heading, description, posts }: Props) => {
  return (
    <section className="pt-14">
      <div className="container">
        <div className="text-center max-w-203 mx-auto space-y-8">
          <FadeWrapper>
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>
          {description && (
            <FadeWrapper delay={0.2}>
              <h3>{description}</h3>
            </FadeWrapper>
          )}
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 py-8 max-xl:py-10">
        <div className="container relative flex gap-7.5 max-md:flex-col">
          {posts?.map((item, index) => {
            return (
              <Link
                // href={item.slug ? `/blog/${item.slug}` : '#'}
                href="/coming-soon"
                key={index}
                className="group w-full md:min-h-109 max-w-full inline-block border-2 border-neutral-500 rounded-2xl hover:w-[150%] transition-[width] duration-450 ease-in-out overflow-clip cursor-pointer"
              >
                <div className="rounded-t-xl relative">
                  <Image
                    src={item.image?.url}
                    alt={item.title}
                    width={602}
                    height={403}
                    className="w-full md:h-82 object-cover"
                  />

                  <button className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center absolute bottom-4 right-4 border border-neutral-500 group-hover:bg-white group-hover:border-white transition-colors duration-300">
                    <ArrowUpRight className="text-primary" />
                  </button>
                </div>

                <div className="px-6 py-5 border-t-2 bg-neutral-200 border-neutral-500">
                  <div className="font-avenirLtStd flex items-center gap-6 mb-2 text-neutral-400">
                    {item.source && (
                      <div className="flex items-center gap-1">
                        <Image src="/images/source.png" alt="source-icon" width={40} height={40} />
                        <FadeWrapper>
                          <p>{item.source}</p>
                        </FadeWrapper>
                      </div>
                    )}

                    {item.date && (
                      <div className="flex items-center gap-1">
                        <Image
                          src="/images/calender.png"
                          alt="calender-icon"
                          width={30}
                          height={30}
                        />
                        <FadeWrapper>
                          <p>
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </FadeWrapper>
                      </div>
                    )}
                  </div>

                  <FadeWrapper delay={0.4}>
                    <h4 className="line-clamp-1 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                  </FadeWrapper>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SmarterDecisions
