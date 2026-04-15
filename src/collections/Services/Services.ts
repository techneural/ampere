import { slugField, type CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateService, revalidateServiceDelete } from './hooks/revalidateService'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Services: CollectionConfig = {
    slug: 'services',
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
        defaultColumns: ['title', 'slug', 'updatedAt'],
        useAsTitle: 'title',
        livePreview: {
            url: ({ data, req }) =>
                generatePreviewPath({
                    slug: data?.slug,
                    collection: 'services',
                    req,
                }),
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: data?.slug as string,
                collection: 'services',
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
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
            label: 'Card Icon',
            admin: {
                description: 'Small icon shown on the home page service card.',
                position: 'sidebar',
            },
        },
        {
            name: 'cardDescription',
            type: 'textarea',
            label: 'Card Description',
            admin: {
                description: 'Short description shown on the home page service card.',
                position: 'sidebar',
            },
        },

        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Hero',
                    fields: [
                        {
                            name: 'heroMediaType',
                            type: 'select',
                            label: 'Hero Media Type',
                            defaultValue: 'video',
                            options: [
                                { label: 'Video', value: 'video' },
                                { label: 'Image', value: 'image' },
                            ],
                        },

                        {
                            name: 'heroVideo',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Hero Background Video',
                            admin: {
                                description: 'Full-width background video shown behind the service title.',
                                condition: (_, siblingData) => siblingData.heroMediaType === 'video',
                            },
                        },

                        {
                            name: 'heroImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Hero Background Image',
                            admin: {
                                description: 'Full-width background image shown behind the service title.',
                                condition: (_, siblingData) => siblingData.heroMediaType === 'image',
                            },
                        },
                        {
                            name: 'heroTitle',
                            type: 'text',
                            label: 'Hero Title',
                            admin: {
                                description: 'Large title shown on the hero banner (e.g. "Decoding risk: A new approach to operational oversight").',
                            },
                        },
                        {
                            name: 'heroCtaLabel',
                            type: 'text',
                            label: 'Hero CTA Button Label',
                            defaultValue: 'View Case Study',
                        },
                        {
                            name: 'heroCtaLink',
                            type: 'text',
                            label: 'Hero CTA Button Link',
                        },
                    ],
                },

                {
                    label: 'Our Approach',
                    fields: [
                        {
                            name: 'approachLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'Our Approach',
                        },
                        {
                            name: 'approachText',
                            type: 'textarea',
                            label: 'Approach Description',
                            admin: {
                                description: 'Text shown beside the approach image.',
                            },
                        },
                        {
                            name: 'approachImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Approach Image',
                        },
                    ],
                },

                {
                    label: 'Features',
                    fields: [
                        {
                            name: 'featuresTagline',
                            type: 'text',
                            label: 'Features Tagline',
                            admin: {
                                description: 'Small text above the tabs (e.g. "We help companies turn complexity into clarity").',
                            },
                        },

                        {
                            name: 'features',
                            type: 'array',
                            label: 'Feature Tabs',
                            fields: [
                                {
                                    name: 'tabTitle',
                                    type: 'text',
                                    label: 'Tab Title',
                                    required: true,
                                },
                                {
                                    name: 'featureImage',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Feature Section Image',
                                    admin: {
                                        description: 'Image shown on the left side of the feature tabs.',
                                    },
                                },
                                {
                                    name: 'contentTitle',
                                    type: 'text',
                                    label: 'Content Title',
                                },
                                {
                                    name: 'contentDescription',
                                    type: 'textarea',
                                    label: 'Content Description',
                                },
                                {
                                    name: 'ctaLabel',
                                    type: 'text',
                                    label: 'CTA Button Label',
                                    defaultValue: 'Talk to an expert',
                                },
                                {
                                    name: 'ctaLink',
                                    type: 'text',
                                    label: 'CTA Button Link',
                                },
                                {
                                    name: 'listItems',
                                    type: 'array',
                                    label: 'Feature List Items',
                                    admin: {
                                        description: 'Items shown as a list with icons (e.g. Discovery audit, Planning brief).',
                                    },
                                    fields: [
                                        {
                                            name: 'icon',
                                            type: 'upload',
                                            relationTo: 'media',
                                            label: 'Icon',
                                        },
                                        {
                                            name: 'label',
                                            type: 'text',
                                            label: 'Label',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },

                {
                    label: 'Engagement Timeline',
                    fields: [
                        {
                            name: 'timelineLabel',
                            type: 'text',
                            label: 'Section Label',
                            admin: {
                                description: 'Small label above the heading (e.g. "Clear, Modular Engagements Focused on Results").',
                            },
                        },
                        {
                            name: 'timelineHeading',
                            type: 'textarea',
                            label: 'Section Heading',
                        },
                        {
                            name: 'timelineImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Timeline Section Image',
                        },
                        {
                            name: 'timelineSteps',
                            type: 'array',
                            label: 'Timeline Steps',
                            fields: [
                                {
                                    name: 'stepLabel',
                                    type: 'text',
                                    label: 'Step Label',
                                    admin: {
                                        description: 'e.g. "1 week - Discovery Audit"',
                                    },
                                    required: true,
                                },
                                {
                                    name: 'stepDescription',
                                    type: 'textarea',
                                    label: 'Step Description',
                                },
                            ],
                        },
                    ],
                },

                {
                    label: 'Work With Us',
                    fields: [
                        {
                            name: 'workWithUsLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'Work with us',
                        },
                        {
                            name: 'workWithUsHeading',
                            type: 'textarea',
                            label: 'Section Heading',
                            defaultValue: 'Talk to our experts.\nReady to explore this service in detail?\nConnect with us and define your measurable next step.',
                        },
                        {
                            name: 'ctaCards',
                            type: 'array',
                            label: 'CTA Cards',
                            maxRows: 2,
                            fields: [
                                {
                                    name: 'cardTitle',
                                    type: 'text',
                                    label: 'Card Title',
                                    required: true,
                                },
                                {
                                    name: 'cardDescription',
                                    type: 'text',
                                    label: 'Card Description',
                                },
                                {
                                    name: 'cardLink',
                                    type: 'text',
                                    label: 'Card Link',
                                },
                            ],
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
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            label: 'Meta Description',
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
    ],

    hooks: {
        beforeChange: [populatePublishedAt],
        afterChange: [revalidateService],
        afterDelete: [revalidateServiceDelete],
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