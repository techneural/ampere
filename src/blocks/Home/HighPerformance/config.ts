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
      defaultValue: "Acceoerating high-performance and sustainable AI",
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: "We design and engineer the physical infrastructure powering AI data centers from high-density cooling systems to advanced power systems enabling faster, greener, and more resilient computing.",
      required: true,
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: "View more"
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
  ],
}
