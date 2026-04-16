import { slugField, type CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
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
    meta: {
      title: true,
      description: true,
      image: true,
    },
  },

  admin: {
    defaultColumns: ['title', 'source', 'publishedAt', 'updatedAt'],
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
    slugField(),
    {
      name: 'publishedAt',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'source',
              type: 'text',
              label: 'Category / Source',
              admin: { position: 'sidebar' },
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