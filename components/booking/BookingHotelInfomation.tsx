import PopupCancellationPolicies from '@dtravel/components/common/PopupCancellationPolicies'
import PriceBreakDown from '@dtravel/components/common/PriceBreakDown'
import { SettingUrlProps } from '@dtravel/helpers/interfaces'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import BookingSaving from './BookingSaving'

/* eslint-disable */
interface Props {
  propertyDetail?: any
  bookingPrices?: any
  children?: any
  isSummaryPage?: boolean
  settingUrl?: SettingUrlProps | null
  popupShowDefaultFooter?: boolean
  isReservationDraft?: boolean
}
const imageURL = 'https://static.dtravel.com/images/404/default_image.jpg'

const BookingHotelInfomation: React.FC<Props> = ({
  propertyDetail,
  bookingPrices,
  children,
  isSummaryPage,
  settingUrl,
  popupShowDefaultFooter,
  isReservationDraft,
}) => {
  const router = useRouter()
  const { check_in, check_out } = router.query
  const nights = isSummaryPage ? propertyDetail?.nights : Number(moment(check_out).diff(moment(check_in), 'days'))
  const address = isSummaryPage ? propertyDetail?.listingInfo?.address : propertyDetail?.address
  const priceInfo = isSummaryPage ? propertyDetail?.priceInfoV2 : bookingPrices
  const listingURL = settingUrl?.customId
    ? `/property/${propertyDetail?.listingId}`
    : `/${propertyDetail.hostId}/property/${propertyDetail?.listingId}`

  const renderImageHotel = () => {
    if (isSummaryPage) {
      return (
        <a
          className={'mb-6 md:mb-0 h-[230px] md:w-[88px] md:h-[88px] w-full md:min-w-[88px] block'}
          target={'_blank'}
          href={listingURL}
          rel="noreferrer"
        >
          <img
            src={
              propertyDetail?.listingInfo?.propertyImages &&
                Array.isArray(propertyDetail?.listingInfo?.propertyImages) &&
                propertyDetail?.listingInfo?.propertyImages[0]
                ? propertyDetail?.listingInfo?.propertyImages[0].url
                : imageURL
            }
            alt=""
            className="w-full h-full rounded-[12px] object-cover"
          />
        </a>
      )
    }
    return (
      <img
        src={
          propertyDetail && Array.isArray(propertyDetail.propertyImages) && propertyDetail.propertyImages[0]
            ? propertyDetail.propertyImages[0].url
            : imageURL
        }
        alt=""
        className="w-[88px] h-[88px] min-w-[88px] rounded-[12px] object-cover"
      />
    )
  }
  const renderHotelInfo = () => {
    return (
      <div className="flex flex-col justify-center w-full pr-[16px] xl:pr-[24px]" style={{ wordBreak: 'break-word' }}>
        <p className="font-inter-600 text-12-16 text-grayscale-600 mb-[8px] uppercase">
          {`${nights || 0} night${nights > 1 ? 's' : ''} in ${address?.city || address?.country}`}
        </p>
        {propertyDetail && (
          <p className="font-inter-500 text-16-24 md:text-16-20 text-grayscale-900 mb-[4px]] line-clamp-2">
            {isSummaryPage ? (
              <a className={'hover:underline'} target={'_blank'} href={listingURL} rel="noreferrer">
                {propertyDetail?.externalName || propertyDetail?.listingInfo?.externalName}
              </a>
            ) : (
              propertyDetail?.externalName || propertyDetail?.listingInfo?.externalName
            )}
          </p>
        )}
      </div>
    )
  }
  const renderPrices = () => {
    return (
      <div
        className={`flex flex-col border-b-[12px] md:border-none border-b-solid border-b-sand-2 pb-6 md:pb-0 px-4 md:px-0 mt-[-16px] md:mt-0 pt-[16px] md:pt-0`}
      >
        <PriceBreakDown
          isReservationDraft={isReservationDraft}
          propertyDetail={propertyDetail}
          data={priceInfo}
          nights={nights}
          title={<span className="flex md:hidden font-inter-500 text-20-24 text-grayscale-900">Price details</span>}
          notes={
            isSummaryPage && propertyDetail?.confirmedAt ? (
              `Payment was processed and confirmed on ${moment(propertyDetail?.confirmedAt).format('ll')} at ${moment(
                propertyDetail?.confirmedAt
              ).format('hh:mm')}.`
            ) : (
              <span>
                Payment will be charged when you book this room, please review the{' '}
                <PopupCancellationPolicies
                  cancelPolicies={propertyDetail?.cancellationPolicy || propertyDetail?.cancelPolicies}
                  popupShowDefaultFooter={popupShowDefaultFooter}
                  propertyId={isSummaryPage ? propertyDetail?.listingId : propertyDetail?.id}
                />{' '}
                and important information before booking.
              </span>
            )
          }
        />
        <BookingSaving
          className="md:hidden mt-[24px] md:mt-0"
          bookingPrices={priceInfo}
          propertyDetail={propertyDetail}
        />
      </div>
    )
  }
  return (
    <>
      <div
        className={`md:border-b-[0.5px] md:border-b-[#00000026] px-4 md:px-0 pt-6 md:pt-0 gap-[24px] ${!isSummaryPage ? 'border-b-[12px] border-b-solid border-b-sand-2 pb-[16px] mb-[16px]' : 'md:pb-6 md:mb-6 '
          }`}
      >
        <div className={`w-full flex items-center ${!isSummaryPage ? '' : 'flex-col-reverse md:flex-row'}`}>
          {renderHotelInfo()}
          {renderImageHotel()}
        </div>
      </div>
      {children}
      {renderPrices()}
    </>
  )
}

export default BookingHotelInfomation
