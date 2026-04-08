import { Block } from 'payload'

export const Blog: Block = {
  slug: 'blog',
  labels: {
    singular: 'Latest Blog Section',
    plural: 'Latest Blog Sections',
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
  ],
}
