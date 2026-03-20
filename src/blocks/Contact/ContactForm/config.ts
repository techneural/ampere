import { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Let’s build clarity together',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Every great project starts with a conversation',
    },
    {
      name: 'quote',
      type: 'textarea',
      defaultValue:
        'Complex problems don’t need more noise - they need structure, clarity, and execution.',
    },
    {
      name: 'authorName',
      type: 'text',
      defaultValue: 'James Anderson',
    },
    {
      name: 'authorRole',
      type: 'text',
      defaultValue: 'CFO & Co-Founder',
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'formTitle',
      type: 'text',
      defaultValue: 'Send us a message',
    },
    {
      name: 'formDescription',
      type: 'textarea',
      defaultValue: 'Choose the type of inquiry and tell us more about what you need.',
    },
    {
      name: 'subjects',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
}
