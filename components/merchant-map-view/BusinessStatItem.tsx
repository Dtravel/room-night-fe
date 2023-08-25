import Image from 'next/image'
import React from 'react'
import ic_review_star from '@dtravel/assets/icons/ic_review_star.svg'

const BusinessStatItem = ({ type, amount, index }: { type: string; amount: number; index: number }) => {
  const label = type === 'booking' ? 'Bookings' : type === 'rating' ? 'Avg. rating' : 'Reviews'
  return (
    <div
      className={
        'px-[12px] py-[16px] bg-sand-2 flex items-center justify-between mb-[2px]' +
        ' ' +
        `${index === 0 ? 'rounded-t-[12px]' : ''}` +
        ' ' +
        `${index === 2 ? 'rounded-b-[12px]' : ''}`
      }
    >
      <span className={'font-inter-400 text-16-20 text-neutral-800'}>{label}</span>
      <span className={'font-inter-500 text-16-20 text-neutral-800 flex items-center'}>
        {type === 'rating' && (
          <span className={'mr-1'}>
            <Image src={ic_review_star} alt={'star'} />
          </span>
        )}
        <span>{amount}</span>
      </span>
    </div>
  )
}

export default BusinessStatItem
