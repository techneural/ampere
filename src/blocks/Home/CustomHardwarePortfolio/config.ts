import { Block } from 'payload'

export const CustomHardwarePortfolio: Block = {
  slug: 'customHardwarePortfolio',
  labels: {
    singular: 'Custom Hardware Portfolio',
    plural: 'Custom Hardware Portfolios',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Our Custom Hardware Portfolio',
    },
    {
      name: 'subHeading',
      type: 'textarea',
      label: 'Sub Heading',
      defaultValue:
        'From edge devices to high density compute systems, our designs deliver optimized efficiency, reliability and seamless integration into modern digital ecosystems.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Hardware Items',
      fields: [
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}
