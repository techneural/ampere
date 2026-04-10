import type { Block } from 'payload'

export const MainServices: Block = {
  slug: 'mainServices',
  labels: {
    singular: 'Main Services',
    plural: 'Main Services',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Main Service Areas',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'General Contracting & Vendor Management. Ready-to-go designs for speedy deployments. Procurement. Customized solutions (NRE / RFP) for cost-effective scaling.',
    },
  ],
}