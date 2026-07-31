import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidatePath, revalidateTag } from 'next/cache'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Manage legal documents (Terms & Conditions, Privacy Policy).',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      admin: {
        description: 'Determines the URL path where this document is served.',
      },
      options: [
        { label: 'Terms & Conditions (/terms)', value: 'terms' },
        { label: 'Privacy Policy (/privacy-policy)', value: 'privacy-policy' },
      ],
    },
    {
      name: 'lastUpdated',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'MMMM d, yyyy' },
        description: 'Shown at the top of the page as “Last updated”.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Meta Title',
              admin: {
                description: 'Title shown in search engine results. Recommended: 50–60 characters.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                description:
                  'Description shown in search engine results. Recommended: 150–160 characters.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image',
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [
      ({ doc }) => {
        if (doc?.slug) {
          revalidatePath(`/${doc.slug}`)
          revalidateTag(`legal-page-${doc.slug}`)
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc?.slug) {
          revalidatePath(`/${doc.slug}`)
          revalidateTag(`legal-page-${doc.slug}`)
        }
      },
    ],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}
