import { Block } from 'payload'

export const OurMission: Block = {
  slug: 'ourMission',
  labels: {
    singular: 'Our Mission',
    plural: 'Our Missions',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Mission',
    },
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      defaultValue: 'Accelerating high-performance and sustainable AI',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
