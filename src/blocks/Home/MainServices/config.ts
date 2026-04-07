import { formatSlug } from '@/utilities/formatSlug';
import type { Block } from 'payload'

export const MainServices: Block = {
  slug: 'mainServices',
  labels: {
    singular: 'Main Services',
    plural: 'Main Services',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Main Service Areas',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'General Contracting & Vendor Management. Ready-to-go designs for speedy deployments. Procurement. Customized solutions (NRE / RFP) for cost-effective scaling.',
    },
    {
      name: 'services',
      type: 'array',
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
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Short Excerpt',
          admin: {
            description: 'A short summary shown on the service detail page below the title.',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Detail Page Banner Image',
          admin: {
            description: 'Hero image shown on the service detail page.',
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Service Content',
          admin: {
            description: 'Full service detail content shown on the detail page.',
          },
        },
        {
          name: 'link',
          type: 'text',
          admin: { hidden: true }, // kept for backward compat but link now uses slug
        },
      ],
    },
  ],
}
