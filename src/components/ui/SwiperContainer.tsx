'use client'

import React, { useId } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { ChevronLeft, ChevronRight } from 'lucide-react'

type SwiperContainerProps<T> = {
  items: T[]
  slidesPerView?: number
  space?: number
  delay?: number
  autoplay?: boolean
  loop?: boolean
  showPagination?: boolean
  showNavigation?: boolean
  centeredSlides?: boolean
  pauseOnMouseEnter?: boolean
  slidesOffsetBefore?: number
  slidesOffsetAfter?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  breakpoints?: any
  renderItem: (item: T) => React.ReactNode
  className?: string
  prevClass?: string
  nextClass?: string
  navigationIconSize?: number
  navigationIconClass?: string
  paginationClassName?: string
}

function SwiperContainer<T>({
  items = [],
  slidesPerView = 1,
  space = 20,
  delay = 2500,
  autoplay = false,
  loop = false,
  showPagination = true,
  showNavigation = false,
  centeredSlides = false,
  pauseOnMouseEnter = true,
  slidesOffsetBefore = 0,
  slidesOffsetAfter = 0,
  breakpoints = {},
  renderItem,
  className = '',
  prevClass = 'swiper-button-prev-custom',
  nextClass = 'swiper-button-next-custom',
  navigationIconSize = 25,
  navigationIconClass = '',
  paginationClassName = '',
}: SwiperContainerProps<T>) {
  const uid = useId().replace(/:/g, '')
  const paginationEl = `swiper-pagination-${uid}`

  return (
    <div className="relative">
      {showNavigation && (
        <>
          <button
            suppressHydrationWarning
            className={`${prevClass} ${navigationIconClass} cursor-pointer`}
          >
            <ChevronLeft size={navigationIconSize} />
          </button>
          <button
            suppressHydrationWarning
            className={`${nextClass} ${navigationIconClass} cursor-pointer`}
          >
            <ChevronRight size={navigationIconSize} />
          </button>
        </>
      )}

      <Swiper
        modules={[Pagination, Navigation, Autoplay, Keyboard]}
        slidesPerView={slidesPerView}
        spaceBetween={space}
        keyboard={{ enabled: true }}
        autoplay={autoplay ? { delay, pauseOnMouseEnter, disableOnInteraction: false } : false}
        loop={loop}
        pagination={showPagination ? { clickable: true, el: `.${paginationEl}` } : false}
        navigation={showNavigation ? { prevEl: `.${prevClass}`, nextEl: `.${nextClass}` } : false}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints}
        slidesOffsetBefore={slidesOffsetBefore}
        slidesOffsetAfter={slidesOffsetAfter}
        className={`w-full ${className}`}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="max-h-full lg:h-auto!">
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      {showPagination && (
        <div
          className={`${paginationEl} custom-pagination flex justify-center gap-0 mt-14 max-lg:mt-10 ${paginationClassName}`}
        />
      )}
    </div>
  )
}

export default SwiperContainer
