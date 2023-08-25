import React from 'react'
import MapsBoxCustom from '@dtravel/components/maps/MapsBoxCustom'

interface Props {
  propertyDetail: any
}

const BookingSummaryLocation: React.FC<Props> = ({ propertyDetail }) => {
  const lat = Number(propertyDetail?.listingInfo?.address?.lat)
  const lng = Number(propertyDetail?.listingInfo?.address?.lng)
  const address = propertyDetail?.listingInfo?.address
  return (
    <div className="mb-0 md:mb-10 pb-[24px] lg:pb-[48px] border-b-solid border-b-[12px] md:border-b-[0.5px] border-b-solid border-b-sand-2 md:border-b-[#00000026] pt-6 md:pt-0 px-4 md:px-0">
      <p className="mb-2 text-neutral-900 font-inter-500 text-20-24 md:text-24-32 tracking-[-0.02em]">Location</p>
      <p className="mb-4 text-neutral-900 font-inter-400 text-16-24">{address?.publicAddress}</p>

      <div className="h-[395px] bg-neutral-300 rounded-3xl mt-4" id="map">
        {lat !== 0 && lng !== 0 && (
          <MapsBoxCustom
            externalName={propertyDetail?.listingInfo?.externalName}
            address={address?.publicAddress}
            longitude={Number(lng)}
            latitude={Number(lat)}
          />
        )}
      </div>
    </div>
  )
}

export default BookingSummaryLocation
