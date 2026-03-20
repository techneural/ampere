import type { Block } from 'payload'

export const HighPerformance: Block = {
  slug: 'highPerformance',
  labels: {
    singular: 'High Performance Section',
    plural: 'High Performance Sections',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
  ],
}
