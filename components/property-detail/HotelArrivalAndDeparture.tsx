import ic_clock_checkin from '@dtravel/assets/icons/ic_clock_checkin.svg'
import ic_clock_checkout from '@dtravel/assets/icons/ic_clock_checkout.svg'
import DetailCard from '@dtravel/components/property-detail/DetailCard'
import Image from 'next/image'
import React from 'react'
import { convertAmPm } from '@dtravel/utils/common'

interface Props {
  defaultCheckInTime: string
  defaultCheckOutTime: string
}

const HotelArrivalAndDeparture: React.FC<Props> = ({ defaultCheckInTime, defaultCheckOutTime }) => {
  const checkInTimeToNumber = Number(defaultCheckInTime)
  const checkOutTimeToNumber = Number(defaultCheckOutTime)
  return (
    <DetailCard title={'Arrival and departure'}>
      <p className={'mb-4 flex items-center gap-[12px] font-inter-400 text-16-20 text-neutral-900'}>
        <Image src={ic_clock_checkin} width={18} height={18} alt="" />
        <span>
          Check in from{' '}
          <span>{isNaN(Number(checkInTimeToNumber)) ? defaultCheckInTime : convertAmPm(checkInTimeToNumber)}</span>
        </span>
      </p>
      <p className={'flex items-center gap-[12px] font-inter-400 text-16-20 text-neutral-900'}>
        <Image src={ic_clock_checkout} width={18} height={18} alt="" />
        <span>
          Check out by{' '}
          <span>{isNaN(Number(checkOutTimeToNumber)) ? defaultCheckOutTime : convertAmPm(checkOutTimeToNumber)}</span>
        </span>
      </p>
    </DetailCard>
  )
}

export default HotelArrivalAndDeparture
