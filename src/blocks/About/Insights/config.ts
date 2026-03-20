// src/blocks/Insights/config.ts

import { Block } from 'payload'

export const Insights: Block = {
  slug: 'insights',
  labels: {
    singular: 'Insights',
    plural: 'Insights',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Insights',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Insights Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'source',
          type: 'text',
        },
        {
          name: 'date',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'External Link',
          required: true,
        },
      ],
    },
  ],
}
