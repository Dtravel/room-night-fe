import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { isEmpty, showStatusBooking } from '@dtravel/utils/common'
import { RESERVATION_STATUS } from '@dtravel/helpers/constants/constants'
import BookingHotelInfomation from './BookingHotelInfomation'
import BookingSummaryInfo from './BookingSummaryInfo'
import BookingSummaryLocation from './BookingSummaryLocation'
import HotelCancelPolicy from '@dtravel/components/property-detail/HotelCancelPolicy'
import { PropertyInfo } from '@dtravel/helpers/interfaces/property'
import BookingSummaryArrivalDeparture from './BookingSummaryArrivalDeparture'
import { setToastSuccess } from '@dtravel/redux/slices/common'
import { useAppDispatch } from '@dtravel/redux/hooks'
import { SettingUrlProps } from '@dtravel/helpers/interfaces'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import DetailCard from '../property-detail/DetailCard'
import ContactHost from '../common/ContactHost'

interface Props {
  propertyDetail: PropertyInfo | null
  settingUrl: SettingUrlProps | null
}
let events: any = null
const BookingSummary: React.FC<Props> = ({ propertyDetail, settingUrl }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isMounted = useMounted()
  const { reservationId } = router.query
  const [bookingStatus, setBookingStatus] = useState<string>(propertyDetail?.status || '')

  useEffect(() => {
    if (propertyDetail?.status && propertyDetail?.status !== bookingStatus) setBookingStatus(propertyDetail?.status)
    // eslint-disable-next-line
  }, [propertyDetail])

  const handleChangeStatus = (reservationID: string) => {
    events = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/reservation-service/reservation/verify/${reservationID}`
    )
    events.addEventListener('message', function (res: any) {
      const parsedData = JSON.parse(res.data)
      if (parsedData && parsedData.status && bookingStatus !== parsedData.status) {
        if (parsedData.status === RESERVATION_STATUS.CANCELLED)
          dispatch(setToastSuccess({ message: 'Cancel Reservation Successful!' }))
        setBookingStatus(parsedData.status)
        events.close()
      }
      // if (parsedData.status !== firstStatus) events.close()
    })
  }

  useEffect(() => {
    if (reservationId && propertyDetail?.status === RESERVATION_STATUS.AWAITING_PAYMENT) {
      handleChangeStatus(reservationId as string)
    } // eslint-disable-next-line
  }, [reservationId])

  useEffect(() => {
    return () => {
      if (events) events.close()
    } // eslint-disable-next-line
  }, [])

  const isCancelled = bookingStatus === RESERVATION_STATUS.CANCELLED
  const isFailed = bookingStatus === RESERVATION_STATUS.FAILED
  const isProcessing = bookingStatus === RESERVATION_STATUS.AWAITING_PAYMENT
  const isExpired = bookingStatus === RESERVATION_STATUS.EXPIRED
  const getStatusClassName = () => {
    if (isCancelled || isFailed) return 'text-red-700 bg-red-100'
    if (isProcessing) return 'text-sun-700 bg-sun-100'
    if (isExpired) return 'text-neutral-700 bg-neutral-200'
    return 'text-forest-700 bg-forest-50'
  }

  return (
    <>
      <div className="pt-[88px] pb-12 flex items-start">
        <div className="w-full md:w-5/8 lg:w-8/12 md:pr-[48px]">
          {bookingStatus !== '' && (
            <span
              className={`font-inter-600 text-14-18 tracking-[0.04em] ${getStatusClassName()} mb-2 uppercase rounded-[100px] py-1 px-2 mx-4 md:mx-0`}
            >
              Reservation {showStatusBooking(bookingStatus)}
            </span>
          )}
          <p className="font-inter-500 text-20-24 md:text-28-36 text-neutral-900 md:mb-[12px] mt-3 mx-4 md:mx-0 tracking-[-0.03em]">
            You are going to {propertyDetail?.listingInfo?.externalName}!
          </p>
          <div className="md:hidden">
            <BookingHotelInfomation
              propertyDetail={propertyDetail}
              isSummaryPage
              settingUrl={settingUrl}
              popupShowDefaultFooter
            >
              <BookingSummaryInfo
                propertyDetail={propertyDetail}
                bookingStatus={bookingStatus}
                handleChangeStatus={handleChangeStatus}
              />
            </BookingHotelInfomation>
          </div>
          {propertyDetail && (
            <>
              <div className="mobile-hidden">
                <BookingSummaryInfo
                  propertyDetail={propertyDetail}
                  bookingStatus={bookingStatus}
                  handleChangeStatus={handleChangeStatus}
                />
              </div>
              {isMounted && <BookingSummaryArrivalDeparture propertyDetail={propertyDetail} />}
              <BookingSummaryLocation propertyDetail={propertyDetail} />
              <div className="px-4 md:px-0 mb-[-32px] md:my-[-48px]">
                {!isEmpty(propertyDetail.cancellationPolicy) ?
                  <HotelCancelPolicy cancelPolicies={propertyDetail.cancellationPolicy} /> :
                  <DetailCard title={'Cancellation policy'} hideBorderBot>
                    <ContactHost {...propertyDetail?.listingInfo?.contact} hostId={propertyDetail.hostId} />
                  </DetailCard>
                }
              </div>
            </>
          )}
        </div>
        <div className="hidden md:block w-full md:w-3/8 lg:w-4/12 bg-sand-2 px-6 py-6 lg:px-8 lg:py-8 rounded-3xl sticky top-[96px]">
          <BookingHotelInfomation
            propertyDetail={propertyDetail}
            isSummaryPage
            settingUrl={settingUrl}
            popupShowDefaultFooter
          />
        </div>
      </div>
    </>
  )
}
export default BookingSummary
