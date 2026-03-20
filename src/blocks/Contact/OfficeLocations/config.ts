import { Block } from 'payload'

export const OfficeLocations: Block = {
  slug: 'officeLocations',
  labels: {
    singular: 'Office Locations',
    plural: 'Office Locations',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Explore Our Office Locations',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'contacts',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
    },
    {
      name: 'locations',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
}
