import { Block } from 'payload'

export const DeploymentReady: Block = {
  slug: 'deploymentReady',
  labels: {
    singular: 'Deployment Ready',
    plural: 'Deployment Ready Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Deployment Ready Modules',
    },
    {
      name: 'subHeading',
      type: 'textarea',
      label: 'Sub Heading',
      defaultValue:
        'Accelerate time-to-market with secure, high-performance components designed for reliability, operational flexibility, and scalable infrastructure that supports long-term growth.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Modules',
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
          name: 'link',
          type: 'text',
          label: 'Module Link',
        },
      ],
    },
  ],
}
