/* eslint-disable @typescript-eslint/no-explicit-any */
import { FadeWrapper } from '@/components/animations'
import LocationMapTabs from '@/components/common/LocationMapTabs'
import React from 'react'

const Innovation = ({ heading, locations }: any) => {
  const locationList = locations?.map((item: any) => item.location) || []

  return (
    <section className="py-14 relative">
      <div className="container text-center space-y-10">
        <FadeWrapper>
          <h4 className="heading_b_border">{heading}</h4>
        </FadeWrapper>
        <LocationMapTabs
          locations={locationList}
          containerStyle="space-y-10"
          tabContainerStyle="justify-center"
        />
      </div>
    </section>
  )
}

export default Innovation
