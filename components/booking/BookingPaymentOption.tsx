import React, { useState, useEffect } from 'react'
import BookingCollapse from './BookingCollapse'
import { useRouter } from 'next/router'
import { getPaymentMethod } from '@dtravel/helpers/api/booking'
import { useAppSelector } from '@dtravel/redux/hooks'
import { PriceReservation, PropertyInfo } from '@dtravel/helpers/interfaces/property'
import BookingWhyLowFeeCrypto from './BookingWhyLowFeeCrypto'
import { StripeInfoProps } from '@dtravel/helpers/interfaces'

interface Props {
  bookingPrices: PriceReservation
  propertyDetail: PropertyInfo | null
  stripeInfo: StripeInfoProps | null
  isReservationDraft?: boolean // used for case preview in host
}

const BookingPaymentOption: React.FC<Props> = ({ bookingPrices, propertyDetail, stripeInfo, isReservationDraft }) => {
  const { accounts } = useAppSelector((state) => state.common)
  const router = useRouter()
  const { userID } = useAppSelector((state) => state.property)
  const { hostId } = router.query
  const hostID = userID || hostId

  const [paymentMethods, setPaymentMethods] = useState<Array<any>>([])

  const fetchPaymentMethod = async () => {
    try {
      const { data } = await getPaymentMethod(hostID as string)
      if (data.success) {
        setPaymentMethods(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchPaymentMethod()
    // eslint-disable-next-line
  }, [accounts])
  const showPayment = propertyDetail?.fiatPaymentEnabled && propertyDetail?.cryptoPaymentEnabled
  return (
    <>
      <div
        className={`mb-[24px] md:mb-[48px] pt-[24px] md:pt-0 pb-[24px] md:pb-[48px] border-b-[12px] md:border-b-[0.5px] border-b-solid border-b-neutral-100 md:border-b-[#00000026] px-4 md:px-0`}
      >
        {showPayment && (
          <p className="mb-4 flex justify-between font-inter-500">
            <span className="text-neutral-900 text-20-24">Payment</span>
            <BookingWhyLowFeeCrypto />
          </p>
        )}
        <BookingCollapse
          paymentMethods={paymentMethods}
          bookingPrices={bookingPrices}
          propertyDetail={propertyDetail}
          stripeInfo={stripeInfo}
          isReservationDraft={isReservationDraft}
        />
      </div>
    </>
  )
}

export default BookingPaymentOption
