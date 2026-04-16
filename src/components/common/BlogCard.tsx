'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

type BlogItem = {
  title: string
  image?: { url?: string }
  publishedAt?: string
  source?: string
  slug?: string
}

type BlogCardProps = {
  item: BlogItem
  comingSoon?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({ item, comingSoon }) => {
  return (
    <Link
      href={comingSoon ? '/coming-soon' : `/blog/${item.slug}`}
      className="group w-full max-w-full flex flex-col border-2 border-neutral-500 rounded-2xl hover:w-[150%] transition-[width] duration-450 ease-in-out overflow-clip cursor-pointer"
    >
      <div className="rounded-t-xl relative flex-1">
        <Image
          src={item.image?.url || '/placeholder.png'}
          alt={item.title}
          width={602}
          height={403}
          className="w-full md:h-82 object-cover"
        />

        <button className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center absolute bottom-4 right-4 border border-neutral-500 group-hover:bg-white group-hover:border-white transition-colors duration-300 max-md:size-7">
          <ArrowUpRight className="text-primary max-md:size-4" />
        </button>
      </div>

      <div className="px-6 py-5 border-t-2 bg-neutral-200 border-neutral-500 max-lg:p-3">
        <div className="font-avenirLtStd flex items-center gap-6 mb-2 text-neutral-400 max-lg:mb-1 max-md:gap-2">
          {item.source && (
            <div className="flex items-center gap-1 max-md:gap-0">
              <Image
                src="/images/source.png"
                alt="source-icon"
                width={40}
                height={40}
                className="max-md:size-7"
              />
              <p>{item.source}</p>
            </div>
          )}

          {item.publishedAt && (
            <div className="flex items-center gap-1 max-md:gap-0">
              <Image
                src="/images/calender.png"
                alt="calendar-icon"
                width={30}
                height={30}
                className="max-md:size-5"
              />
              <p>
                {new Date(item.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>

        <h4 className="line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h4>
      </div>
    </Link>
  )
}

export default BlogCard
