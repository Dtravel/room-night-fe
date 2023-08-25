import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { convertRating, isEmpty } from '@dtravel/utils/common'
import { IconStar, IconStarHalf } from '@dtravel/components/common/Icons'
// import { IconStar, IconStarHalf, IconStarOneThird, IconStarThreFourth } from '@dtravel/components/common/Icons'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import moment from 'moment'
import airbnb from '@dtravel/assets/images/posted-logo/airbnb.svg'
import vrbo from '@dtravel/assets/images/posted-logo/vrbo.svg'
import booking from '@dtravel/assets/images/posted-logo/booking.svg'
import expedia from '@dtravel/assets/images/posted-logo/expedia.svg'
import tripadvisor from '@dtravel/assets/images/posted-logo/tripadvisor.svg'
import marriott from '@dtravel/assets/images/posted-logo/marriott.svg'
import flipkey from '@dtravel/assets/images/posted-logo/flipkey.svg'
import google from '@dtravel/assets/images/posted-logo/google.svg'
import wordpress from '@dtravel/assets/images/posted-logo/wordpress.svg'

interface Props {
  rating?: string | number | null
  publicReview: null
  channel: string
  guestName: string
  reviewerName?: string
  id: string
  submittedAt: string
  updatedOn: string
  insertedOn: string
  numberInRow?: number
}

const MerchantReviewItem: React.FC<Props> = ({
  rating,
  publicReview,
  channel,
  guestName,
  reviewerName,
  id,
  submittedAt,
  updatedOn,
  insertedOn,
  numberInRow,
}) => {
  const { color } = useTheme()
  const windowDimensions = useWindowDimensions()
  const numberItemInRow = numberInRow || 3
  const [showScroll, setShowScroll] = useState<boolean>(false)
  const convertRatingToImages = (_rating: number) => {
    const rate = convertRating(_rating)
    const remainder = (rate as number) - Math.floor(rate as number)
    const stars = Array.from({ length: Math.floor(rate as number) }, (v, k) => k + 1)
    return (
      <div className={'flex'}>
        {stars.map((item) => (
          <IconStar key={item} color={color} />
        ))}
        {/* {0 < remainder && remainder < 0.4 && (
          <div>
            <IconStarOneThird color={color} />
          </div>
        )} */}
        {0.25 <= remainder && remainder < 0.75 && <IconStarHalf color={color} />}
        {0.75 <= remainder && remainder < 1 && <IconStar color={color} />}
      </div>
    )
  }
  const renderReviewName = (name: string) => {
    if (!name) return ''
    const names = name.trim().split(' ')
    const result = names.map((v: string, idx: number) => {
      if (idx === 0) return `${v} `
      return `${v?.charAt(0)?.toUpperCase()}.`
    })
    return result.join('')
  }
  const renderChannelInfo = () => {
    if (isEmpty(channel)) return { name: null, icon: null }
    if (channel.toLowerCase() === 'airbnb' || channel.toLowerCase() === 'airbnbofficial')
      return { name: 'Airbnb', icon: airbnb }
    if (
      channel.toLowerCase() === 'homeaway' ||
      channel.toLowerCase() === 'homeawayical' ||
      channel.toLowerCase() === 'vrboical'
    )
      return { name: 'VRBO', icon: vrbo }
    if (channel.toLowerCase() === 'bookingcom' || channel.toLowerCase() === 'booking.com')
      return { name: 'Booking.com', icon: booking }
    if (channel.toLowerCase() === 'expedia') return { name: 'Expedia', icon: expedia }
    if (channel.toLowerCase() === 'tripadvisorical') return { name: 'Tripadvisor', icon: tripadvisor }
    if (channel.toLowerCase() === 'marriott') return { name: 'Marriott Bonvoy', icon: marriott }
    if (channel.toLowerCase() === 'flipkey') return { name: 'FlipKey', icon: flipkey }
    if (channel.toLowerCase() === 'google') return { name: 'Google', icon: google }
    if (channel.toLowerCase() === 'wordpress') return { name: 'Wordpress', icon: wordpress }
    return { name: null, icon: null }
  }
  useEffect(() => {
    const reviewEl = document.getElementById(id)
    if (reviewEl) {
      const sizeData = reviewEl.getBoundingClientRect()
      if (windowDimensions.width < 768) {
        // sm
        if (sizeData.height < 394) setShowScroll(false)
        else setShowScroll(true)
      } else if (windowDimensions.width < 1024) {
        // md
        if (sizeData.height < 250) setShowScroll(false)
        else setShowScroll(true)
      } else if (windowDimensions.width < 1280) {
        // lg
        if (sizeData.height < 418) setShowScroll(false)
        else setShowScroll(true)
      } else if (windowDimensions.width < 1536) {
        // xl
        if (sizeData.height < 368) setShowScroll(false)
        else setShowScroll(true)
      } else {
        // xxl
        if (sizeData.height < 368) setShowScroll(false)
        else setShowScroll(true)
      }
    }
    // eslint-disable-next-line
  }, [windowDimensions])
  const channelInfo = renderChannelInfo()
  const time = submittedAt || updatedOn || insertedOn
  let classContainer =
    'md:w-[calc(50%_-_16px)] md:min-w-[calc(50%_-_16px)] lg:w-[calc(100%/3_-_10.67px)] lg:min-w-[calc(100%/3_-_10.67px)]'
  if (numberItemInRow === 2)
    classContainer =
      'md:w-[calc(50%_-_16px)] md:min-w-[calc(50%_-_16px)] lg:w-[calc(50%_-_8px)] lg:min-w-[calc(50%_-_8px)]'
  return (
    <div
      id={id}
      className={`w-[calc(100%_-_16px)] min-w-[calc(100%_-_16px)] max-h-[394px] md:max-h-[250px] lg:max-h-[418px] xl:max-h-[368px] bg-grayscale-100 rounded-[24px] py-[32px] lg:py-[24px] xl:py-[32px] flex flex-col justify-between relative ${classContainer}`}
    >
      <div className="flex items-start justify-between px-[32px]">
        {rating && <span className={'min-w-[60px] flex'}>{convertRatingToImages(Number(rating) || 0)}</span>}
        {time && (
          <span className="font-inter-400 text-14-18 text-grayscale-600">{moment(time).format('MMMM YYYY')}</span>
        )}
      </div>
      <div
        className={
          'mt-[24px] font-inter-400 text-14-24 text-grayscale-600 h-full overflow-auto px-[32px] lg:px-[24px] xl:px-[32px] hidden-scroll-bar'
        }
      >
        {publicReview ? `"${publicReview}"` : ''}
        {showScroll && (
          <div className="absolute left-0 bottom-[80px] z-[1] w-full h-[32px] bg-gradient-to-b from-white-0 to-grayscale-100" />
        )}
      </div>
      <div className="flex items-center justify-between mt-[32px] px-[32px] lg:px-[24px] xl:px-[32px]">
        <span className="font-inter-500 text-14-18 text-grayscale-900" style={color ? { color } : {}}>
          {renderReviewName(reviewerName || guestName)}
        </span>
        <div className="flex items-center justify-end">
          {channelInfo?.name && (
            <span className="font-inter-400 text-12-16 text-grayscale-600 mr-[12px]">
              Posted on {channelInfo?.name}
            </span>
          )}
          {channelInfo?.icon && (
            <Image src={channelInfo?.icon} alt={''} width={24} height={24} className="rounded-[4px]" />
          )}
        </div>
      </div>
    </div>
  )
}

export default MerchantReviewItem
