import React from 'react'
import Image from 'next/image'
import { tz } from 'moment-timezone'
import ic_clock_checkin from '@dtravel/assets/icons/ic_clock_checkin.svg'
import ic_clock_checkout from '@dtravel/assets/icons/ic_clock_checkout.svg'
import { convertAmPm, convertTimeZone } from '@dtravel/utils/common'
interface Props {
  propertyDetail: any
}

const BookingSummaryArrivalDeparture: React.FC<Props> = ({ propertyDetail }) => {
  const { checkinDate, checkoutDate, checkinTime, checkoutTime, timezone } = propertyDetail
  return (
    <div className="mb-0 md:mb-10 pb-[24px] lg:pb-[48px] border-b-solid border-b-[12px] md:border-b-[0.5px] border-b-solid border-b-neutral-100 md:border-b-[#00000026] pt-6 md:pt-0 px-4 md:px-0">
      <p className="mb-6 text-neutral-900 font-inter-500 text-20-24 md:text-24-32 tracking-[-0.02em]">Arrival and departure</p>
      <div className="flex items-center mb-4">
        <Image src={ic_clock_checkin} width={24} height={24} alt="" />
        <span className="font-inter-400 text-neutral-900 text-16-24 mb-[-2px] ml-3">Check in from {tz(checkinDate, timezone).utc().format('MM/DD/YYYY')} {convertAmPm(checkinTime)} {convertTimeZone(timezone)}</span>
      </div>
      <div className="flex items-center">
        <Image src={ic_clock_checkout} width={24} height={24} alt="" />
        <span className="font-inter-400 text-neutral-900 text-16-24 mb-[-2px] ml-3">Check out by {tz(checkoutDate, timezone).utc().format('MM/DD/YYYY')} {convertAmPm(checkoutTime)} {convertTimeZone(timezone)}</span>
      </div>
    </div>
  )
}

export default BookingSummaryArrivalDeparture
