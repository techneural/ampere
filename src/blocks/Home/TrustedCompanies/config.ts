import type { Block } from 'payload'

export const TrustedCompanies: Block = {
  slug: 'trustedCompanies',
  labels: {
    singular: 'Trusted Companies',
    plural: 'Trusted Companies',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Trusted By 250+ Companies',
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
