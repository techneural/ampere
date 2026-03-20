import { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  labels: {
    singular: 'Why Choose Us',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Creating reliable solutions is at the heart of our mission',
    },
    {
      name: 'highlightText',
      type: 'text',
      label: 'Highlight Text',
      defaultValue: '5 Public Cos | As Happy customers',
    },
    {
      name: 'subText',
      type: 'text',
      label: 'Sub Text',
      defaultValue: 'Where we provided NRE and Deployments',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Get in Touch',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Video',
    },
  ],
}
