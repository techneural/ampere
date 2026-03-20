import { Block } from 'payload'

export const AboutBanner: Block = {
  slug: 'aboutBanner', // ✅ changed

  labels: {
    singular: 'About Banner',
    plural: 'About Banners',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
