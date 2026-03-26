import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConfig } from 'payload'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { populatePublishedAt } from '@/app/hooks/populatePublishedAt'

//Home
import { Banner } from '@/blocks/Home/Banner/config'
import { HighPerformance } from '@/blocks/Home/HighPerformance/config'
import { TrustedCompanies } from '@/blocks/Home/TrustedCompanies/config'
import { MainServices } from '@/blocks/Home/MainServices/config'
import { DataCenter } from '@/blocks/Home/DataCenter/config'
import { DeploymentReady } from '@/blocks/Home/DeploymentReady/config'
import { CustomHardwarePortfolio } from '@/blocks/Home/CustomHardwarePortfolio/config'
import { WhyChooseUs } from '@/blocks/Home/WhyChooseUs/config'
import { ResearchPortfolio } from '@/blocks/Home/ResearchPortfolio/config'
import { SmarterDecisions } from '@/blocks/Home/SmarterDecisions/config'
import { Faq } from '@/blocks/Home/Faq/config'

//About
import { AboutBanner } from '@/blocks/About/AboutBanner/config'
import { OurMission } from '@/blocks/About/OurMission/config'
import { WhoWeAre } from '@/blocks/About/WhoWeAre/config'
import { TalentedTeam } from '@/blocks/About/TalentedTeam/config'
import { StepByStep } from '@/blocks/About/StepByStep/config'
import { Insights } from '@/blocks/About/Insights/config'

//Contact
import { ContactForm } from '@/blocks/Contact/ContactForm/config'
import { OfficeLocations } from '@/blocks/Contact/OfficeLocations/config'

//Reseach
import { KeyNotesBlock } from '@/blocks/Research/KeyNotesBlock/config'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { PatentSection } from '@/blocks/Research/PatentCards/config'
import { BlockchainBanner } from '@/blocks/Blockchain/BlockchainBanner/config'
import { Revolution } from '@/blocks/Blockchain/Revolution/config'
import { AmpereExpo } from '@/blocks/Blockchain/AmpereExpo/config'
import { WeBuild } from '@/blocks/Blockchain/WeBuild/config'
import { Innovation } from '@/blocks/Blockchain/Innovation/config'
import { Services } from '@/blocks/Blockchain/Services/config'
import { TransformingBusiness } from '@/blocks/Blockchain/TransformingBusiness/config'
import { DecentralizingFinance } from '@/blocks/Blockchain/DecentralizingFinance/config'


export const Pages: CollectionConfig = {
  slug: 'pages',
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
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  // access: {
  //   read: () => true,
  // },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Use "home" for the homepage. Do NOT use "/" — use "home" instead.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Banner,
                HighPerformance,
                TrustedCompanies,
                MainServices,
                DataCenter,
                DeploymentReady,
                CustomHardwarePortfolio,
                WhyChooseUs,
                ResearchPortfolio,
                SmarterDecisions,
                Faq,
                //About
                AboutBanner,
                OurMission,
                WhoWeAre,
                TalentedTeam,
                StepByStep,
                Insights,
                //Contact
                ContactForm,
                OfficeLocations,
                //Research
                PatentSection,
                KeyNotesBlock,
                //Blockchain
                BlockchainBanner,
                Revolution,
                AmpereExpo,
                WeBuild,
                Innovation,
                Services,
                TransformingBusiness,
                DecentralizingFinance
              ],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
