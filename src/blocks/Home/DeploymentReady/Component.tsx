import DeploymentReadySlider from '@/app/(frontend)/(homeComponents)/DeploymentReady/DeploymentReadySlider'
import { FadeWrapper } from '@/components/animations'

type Props = {
  heading: string
  subHeading?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}

const DeploymentReady = ({ heading, subHeading, items }: Props) => {
  return (
    <section className="pt-14">
      <div className="container md:grid grid-cols-3 items-center max-md:text-center">
        <div className="md:col-span-1">
          <FadeWrapper>
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>
        </div>

        <div className="md:col-span-2 max-md:mt-4">
          {subHeading && (
            <FadeWrapper delay={0.2}>
              <h3 className="md:text-end">{subHeading}</h3>
            </FadeWrapper>
          )}
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 pt-8 pb-18 max-xl:py-10">
        <div className="container relative">
          <DeploymentReadySlider items={items} />
        </div>
      </div>
    </section>
  )
}

export default DeploymentReady
