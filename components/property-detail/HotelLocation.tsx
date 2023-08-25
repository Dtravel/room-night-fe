import React from 'react'
import { Address } from '@dtravel/helpers/interfaces/property'
import MapsBoxCustom from '@dtravel/components/maps/MapsBoxCustom'
import DetailCard from '@dtravel/components/property-detail/DetailCard'
interface Props {
  address: Address
  externalName: string
  userId: string
}

const HotelLocation: React.FC<Props> = ({ address, externalName, userId }) => {
  const fullAddress =
    (address.city ||
      address.state + `${(address.city || address.state) && address.country ? ', ' : ''}` + address.country)
  // ' • Exact location shared before arrival'

  return (
    <DetailCard
      title={'Location'}
      extraTitle={fullAddress + ' • Exact location shared before arrival'}
      extraTitleClass={'font-inter-400 text-16-20 text-neutral-900'}
    >
      {address.lat && address.lng && (
        <>
          <div className={'h-[191px] lg:h-[465px]'}>
            <MapsBoxCustom
              externalName={externalName}
              address={fullAddress}
              longitude={Number(address.lng)}
              latitude={Number(address.lat)}
              hiddenMarker={userId === "5cea78c6-2f2c-4230-bc45-f60f4b82886b"} // hidden marker with CoCo's listing
            />
          </div>
        </>
      )}
    </DetailCard>
  )
}

export default HotelLocation
