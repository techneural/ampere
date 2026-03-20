import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  src?: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, src, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={70}
      height={70}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={`${className}`}
      src={src}
    />
  )
}
