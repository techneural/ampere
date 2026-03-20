// globals/Footer.ts
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },

    // Menu
    {
      name: 'menu',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'path', type: 'text' },
      ],
    },

    // Social Links
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'url', type: 'text' },
      ],
    },

    // Contact Info
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },

    // Copyright
    {
      name: 'copyright',
      type: 'text',
      defaultValue: 'All rights reserved',
    },
  ],
}
