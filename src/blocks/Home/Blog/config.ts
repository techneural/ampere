import { Block } from 'payload'
import { formatSlug } from '@/utilities/formatSlug'

export const Blog: Block = {
  slug: 'blog',
  labels: {
    singular: 'Blog Section',
    plural: 'Blog Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Latest blog',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      defaultValue:
        'Explore expert perspectives, emerging technologies, and proven strategies to stay ahead in a rapidly evolving digital landscape.',
    },
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
