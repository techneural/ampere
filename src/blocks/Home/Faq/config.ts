import { Block } from 'payload'

export const Faq: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Here are some frequently asked questions',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Better Energy Starts Here that is Powered by Advanced Solar Materials and with it’s Modern Tech',
      label: 'Section Description',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
