import { Block } from 'payload'
import { formatSlug } from '@/utilities/formatSlug'

export const BlogPage: Block = {
  slug: 'blogPage',
  labels: {
    singular: 'Blog Page',
    plural: 'Blog Pages',
  },
  fields: [
    {
      name: 'posts',
      type: 'array',
      label: 'Blog Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          admin: { hidden: true },
          hooks: {
            beforeChange: [
              ({ value, siblingData }: { value?: string; siblingData?: Record<string, unknown> }) =>
                formatSlug((siblingData?.title as string) ?? value ?? ''),
            ],
          },
        },
        {
          name: 'source',
          type: 'text',
          label: 'Category / Source',
        },
        {
          name: 'date',
          type: 'date',
          label: 'Publish Date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'MMM d, yyyy',
            },
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Short Excerpt',
          admin: {
            description: 'A short summary shown on the blog detail page below the title.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Blog Content',
          admin: {
            description: 'Full blog article content shown on the detail page.',
          },
        },
      ],
    },
  ],
}
