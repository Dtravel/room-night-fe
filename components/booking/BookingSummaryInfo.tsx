import CancelReservationCrypto from '@dtravel/components/booking/CancelReservationCrypto'
import ContactHost from '@dtravel/components/common/ContactHost'
import { PAYMENT_METHOD, RESERVATION_STATUS } from '@dtravel/helpers/constants/constants'
import moment from 'moment'
import React from 'react'

interface Props {
  propertyDetail: any
  bookingStatus: string
  handleChangeStatus: any
}

const BookingSummaryInfo: React.FC<Props> = ({ propertyDetail, bookingStatus, handleChangeStatus }) => {
  const isPmsConnected = propertyDetail.isPmsConnected
  const policies = propertyDetail.cancellationPolicy?.policies || []
  const lastPenaltyTime =
    Array.isArray(policies) && policies.length > 0 ? policies[policies.length - 1]['penaltyTime'] : null
  const isBeforeLastPenaltyTime =
    !lastPenaltyTime || (lastPenaltyTime && moment().isBefore(moment(lastPenaltyTime * 1000))) // cu Hue yeu cau

  const isPayCrypto = propertyDetail && propertyDetail.paymentMethod === PAYMENT_METHOD.CRYPTO
  // https://dtravelnetwork.atlassian.net/browse/DTRAV-2574
  // const isBeforeCheckInDate =
  //   propertyDetail.checkinDate && moment().startOf('day').isBefore(moment(propertyDetail.checkinDate).startOf('day'))
  const isUplisting = propertyDetail && propertyDetail.listingInfo.pmsType === 'uplisting'
  const hostId = propertyDetail.hostId

  return (
    <div className="mb-[24px] md:mb-[48px] pb-[24px] md:pb-[48px] border-b-solid border-b-[12px] md:border-b-[0.5px] border-b-solid border-b-sand-2 md:border-b-[#00000026] pt-6 md:pt-0 px-4 md:px-0">
      <p className="mb-4 text-neutral-900 font-inter-400 text-16-24">
        Your reservation ID is <span style={{ fontWeight: 900, color: 'black' }}>{propertyDetail?.reservationId}</span>,
        and your itinerary has been sent to your email address.
      </p>
      <div className="flex items-center">
        {isPayCrypto &&
        !isUplisting &&
        // isBeforeCheckInDate &&
        isBeforeLastPenaltyTime &&
        isPmsConnected &&
        (bookingStatus === RESERVATION_STATUS.NEW || bookingStatus === RESERVATION_STATUS.MODIFIED) ? (
          <CancelReservationCrypto
            propertyDetail={propertyDetail}
            handleChangeStatus={handleChangeStatus}
            bookingStatus={bookingStatus}
          />
        ) : (
          <ContactHost {...propertyDetail?.listingInfo?.contact} hostId={hostId} />
        )}
      </div>
    </div>
  )
}

export default BookingSummaryInfo
