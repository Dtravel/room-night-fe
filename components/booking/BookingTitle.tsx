import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import ic_arrow_left from '@dtravel/assets/icons/ic_arrow_left.svg'

interface Props {
  manualReservationData: any
}


const BookingTitle: React.FC<Props> = ({ manualReservationData }) => {
  const router = useRouter()
  const { hostId, propertyId, reservationId } = router.query
  const propertyID = propertyId
  const isManualReservation = Boolean(reservationId)


  const goToProperty = () => {
    router.push({
      pathname: hostId ? `/property/${hostId}/${propertyID}` : `/property/${propertyID}`,
      query: router.query,
    })
  }
  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-0 pb-4 md:pb-0 border-b border-b-sand-3 md:border-none">
        {isManualReservation ? (
          <p className="font-inter-500 text-24-32 tracking-[-0.02em] mb-[24px]">Reservation request</p>
        ) : (
          <div className="flex flex-col justify-center items-start w-full">
            <p
              className="font-inter-500 text-14-18 text-grayscale-600 mb-[12px] text-center md:text-left cursor-pointer flex items-center"
              onClick={goToProperty}
            >
              <span className="mr-[4px]">
                {' '}
                <Image src={ic_arrow_left} alt="" />
              </span>
              Listing page
            </p>
            <p className="font-inter-500 text-24-32 text-grayscale-900 md:mb-[48px] text-center md:text-left tracking-[-0.02em]">
              Confirm and pay
            </p>
          </div>
        )}
      </div>
      {manualReservationData?.guestMessage && (
        <>
          <div className="bg-grayscale-50 p-[24px] font-inter-400 text-16-24 text-grayscale-900 rounded-[16px] whitespace-pre-line">
            {manualReservationData?.guestMessage}
          </div>
          <div className="h-[1px] bg-grayscale-300 w-full my-[48px]" />
        </>
      )}
    </>
  )
}

export default BookingTitle
