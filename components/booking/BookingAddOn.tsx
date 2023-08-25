import React from 'react'
import { isEmpty } from '@dtravel/utils/common'
import BookingAddOnItem from './BookingAddOnItem'
import { RESERVATION_STATUS } from '@dtravel/helpers/constants/constants'

interface Props {
  isManualReservation: boolean
  manualReservationData?: any
  bookingPrices: any
  fetchPricesManualBooking: any
  loadingAddons: number
}

const BookingAddOn: React.FC<Props> = (props) => {
  const { isManualReservation, manualReservationData, bookingPrices, fetchPricesManualBooking, loadingAddons } = props
  const isDisabled = manualReservationData?.status === RESERVATION_STATUS.EXPIRED || manualReservationData?.status === RESERVATION_STATUS.MANUAL_CANCELLED
  const addonsData = (manualReservationData?.addons || []).filter((v: any) => v.isIncludedInTotalPrice)
  const addonsHasImage = (addonsData || []).filter((v: any) => !isEmpty(v.images))
  const addonsNoImage = (addonsData || []).filter((v: any) => isEmpty(v.images))
  const addons = [...addonsHasImage, ...addonsNoImage]
  const addonsAdded = bookingPrices?.priceDetail?.addons || []

  if (!isManualReservation || isEmpty(addons)) return null
  return (
    <>
      <div className="mb-[24px] md:mb-[48px] pb-[24px] md:pb-[48px] flex flex-col border-b-[12px] md:border-b-[0.5px] border-b-solid border-b-neutral-100 md:border-b-[#00000026] px-4 md:px-0">
        <p className="mb-[8px] text-neutral-900 font-inter-500 text-20-24">Optional add-ons</p>
        <p className='mb-[8px] md:mb-[24px] text-grayscale-600 font-inter-400 text-14-18"'>Select from the following add-ons to include in your reservation.</p>

        <div className='flex flex-wrap gap-[16px]'>
          {!isEmpty(addons) && addons.map((el: any, idx: number) => {
            const isAdded = Boolean(addonsAdded.find((v: any) => v.name === el?.name))
            // const isLast = idx === addons.length - 1
            const isLoading = loadingAddons === idx + 1
            const isOnly = addons.length === 1
            return (
              <BookingAddOnItem
                key={idx}
                item={el}
                addonsAdded={addonsAdded}
                isAdded={isAdded}
                isOnly={isOnly}
                isLoading={isLoading}
                index={idx}
                isDisabled={isDisabled}
                manualCurrency={manualReservationData.currency}
                fetchPricesManualBooking={fetchPricesManualBooking}
              />
            )
          })}
        </div>
      </div>

    </>
  )
}

export default BookingAddOn
