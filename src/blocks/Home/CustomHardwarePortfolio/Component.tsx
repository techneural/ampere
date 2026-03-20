import CustomHardwarePortfolioSlider from '@/app/(frontend)/(homeComponents)/CustomHardwarePortfolio/CustomHardwarePortfolioSlider'
import { FadeWrapper } from '@/components/animations'

type Props = {
  heading: string
  subHeading?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}

const CustomHardwarePortfolio = ({ heading, subHeading, items }: Props) => {
  return (
    <section className="pt-14">
      <div className="container flex flex-col-reverse md:grid grid-cols-3 items-center max-md:text-center">
        <div className="md:col-span-2">
          {subHeading && (
            <FadeWrapper>
              <h3 className="md:text-start">{subHeading}</h3>
            </FadeWrapper>
          )}
        </div>

        <div className="md:col-span-1 max-md:mb-4 text-center">
          <FadeWrapper delay={0.2}>
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 pt-8 pb-18 max-xl:py-10">
        <div className="container relative">
          <CustomHardwarePortfolioSlider items={items} />
        </div>
      </div>
    </section>
  )
}

export default CustomHardwarePortfolio
