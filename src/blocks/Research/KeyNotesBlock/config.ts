import type { Block } from 'payload'

export const KeyNotesBlock: Block = {
    slug: 'keyNotes',
    labels: {
        singular: 'Key Notes Section',
        plural: 'Key Notes Sections',
    },
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

        // IMAGE
        {
            name: 'image',
            type: 'group',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },

        // HIGHLIGHTS
        {
            name: 'highlights',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'variant',
                    type: 'select',
                    required: true,
                    options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                        { label: 'Accent', value: 'accent' },
                        { label: 'Muted', value: 'muted' },
                    ],
                },
            ],
        },
    ],
}