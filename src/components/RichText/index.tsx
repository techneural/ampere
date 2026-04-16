import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { Play } from 'lucide-react'

// ─── Custom JSX converters — match Ampere Labs dark design system ─────────────

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => (
    <p className="font-montserrat text-neutral-400 font-medium mb-5 last:mb-0">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),

  heading: ({ node, nodesToJSX }) => {
    const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    const styles: Record<string, string> = {
      h2: 'mb-3',
      h3: 'mb-3',
      h4: 'mb-2',
      h5: 'mb-2',
      h6: 'text-neutral-400 mb-2 uppercase tracking-widest',
    }
    const Tag = tag
    return (
      <Tag className={`${styles[tag] ?? styles.h2} font-montserrat`}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },

  list: ({ node, nodesToJSX }) => {
    const isOrdered = node.listType === 'number'
    const Tag = isOrdered ? 'ol' : 'ul'
    return (
      <Tag
        className={`space-y-4 mt-4 mb-6 font-montserrat ${isOrdered ? 'list-none counter-reset-item' : ''}`}
      >
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },

  listitem: ({ node, nodesToJSX }) => {
    const isChecked = node.checked === true
    const isCheckList = node.checked !== undefined

    if (isCheckList) {
      return (
        <li className="flex items-start gap-3 text-gray-400 font-montserrat">
          <span
            className={`mt-1 size-4 rounded-sm border shrink-0 flex items-center justify-center text-[10px] ${
              isChecked ? 'bg-primary border-primary text-white' : 'border-neutral-500'
            }`}
          >
            {isChecked && '✓'}
          </span>
          <span className="leading-snug">{nodesToJSX({ nodes: node.children })}</span>
        </li>
      )
    }

    return (
      <li className="flex items-start gap-3 text-gray-400 font-montserrat">
        <Play fill="#e0e0e0" stroke="#e0e0e0" className="mt-0.5 w-4 h-4 shrink-0" />
        <span className="leading-snug">{nodesToJSX({ nodes: node.children })}</span>
      </li>
    )
  },

  quote: ({ node, nodesToJSX }) => (
    <blockquote className="mt-2 mb-8 text-neutral-400 text-lg leading-relaxed max-md:text-base max-md:leading-snug">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),

  horizontalrule: () => <hr className="my-10 border-neutral-500" />,

  link: ({ node, nodesToJSX }) => {
    const doc = node.fields?.doc?.value

    let internalSlug = ''

    if (doc && typeof doc === 'object' && 'slug' in doc) {
      internalSlug = String(doc.slug)
    }

    const url =
      node.fields?.url ?? (node.fields?.linkType === 'internal' ? `/${internalSlug}` : '#')

    const isExternal = node.fields?.newTab === true

    return (
      <Link
        href={url}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity duration-200"
      >
        {nodesToJSX({ nodes: node.children })}
      </Link>
    )
  },

  upload: ({ node }) => {
    const value = node.value as Media

    if (!value?.url) return null

    const isImage = value.mimeType?.startsWith('image/')

    if (isImage) {
      return (
        <figure className="my-8">
          <div className="relative rounded-xl overflow-hidden border border-neutral-500">
            <Image
              src={value.url}
              alt={value.alt ?? value.filename ?? ''}
              width={value.width ?? 1200}
              height={value.height ?? 600}
              className="w-full object-cover max-h-125"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-neutral-400 text-xs font-avenirLtStd mt-3">
              <LexicalRichText data={value.caption} />
            </figcaption>
          )}
        </figure>
      )
    }

    return (
      <a
        href={value.url}
        download
        className="inline-flex items-center gap-2 border border-neutral-500 hover:border-primary text-neutral-400 hover:text-white font-avenirLtStd text-sm rounded-sm px-4 py-2 my-4 transition-colors duration-200"
      >
        ↓ {value.filename}
      </a>
    )
  },
})

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  data: SerializedEditorState
  className?: string
}

const RichText = ({ data, className = '' }: Props) => {
  if (!data) return null

  return (
    <div className={`rich-text ${className}`}>
      <LexicalRichText data={data} converters={jsxConverters} />
    </div>
  )
}

export default RichText
