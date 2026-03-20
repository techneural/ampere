import { Block } from 'payload'

export const ResearchPortfolio: Block = {
  slug: 'researchPortfolio',
  labels: {
    singular: 'Research Portfolio',
    plural: 'Research Portfolio Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Research Portfolio',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      defaultValue:
        'Our research portfolio focuses on advancing technologies in blockchain, distributed systems, and modern data center infrastructure. We continuously explore innovative solutions to improve security, scalability, and performance for next-generation digital platforms.',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Portfolio Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
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
          label: 'Card Link',
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'View More',
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '/',
    },
  ],
}
