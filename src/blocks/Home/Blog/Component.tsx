import { FadeWrapper } from '@/components/animations'
import BlogCard from '@/components/common/BlogCard'

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
          {posts?.map((item, index) => (
            <BlogCard key={index} item={item} comingSoon={!item.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SmarterDecisions
