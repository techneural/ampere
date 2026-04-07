'use client'

import React from 'react'
import AppButton from '@/components/ui/AppButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Banner = (props: any) => {
  const { title, subtitle, buttonText, buttonLink, video } = props

  return (
    <section className="min-h-[calc(100vh-71px)] flex items-center relative z-10">
      {video?.url && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={video.url} type="video/mp4" />
        </video>
      )}

      <div className="container text-center z-10">
        <div className="max-w-137.5 mx-auto relative py-10">
          <div className="absolute inset-0 -z-10 blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0)_90%)]"></div>

          {title && <h1 className="mb-3">{title}</h1>}

          {subtitle && <h2 className="mb-6">{subtitle}</h2>}

          {buttonText && (
            <AppButton label={buttonText} variant="primary" size="md" href={buttonLink || '#'} />
          )}
        </div>
      </div>
    </section>
  )
}

export default Banner
