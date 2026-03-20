import { Block } from 'payload'

export const StepByStep: Block = {
  slug: 'stepByStep',
  labels: {
    singular: 'Step By Step',
    plural: 'Step By Step',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Step-by-Step Workflow',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      defaultValue:
        'Streamlined Work Process That Drives Results Efficient, Transparent, and Tailored for Your Success.',
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
