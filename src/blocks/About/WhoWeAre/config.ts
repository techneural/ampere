// src/blocks/WhoWeAre/config.ts

import { Block } from 'payload'

export const WhoWeAre: Block = {
  slug: 'whoWeAre',
  labels: {
    singular: 'Who We Are',
    plural: 'Who We Are',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'who we are',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'We build the physical backbone of AI data centers, combining high-performance cooling, advanced power systems, and scalable infrastructure to enable faster and more efficient computing.',
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'content1',
          type: 'textarea',
        },
        {
          name: 'content2',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // Stats Section
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      minRows: 1,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
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
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    {
      name: 'speed',
      type: 'number',
      defaultValue: 50,
      label: 'Marquee Speed',
    },
  ],
}
