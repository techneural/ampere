import BlogListPage from '@/components/common/BlogListPage'

type Post = {
  title: string
  source?: string
  date?: string
  slug?: string
  excerpt?: string
  image: {
    url: string
  }
}

type Props = {
  posts: Post[]
}

const BlogPageBlock = ({ posts }: Props) => {
  return <BlogListPage posts={posts ?? []} />
}

export default BlogPageBlock
