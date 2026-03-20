// src/blocks/TalentedTeam/config.ts

import { Block } from 'payload'

export const TalentedTeam: Block = {
  slug: 'talentedTeam',
  labels: {
    singular: 'Talented Team',
    plural: 'Talented Team',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Our Talented Team',
      required: true,
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
