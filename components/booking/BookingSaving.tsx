import { convertCurrency } from '@dtravel/helpers/api/common'
import { PAYMENT_METHOD, TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'
import { useAppSelector } from '@dtravel/redux/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DtravelPrice from '../common/DtravelPrice'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  className?: string
  bookingPrices: any
  propertyDetail?: any
  averagePrice7Days?: any
}
// Card processing fee (2.9% + 0.3$)
const BookingSaving: React.FC<Props> = ({ className, bookingPrices, propertyDetail, averagePrice7Days }) => {
  const { color } = useTheme()
  const { typePayment, selectedCurrency } = useAppSelector((state) => state.common)
  const router = useRouter()
  const isBookingPage = router.pathname.includes('/booking/') || router.pathname.includes('/book/')
  const isSummaryPage = router.pathname.includes('/booking-summary/')
  const isDetailPropertyPage = router.pathname.includes('/property/')
  const [feeFixed, setFeeFixed] = useState<number>(0.3)

  const currencyDisplay = isSummaryPage
    ? propertyDetail?.currency || selectedCurrency?.key || 'USD'
    : selectedCurrency?.key || 'USD'
  const isCryptoPayment =
    (isBookingPage && typePayment === TYPE_PAYMENT.CRYPTO) ||
    (isSummaryPage && propertyDetail?.paymentMethod === PAYMENT_METHOD.CRYPTO)

  const rates = bookingPrices?.exchangeRate?.rates || {}
  const rate = rates[currencyDisplay] || 1
  const totalAmount = averagePrice7Days
    ? Number(averagePrice7Days)
    : bookingPrices?.totalPrice
      ? Number(bookingPrices.totalPrice * rate)
      : 0
  const saveAmountByHost = totalAmount * 0.14
  const cardProcessingFee = Number(bookingPrices?.platformFee?.[currencyDisplay] || totalAmount * 0.029 + feeFixed)
  const saveAmountByCrypto = saveAmountByHost + cardProcessingFee
  const saveAmount = isCryptoPayment ? saveAmountByCrypto : saveAmountByHost

  useEffect(() => {
    async function fetchRateUSD() {
      const res = await convertCurrency(0.3, 'usd', selectedCurrency.key)
      if (res.data) {
        setFeeFixed(Number(res.data[selectedCurrency.key]))
      }
    }
    if (isDetailPropertyPage) fetchRateUSD()
    // eslint-disable-next-line
  }, [selectedCurrency.key])

  if (isSummaryPage) return null

  return (
    <div
      className={`${isBookingPage ? 'border-t border-t-neutral-300' : 'border-b border-b-neutral-300'
        } md:border-none ${className}`}
    >
      <div
        className={`${isBookingPage ? 'mt-[16px]' : 'my-[32px]'}
           bg-white border-[0.5px] border-[#00000026] lg:my-0 lg:mt-[16px] rounded-[24px] px-[24px] py-[24px] md:px-[24px] md:py-[24px] lg:px-[32px] lg:py-[32px] flex justify-between custom-hover
          `}
      >
        <div className="flex flex-col">
          <p className="flex mb-[4px] font-inter-500 text-16-20">
            <span className="text-grayscale-900">You’re saving&nbsp;</span>
            <span className="text-forest-700" style={color ? { color } : {}}>
              <DtravelPrice price={saveAmount} currency={currencyDisplay} />
            </span>
          </p>
          <p className="font-inter-400 text-14-18 text-grayscale-600">Save up to 20% by booking direct</p>
        </div>
      </div>
    </div>
  )
}
export default BookingSaving
