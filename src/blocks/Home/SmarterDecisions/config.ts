import { Block } from 'payload'

export const SmarterDecisions: Block = {
  slug: 'smarterDecisions',
  labels: {
    singular: 'Smarter Decisions Section',
    plural: 'Smarter Decisions Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Smarter Decisions Through Actionable Insights',
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
          name: 'source',
          type: 'text',
          label: 'Category / Source',
        },
        {
          name: 'date',
          type: 'text',
          label: 'Publish Date',
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
          label: 'External Blog Link',
        },
      ],
    },
  ],
}
