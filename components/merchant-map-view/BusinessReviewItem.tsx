import React from 'react'
import ic_review_star from '@dtravel/assets/icons/ic_review_star.svg'
import ic_bxs_star_half from '@dtravel/assets/icons/ic_bxs_star_half.svg'
import ic_star_1_3 from '@dtravel/assets/icons/ic_star_1_3.svg'
import ic_star_3_4 from '@dtravel/assets/icons/ic_star_3_4.svg'
import Image from 'next/image'
import { convertRating } from '@dtravel/utils/common'

interface Props {
  id: number
  accountId: number
  listingMapId: number
  reservationId: number
  autoReviewId?: number
  timeDelta?: any
  scheduledDateTime?: any
  channelId: number
  type: 'guest-to-host' | 'host-to-guest'
  status: string // 'awaiting'
  rating?: string | number | null
  externalReviewId: null
  externalReservationId: null
  publicReview: null
  privateFeedback: null
  revieweeResponse: null
  isRevieweeRecommended: null
  isCancelled: 0
  autoReviewTemplateId: null
  reviewCategory: any //[]
  departureDate: Date // '2021-05-11 22:00:00'
  arrivalDate: Date //'2021-05-06 08:00:00'
  listingName: string //'Beautiful and cozy apartment close to city center'
  guestName: string // 'Andrew Peterson'
  channel: string
}

const BusinessReviewItem: React.FC<Props> = ({ listingName, rating, publicReview, channel }) => {
  const convertRatingToImages = (_rating: number) => {
    const rate = convertRating(_rating)
    const remainder = (rate as number) - Math.floor(rate as number)
    const stars = Array.from({ length: Math.floor(rate as number) }, (v, k) => k + 1)
    return (
      <>
        {stars.map((item) => (
          <Image key={item} src={ic_review_star} alt={'star'} width={12} height={12} />
        ))}
        {0 < remainder && remainder < 0.4 && <Image src={ic_star_1_3} alt={'star 1/3'} width={12} height={12} />}
        {0.4 <= remainder && remainder < 0.7 && (
          <Image src={ic_bxs_star_half} alt={'star 1/2'} width={12} height={12} />
        )}
        {0.7 <= remainder && remainder < 1 && <Image src={ic_star_3_4} alt={'star 3/4'} width={12} height={12} />}
      </>
    )
  }

  return (
    <div className={'mb-[8px] p-[16px] bg-sand-2 rounded-[12px]'}>
      <p className={'flex justify-between'}>
        <span className={'font-inter-500 text-14-18 text-neutral-800'}>{listingName}</span>
        {rating && <span className={'min-w-[60px] text-right flex'}>{convertRatingToImages(Number(rating) || 0)}</span>}
      </p>
      <p className={'font-inter-400 text-12-16 text-neutral-600 '}>
        <span>{channel}</span>
      </p>
      <p className={'mt-1 font-inter-400 text-14-20 text-neutral-800'}>{publicReview}</p>
    </div>
  )
}

export default BusinessReviewItem
