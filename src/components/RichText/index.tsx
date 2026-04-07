import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

// ─── Custom JSX converters — match Ampere Labs dark design system ─────────────

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  paragraph: ({ node, nodesToJSX }) => (
    <p className="font-avenirLtStd text-neutral-400 leading-loose text-base max-md:text-sm mb-6 last:mb-0">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),

  heading: ({ node, nodesToJSX }) => {
    const tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    const styles: Record<string, string> = {
      h1: 'text-4xl max-md:text-2xl font-bold leading-tight mt-12 mb-5 pt-4 border-t border-neutral-500',
      h2: 'font-avenirLtStd text-2xl max-md:text-xl font-semibold mt-10 mb-4 pt-3 border-t border-neutral-500',
      h3: 'font-medium text-xl max-md:text-lg mt-8 mb-3',
      h4: 'font-avenirLtStd font-semibold text-lg max-md:text-base mt-6 mb-2',
      h5: 'font-semibold text-base mt-5 mb-2',
      h6: 'font-medium text-sm text-neutral-400 mt-4 mb-2 uppercase tracking-widest',
    }
    const Tag = tag
    return <Tag className={styles[tag] ?? styles.h2}>{nodesToJSX({ nodes: node.children })}</Tag>
  },

  list: ({ node, nodesToJSX }) => {
    const isOrdered = node.listType === 'number'
    const Tag = isOrdered ? 'ol' : 'ul'
    return (
      <Tag className={`space-y-3 mb-6 pl-1 ${isOrdered ? 'list-none counter-reset-item' : ''}`}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },

  listitem: ({ node, nodesToJSX }) => {
    const isChecked = node.checked === true
    const isCheckList = node.checked !== undefined

    if (isCheckList) {
      return (
        <li className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
          <span
            className={`mt-1 size-4 rounded-sm border shrink-0 flex items-center justify-center text-[10px] ${
              isChecked ? 'bg-primary border-primary text-white' : 'border-neutral-500'
            }`}
          >
            {isChecked && '✓'}
          </span>
          <span>{nodesToJSX({ nodes: node.children })}</span>
        </li>
      )
    }

    return (
      <li className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed font-avenirLtStd">
        <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
        <span>{nodesToJSX({ nodes: node.children })}</span>
      </li>
    )
  },

  quote: ({ node, nodesToJSX }) => (
    <blockquote className="border-l-4 border-primary pl-6 my-8 text-neutral-400 italic font-avenirLtStd text-base leading-relaxed bg-neutral-200/40 py-4 pr-4 rounded-r-lg">
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
