import BasicDateRangePicker from '@dtravel/components/common/BasicDateRangePicker'
import DtravelPrice from '@dtravel/components/common/DtravelPrice'
import BasicButton from '@dtravel/components/ui/BasicButton'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import { DATE_FORMAT, END_DATE } from '@dtravel/helpers/constants/constants'
import { useAppSelector } from '@dtravel/redux/hooks'
import {
  setDatePickerFocusedId,
  setIsOpenDatePickerMobile,
  setIsOpenSelectGuestMobile,
} from '@dtravel/redux/slices/common'
import { setCheckIn, setCheckOut } from '@dtravel/redux/slices/property'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  hostId?: string
  pmsPropertyId?: string
  isShowBottom?: boolean
  bookingPrices?: any
  loading?: boolean
  openSelectGuestOnSave?: boolean
  // eslint-disable-next-line no-unused-vars
  afterDatesChange?: (_startDate: string | null, _endDate: string | null) => void
  isDisabledAllDate?: boolean
}

const SelectDateMobile: React.FC<Props> = ({
  hostId,
  pmsPropertyId,
  isShowBottom,
  bookingPrices,
  openSelectGuestOnSave,
  afterDatesChange,
  isDisabledAllDate,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isOpenDatePickerMobile, datePickerFocusedId, typePayment, cryptoPayment } = useAppSelector(
    (state) => state.common
  )
  const { checkIn, checkOut, minimumStay } = useAppSelector((state) => state.property)

  useEffect(() => {
    const { check_in, check_out } = router.query
    if (check_in && moment(check_in, DATE_FORMAT).isValid()) {
      dispatch(setCheckIn(String(check_in)))
    }
    if (check_out && moment(check_out, DATE_FORMAT).isValid()) {
      dispatch(setCheckOut(String(check_out)))
    }
    // eslint-disable-next-line
  }, [])

  // reset checkIn, checkOut if checkIn > checkOut
  useEffect(() => {
    const { check_in, check_out, ...resQuery } = router.query
    const checInMoment = moment(check_in, DATE_FORMAT).startOf('day')
    const checOutMoment = moment(check_out, DATE_FORMAT).startOf('day')
    if (checOutMoment.isSameOrBefore(checInMoment)) {
      dispatch(setCheckIn(null))
      dispatch(setCheckOut(null))
      router.push({
        pathname: router.pathname,
        query: resQuery,
      })
    } // eslint-disable-next-line
  }, [router.query])

  const onClose = () => {
    const isDetailPage = router.pathname.includes('/property/')
    if (isDetailPage) {
      dispatch(setIsOpenDatePickerMobile(false))
    } else {
      if (checkIn && checkOut) {
        dispatch(setIsOpenDatePickerMobile(false))
      }
    }
  }

  const clearDates = () => {
    dispatch(setCheckIn(null))
    dispatch(setCheckOut(null))
    dispatch(setDatePickerFocusedId('startDate'))
    if (typeof afterDatesChange === 'function') {
      afterDatesChange(null, null)
    }
  }

  const renderLabel = (type: 'title' | 'subtitle') => {
    if (type === 'title') {
      if (checkIn && checkOut) {
        const nights = moment(checkOut, DATE_FORMAT).diff(moment(checkIn, DATE_FORMAT), 'days')
        return nights + ` ${nights > 1 ? 'nights' : 'night'}`
      } else {
        return datePickerFocusedId === END_DATE ? 'Select checkout date' : 'Select dates'
      }
    }
    if (type === 'subtitle') {
      return datePickerFocusedId === END_DATE && typeof minimumStay !== 'undefined'
        ? `${minimumStay} ${minimumStay > 1 ? 'nights' : 'night'} minimum`
        : checkIn && checkOut
          ? moment(checkIn, DATE_FORMAT).format('MMM D') + ' - ' + moment(checkOut, DATE_FORMAT).format('MMM D, YYYY')
          : 'Add your dates for exact pricing'
    }
  }

  const handleSaveDates = () => {
    dispatch(setIsOpenDatePickerMobile(false))
    if (openSelectGuestOnSave) {
      dispatch(setIsOpenSelectGuestMobile(true))
    }
  }

  return (
    <>
      <BasicSwipeDrawer isOpen={isOpenDatePickerMobile} onClose={onClose} height={'100%'} noScroll>
        <div className={'customDateRange mx-[-16px] h-full pb-[160px]'} style={{ backgroundColor: '#FFF' }}>
          <div className={'px-12 pb-4'}>
            <p className={'font-editorial-new text-24-32 text-sand-8'}>{renderLabel('title')}</p>
            <p className={'text-16-24 text-sand-6'}>{renderLabel('subtitle')}</p>
          </div>
          <BasicDateRangePicker
            isMobile={true}
            startDate={checkIn ? moment(checkIn, DATE_FORMAT) : null}
            endDate={checkOut ? moment(checkOut, DATE_FORMAT) : null}
            hostId={hostId}
            pmsPropertyId={pmsPropertyId}
            afterDatesChange={afterDatesChange}
            isDisabledAllDate={isDisabledAllDate}
          />
        </div>
        {isShowBottom && isOpenDatePickerMobile && (
          <div
            className={
              'h-[80px] fixed w-full bottom-0 left-0 right-0 border-y border-sand-3 flex justify-between items-center p-[16px] bg-white z-10'
            }
            style={{
              boxShadow: '0px -1px 16px rgba(0, 0, 0, 0.04), 0px -1px 0px rgba(0, 0, 0, 0.04)',
              zIndex: 9999,
            }}
          >
            <div>
              <div className={'text-sand-7 text-18-24'}>
                {bookingPrices && (
                  <DtravelPrice
                    price={
                      typePayment === 'credit_card'
                        ? Number(bookingPrices?.finalPrice?.[cryptoPayment || 'USD']) || 0
                        : Number(bookingPrices?.convertedTotalPrice?.[cryptoPayment || 'USD']) || 0
                    }
                    isDynamic
                    currency={cryptoPayment || 'USD'}
                  />
                )}
              </div>
              <div className={'text-sand-7 text-14-18 underline py-1'} onClick={clearDates}>
                Clear date
              </div>
            </div>

            <BasicButton size={'lg'} variant={'contained'} onClick={handleSaveDates} disabled={!checkIn || !checkOut}>
              Save dates
            </BasicButton>
          </div>
        )}
      </BasicSwipeDrawer>
    </>
  )
}

export default SelectDateMobile
