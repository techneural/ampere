import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { formatSlug } from '@/utilities/formatSlug'
import { revalidateBlog, revalidateBlogDelete } from './hooks/revalidateBlog'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },

  defaultPopulate: {
    title: true,
    slug: true,
  },

  admin: {
    defaultColumns: ['title', 'source', 'date', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'blogs',
          req,
        }),
    },

    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'blogs',
        req,
      }),
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'slug',
              type: 'text',
              admin: { position: 'sidebar' },
              hooks: {
                beforeChange: [
                  ({ value, siblingData }) =>
                    formatSlug((siblingData?.title as string) ?? value ?? ''),
                ],
              },
            },
            {
              name: 'source',
              type: 'text',
              label: 'Category / Source',
              admin: { position: 'sidebar' },
            },
            {
              name: 'date',
              type: 'date',
              label: 'Publish Date',
              admin: {
                position: 'sidebar',
                date: {
                  pickerAppearance: 'dayOnly',
                  displayFormat: 'MMM d, yyyy',
                },
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Short Excerpt',
              admin: {
                description:
                  'A short summary shown on the blog listing and detail page below the title.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Blog Content',
              admin: {
                description:
                  'Full blog article content shown on the detail page.',
              },
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: { position: 'sidebar' },
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
                description:
                  'Title shown in search engine results. Recommended: 50–60 characters.',
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
              admin: {
                description:
                  'Image shown when shared on social media. Recommended: 1200×630px.',
              },
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateBlog],
    afterDelete: [revalidateBlogDelete],
  },

  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}