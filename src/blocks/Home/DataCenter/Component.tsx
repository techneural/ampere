import DataCenterSlider from '@/app/(frontend)/(homeComponents)/DataCenter/DataCenterSlider'
import { FadeWrapper } from '@/components/animations'

type DataCenterProps = {
  heading: string
  subHeading?: string
  items: {
    id: string
    title: string
    highLights?: string
    description?: string
    link?: string
    image: {
      url: string
      alt?: string
    }
  }[]
}

const DataCenterBlocks: React.FC<DataCenterProps> = ({ heading, subHeading, items }) => {
  return (
    <section className="pt-14">
      <div className="container">
        <div className="text-center max-w-203 mx-auto space-y-8">
          <FadeWrapper>
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>

          {subHeading && (
            <FadeWrapper delay={0.2}>
              <h3>{subHeading}</h3>
            </FadeWrapper>
          )}
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 pt-8 pb-18 max-xl:py-10">
        <div className="container relative">
          <DataCenterSlider items={items} />
        </div>
      </div>
    </section>
  )
}

export default DataCenterBlocks
