import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HighPerformanceBlock } from '@/blocks/Home/HighPerformance/Component'
import { TrustedCompaniesBlock } from './Home/TrustedCompanies/Component'
import { MainServicesBlock } from './Home/MainServices/Component'
import DataCenterBlocks from './Home/DataCenter/Component'
import DeploymentReady from './Home/DeploymentReady/Component'
import CustomHardwarePortfolio from './Home/CustomHardwarePortfolio/Component'
import WhyChooseUs from './Home/WhyChooseUs/Component'
import ResearchPortfolio from './Home/ResearchPortfolio/Component'
import SmarterDecisions from './Home/SmarterDecisions/Component'
import Faq from './Home/Faq/Component'
import OurMission from './About/OurMission/Component'
import WhoWeAre from './About/WhoWeAre/Component'
import TalentedTeam from './About/TalentedTeam/Component'
import StepByStep from './About/StepByStep/Component'
import Insights from './About/Insights/Component'
import Banner from './Home/Banner/Component'
import AboutBanner from './About/AboutBanner/Component'
import ContactForm from './Contact/ContactForm/Component'
import OfficeLocations from './Contact/OfficeLocations/Component'
import KeyNotes from './Research/KeyNotesBlock/Component'
import PatentCards from './Research/PatentCards/Component'

const blockComponents = {
  banner: Banner,
  highPerformance: HighPerformanceBlock,
  trustedCompanies: TrustedCompaniesBlock,
  mainServices: MainServicesBlock,
  dataCenter: DataCenterBlocks,
  deploymentReady: DeploymentReady,
  customHardwarePortfolio: CustomHardwarePortfolio,
  whyChooseUs: WhyChooseUs,
  researchPortfolio: ResearchPortfolio,
  smarterDecisions: SmarterDecisions,
  faq: Faq,
  //About
  aboutBanner: AboutBanner,
  ourMission: OurMission,
  whoWeAre: WhoWeAre,
  talentedTeam: TalentedTeam,
  stepByStep: StepByStep,
  insights: Insights,
  //Contact
  contactForm: ContactForm,
  officeLocations: OfficeLocations,
  //Research
  patentCards: PatentCards,
  keyNotes: KeyNotes,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return <Block key={index} {...block} disableInnerContainer />
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
