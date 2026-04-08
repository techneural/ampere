'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import BlogCard from './BlogCard'

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────────

const POSTS_PER_PAGE = 4

// ─── Blog Card ────────────────────────────────────────────────────────────────

// ─── Blog List Page ───────────────────────────────────────────────────────────

const BlogListPage = ({ posts }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Derive unique categories from posts
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.source).filter(Boolean) as string[]))
    return ['All', ...cats]
  }, [posts])

  // Filter posts by category + search
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return posts.filter((post) => {
      const matchCat = activeCategory === 'All' || post.source === activeCategory
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.source && post.source.toLowerCase().includes(q)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [posts, activeCategory, searchQuery])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="min-h-screen py-16">
      <div className="container">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="flex flex-wrap gap-2.5 flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`btn btn-md rounded-lg border ${
                  activeCategory === cat
                    ? 'bg-transparent text-white border-primary'
                    : 'bg-linear-to-t from-[#151515] via-neutral-200 to-transparent text-neutral-400 border-neutral-500 hover:border-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-neutral-200 border border-neutral-500 rounded-lg overflow-hidden min-w-100"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Enter Key Words"
              className="flex-1 bg-transparent px-4 py-[1.094rem] text-sm font-avenirLtStd text-white placeholder:text-neutral-400 outline-none"
            />
            <button
              type="submit"
              className="bg-primary px-5.5 py-[1.188rem] flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
            >
              <Search size={16} className="text-white" />
            </button>
          </form>
        </div>

        {/* ── Grid ───────────────────────────────────────────────────── */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {paginatedPosts.map((post, index) => (
              <BlogCard key={post.slug ?? index} item={post} comingSoon={!post.slug} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-400 font-avenirLtStd">
            <Search size={40} className="mb-4 opacity-40" />
            <p className="text-lg">No posts found.</p>
            <p className="text-sm mt-1 opacity-60">Try a different category or keyword.</p>
          </div>
        )}

        {/* ── Pagination ─────────────────────────────────────────────── */}
        {/* {totalPages > 1 && ( */}
        <div className="flex justify-center items-center gap-2.5 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`size-8 rounded-sm text-sm font-avenirLtStd transition-colors duration-200 cursor-pointer
                  ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-neutral-200 border border-neutral-500 text-neutral-400 hover:border-neutral-400 hover:text-white'
                  }`}
            >
              {page}
            </button>
          ))}
        </div>
        {/* )} */}
      </div>
    </section>
  )
}

export default BlogListPage
