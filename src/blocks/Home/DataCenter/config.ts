import { Block } from 'payload'

export const DataCenter: Block = {
  slug: 'dataCenter',
  labels: {
    singular: 'Data Center',
    plural: 'Data Centers',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Our Datacenter Design Experience',
    },
    {
      name: 'subHeading',
      type: 'textarea',
      label: 'Sub Heading',
      defaultValue:
        'From power and cooling optimization to security and future-ready infrastructure, our designs transform mission -critical environments into strategic business assets.',
    },

    {
      name: 'items',
      type: 'array',
      label: 'Data Center Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'highLights',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Project Link',
        },
      ],
    },
  ],
}
