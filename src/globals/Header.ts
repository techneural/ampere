import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media', // your media collection
    },
    {
      name: 'menu',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'path', type: 'text' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        // {
        //   name: 'calendlyUrl',
        //   type: 'text',
        //   label: 'Calendly URL',
        //   admin: {
        //     description:
        //       'Your Calendly scheduling link (e.g. https://calendly.com/your-name/30min). When set, the CTA button will open a Calendly popup instead of navigating to a URL.',
        //   },
        // },
      ],
    },
  ],
}
