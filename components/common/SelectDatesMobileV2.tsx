import BasicDateRangePicker from '@dtravel/components/common/BasicDateRangePicker'
// import DtravelPrice from '@dtravel/components/common/DtravelPrice'
// import BasicButton from '@dtravel/components/ui/BasicButton'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import { DATE_FORMAT, START_DATE } from '@dtravel/helpers/constants/constants'
import { useAppSelector } from '@dtravel/redux/hooks'
import {
  setDatePickerFocusedId,
  setIsOpenDatePickerMobile,
  // setIsOpenSelectGuestMobile,
} from '@dtravel/redux/slices/common'
import { setCheckIn, setCheckOut } from '@dtravel/redux/slices/property'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import ic_close_md from '@dtravel/assets/icons/ic_close_md.svg'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  hostId?: string
  pmsPropertyId?: string
  isShowBottom?: boolean
  bookingPrices?: any
  loading?: boolean
  // eslint-disable-next-line no-unused-vars
  afterDatesChange?: (_startDate: string | null, _endDate: string | null) => void
  // eslint-disable-next-line no-unused-vars
  onSaveDates?: (_startDate: string | null, _endDate: string | null) => void
  isDisabledAllDate?: boolean
}

const SelectDatesMobileV2: React.FC<Props> = ({
  hostId,
  pmsPropertyId,
  isShowBottom,
  // bookingPrices,
  afterDatesChange,
  onSaveDates,
  isDisabledAllDate,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { color } = useTheme()
  const { isOpenDatePickerMobile } = useAppSelector((state) => state.common)
  const { checkIn, checkOut } = useAppSelector((state) => state.property)
  // const { isOpenDatePickerMobile, datePickerFocusedId, typePayment, cryptoPayment } = useAppSelector(
  //   (state) => state.common
  // )
  // const { checkIn, checkOut, minimumStay, maximumStay } = useAppSelector((state) => state.property)

  const parseDatesFromQuery = (queryParams: any) => {
    const { check_in, check_out } = queryParams
    if (check_in && moment(check_in, DATE_FORMAT).isValid()) {
      dispatch(setCheckIn(String(check_in)))
    } else {
      dispatch(setCheckIn(null))
    }
    if (check_out && moment(check_out, DATE_FORMAT).isValid()) {
      dispatch(setCheckOut(String(check_out)))
    } else {
      dispatch(setCheckOut(null))
    }
  }

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
    dispatch(setIsOpenDatePickerMobile(false))
    // reset check_in, check_out (case selected but do not click apply)
    parseDatesFromQuery(router.query)
  }

  const handleClearDates = () => {
    // dispatch(setCheckIn(null))
    // dispatch(setCheckOut(null))
    dispatch(setDatePickerFocusedId(START_DATE))
    if (typeof onSaveDates === 'function') {
      onSaveDates(null, null)
    } else {
      // change params url
      const queryObj: any = { ...router.query }
      delete queryObj.check_in
      delete queryObj.check_out
      router.push(
        {
          pathname: router.pathname,
          query: queryObj,
        },
        undefined,
        { scroll: false, shallow: true }
      )
    }
  }

  const handleSaveDates = () => {
    if (typeof onSaveDates === 'function') {
      onSaveDates(checkIn, checkOut)
    } else {
      // change params url
      const queryObj: any = { ...router.query, check_in: checkIn, check_out: checkOut }
      if (!checkIn) delete queryObj.check_in
      if (!checkOut) delete queryObj.check_out
      router.push(
        {
          pathname: router.pathname,
          query: queryObj,
        },
        undefined,
        { scroll: false, shallow: true }
      )
    }
    onClose()
  }

  const renderLabel = () => {
    return checkIn && checkOut
      ? moment(checkIn, DATE_FORMAT).format('MMM D') + ' - ' + moment(checkOut, DATE_FORMAT).format('MMM D, YYYY')
      : 'Select dates'
  }

  return (
    <>
      <BasicSwipeDrawer isOpen={isOpenDatePickerMobile} onClose={onClose} height={'100%'} noScroll hideClose={true}>
        <div className={'customDateRange mx-[-16px] h-full pb-[194px]'} style={{ backgroundColor: '#FFF' }}>
          <div className={'flex justify-between items-center px-[16px] mb-[16px]'}>
            <span className={'font-inter-500 text-16-20 text-grayscale-900'}>{renderLabel()}</span>
            <button
              className={'w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-grayscale-300'}
              onClick={onClose}
            >
              <Image src={ic_close_md} width={20} height={20} alt="" />
            </button>
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
              'h-[80px] fixed w-full bottom-0 left-0 right-0 border-y border-sand-3 flex justify-between items-center px-[16px] py-[12px] bg-white z-10 gap-[12px]'
            }
            style={{
              boxShadow: '0px -1px 16px rgba(0, 0, 0, 0.04), 0px -1px 0px rgba(0, 0, 0, 0.04)',
              zIndex: 9999,
            }}
          >
            <button
              className={
                'bg-white font-inter-500 text-grayscale-900 flex items-center justify-center ' +
                'h-[56px] md:h-[40px] ' +
                'rounded-[16px] md:rounded-[12px] ' +
                'text-16-20 md:text-14-18 ' +
                'w-1/3 md:w-auto ' +
                'border border-grayscale-300 md:border-none ' +
                'md:active:underline ' +
                'md:disabled:active:no-underline ' +
                'disabled:opacity-50 ' +
                'disabled:cursor-not-allowed'
              }
              disabled={!checkIn && !checkIn}
              onClick={handleClearDates}
            >
              Clear
            </button>
            <button
              className={
                'bg-grayscale-900 font-inter-500 text-white px-[16px] flex items-center justify-center ' +
                'h-[56px] md:h-[40px] ' +
                'rounded-[16px] md:rounded-[12px] ' +
                'text-16-20 md:text-14-18 ' +
                'w-2/3 md:w-auto ' +
                'disabled:opacity-50 ' +
                'disabled:cursor-not-allowed'
              }
              disabled={!checkIn || !checkOut}
              onClick={handleSaveDates}
              style={color ? { backgroundColor: color } : {}}
            >
              Apply
            </button>
          </div>
        )}
      </BasicSwipeDrawer>
    </>
  )
}

export default SelectDatesMobileV2
