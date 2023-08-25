import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { isEmpty, showDateRange } from '@dtravel/utils/common'
import { firstTimeLoadCalendar } from '@dtravel/helpers/utils/common'
import {
  setDatePickerFocusedId,
  setIsOpenDatePickerDesktop,
  setIsOpenDatePickerMobile,
  setIsOpenSelectGuestDesktop,
  setIsOpenSelectGuestMobile,
} from '@dtravel/redux/slices/common'
import { RESERVATION_STATUS, START_DATE } from '@dtravel/helpers/constants/constants'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import SelectDatesV2 from '@dtravel/components/common/SelectDatesV2'
import SelectDatesMobileV2 from '@dtravel/components/common/SelectDatesMobileV2'
import SelectGuestsV2 from '@dtravel/components/common/SelectGuestsV2'
import moment from 'moment'

interface Props {
  propertyDetail: any
  bookingPrices?: any
  loading: boolean
  isManualReservation: boolean
  manualReservationData?: any
  fetchManualReservation: any
}

const BookingTripInformation: React.FC<Props> = (props) => {
  const { propertyDetail, bookingPrices, loading, isManualReservation, manualReservationData, fetchManualReservation } =
    props
  const datePickerRef = useRef<HTMLElement | any>(null)
  const selectGuestRef = useRef<HTMLElement | any>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { userID } = useAppSelector((state) => state.property)
  const { hostId, check_in, check_out } = router.query
  const hostID = userID || hostId
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const [expireTime, setExpireTime] = useState<any>({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    async function fetchCalendar(address: string, id: string) {
      await firstTimeLoadCalendar(address, id)
    }

    if (hostID && propertyDetail?.id) {
      fetchCalendar(hostID as string, propertyDetail?.id)
    }
  }, [hostID, propertyDetail?.id])

  const handleOpenDatePicker = (focusedId?: 'startDate' | 'endDate' | null) => {
    dispatch(setDatePickerFocusedId(focusedId || START_DATE))
    dispatch(setIsOpenDatePickerDesktop(true))
  }

  const handleOpenDatePickerMobile = () => {
    dispatch(setDatePickerFocusedId(START_DATE))
    dispatch(setIsOpenDatePickerMobile(true))
  }

  const handleOpenSelectGuest = () => {
    dispatch(setIsOpenSelectGuestDesktop(true))
  }
  const renderGuestInfo = () => {
    let result: Array<string> = []
    if (Number(router.query?.adults || 1) > 0) {
      result.push(`${router.query?.adults || 1} ${Number(router.query?.adults || 1) > 1 ? 'adults' : 'adult'}`)
    }
    if (Number(router.query?.children || 0) > 0) {
      result.push(`${router.query?.children} ${Number(router.query?.children || 0) > 1 ? 'children' : 'child'}`)
    }
    if (Number(router.query?.infants || 0) > 0) {
      result.push(`${router.query?.infants} ${Number(router.query?.infants || 0) > 1 ? 'infants' : 'infant'}`)
    }
    if (Number(router.query?.pets || 0) > 0) {
      result.push(`${router.query?.pets} ${Number(router.query?.pets || 0) > 1 ? 'pets' : 'pet'}`)
    }
    return result.join(', ')
  }

  const showTimeExpired = () => {
    let result = { d: 0, h: 0, m: 0, s: 0 }
    if (manualReservationData?.expiredAt) {
      const diffMiliSeconds = Number(moment(manualReservationData?.expiredAt).diff(moment()))
      const diffSeconds = Number((diffMiliSeconds - (diffMiliSeconds % 1000)) / 1000)
      if (diffSeconds > 0) {
        const d = Number((diffSeconds - (diffSeconds % 86400)) / 86400)
        const h = Number((diffSeconds - d * 86400 - (diffSeconds % 3600)) / 3600)
        const m = Number((diffSeconds - d * 86400 - h * 3600 - (diffSeconds % 60)) / 60)
        // const m = Number(((diffSeconds - d * 86400 - h * 3600) / 60).toFixed(0))
        const s = Number(diffSeconds - d * 86400 - h * 3600 - m * 60)
        result = { d, h, m, s }
        setExpireTime(result)
      }
      if (diffSeconds <= 0 && manualReservationData?.status === RESERVATION_STATUS.INQUIRY) fetchManualReservation()
    }
    return result
  }
  // console.log(expireTime)
  useEffect(() => {
    setTimeout(() => {
      showTimeExpired()
    }, 1000)
    // eslint-disable-next-line
  }, [expireTime, manualReservationData])
  return (
    <>
      <div className="mb-[24px] md:mb-[48px] pb-[24px] md:pb-[48px] flex flex-col border-b-[12px] md:border-b-[0.5px] border-b-solid border-b-neutral-100 md:border-b-[#00000026] px-4 md:px-0">
        <p className="mb-[16px] md:mb-[24px] text-grayscale-900 font-inter-500 text-20-24">Trip information</p>
        <div className="w-full flex flex-col lg:flex-row">
          <div
            className={`flex flex-col w-full lg:w-1/2 border-[0.5px] rounded-[16px] lg:mr-[8px] p-[24px] ${isManualReservation
              ? 'cursor-not-allowed bg-grayscale-50 border-grayscale-50'
              : 'cursor-pointer bg-white border-[#00000026]'
              }`}
            ref={datePickerRef}
            onClick={() => {
              if (isManualReservation) return
              if (!isMobile) handleOpenDatePicker()
              else handleOpenDatePickerMobile()
            }}
          >
            <div className="flex text-14-18 text-grayscale-600">
              <div className="flex flex-col">
                <span className="text-14-18 text-grayscale-600 font-inter-400 mb-[4px]">Dates</span>
                <span className="text-16-20 text-grayscale-900 font-inter-500">
                  {showDateRange(String(check_in), String(check_out))}
                </span>
              </div>
            </div>
            {((!isEmpty(bookingPrices) && !bookingPrices?.isAvail) || !(check_in && check_out)) && !(isManualReservation && manualReservationData?.isBlockCalendar) && (
              <p className="font-inter-400 text-red-700 text-12-16 bg-red-100 rounded-[12px] p-3 mt-4">
                Unfortunately the requested time slot is not available for reservation. Change your selected time to
                book this.
              </p>
            )}
          </div>

          <div
            className={`flex w-full lg:w-1/2 border-[0.5px] rounded-[16px] mt-[16px] lg:mt-0 lg:ml-[8px] p-[24px] ${isManualReservation
              ? 'cursor-not-allowed bg-grayscale-50 border-grayscale-50'
              : 'cursor-pointer bg-white border-[#00000026]'
              }`}
            ref={selectGuestRef}
            onClick={() => {
              if (isManualReservation) return
              if (!isMobile) handleOpenSelectGuest()
              else if (!loading) dispatch(setIsOpenSelectGuestMobile(true))
            }}
          >
            <div className="flex flex-col">
              <span className="text-14-18 text-grayscale-600 font-inter-400 mb-[4px]">Guests</span>
              <span className="text-16-20 text-grayscale-900 font-inter-500">{renderGuestInfo()}</span>
            </div>
          </div>
        </div>
        {isManualReservation &&
          [RESERVATION_STATUS.INQUIRY, RESERVATION_STATUS.DRAFT].includes(manualReservationData?.status) && (
            <div className="mt-[12px] bg-sun-50 rounded-[16px] py-[16px] px-[24px] flex flex-col md:flex-row items-start md:items-center font-inter-500 text-14-18 text-sun-700">
              <span>This reservation will expire in&nbsp;</span>
              {manualReservationData?.expiredAt && (
                <div className="flex w-full md:w-auto mt-[8px] md:mt-0 items-center">
                  {/* <span>{moment(manualReservationData?.expiredAt).fromNow()}</span> */}
                  <p className="bg-white text-sun-700 px-[12px] py-[7px] rounded-[8px] w-1/3 md:w-auto text-center">{`${expireTime.d
                    } day${expireTime.d > 1 ? 's' : ''}`}</p>
                  &nbsp;:&nbsp;
                  <p className="bg-white text-sun-700 px-[12px] py-[7px] rounded-[8px] w-1/3 md:w-auto text-center">{`${expireTime.h
                    } hour${expireTime.h > 1 ? 's' : ''}`}</p>
                  &nbsp;:&nbsp;
                  <p className="bg-white text-sun-700 px-[12px] py-[7px] rounded-[8px] w-1/3 md:w-auto text-center whitespace-nowrap">{`${expireTime.m
                    } minute${expireTime.m > 1 ? 's' : ''}`}</p>
                  {/* &nbsp;:&nbsp;
                <p className='bg-white text-sun-700 px-[12px] py-[7px] rounded-[8px] w-1/3 md:w-auto text-center whitespace-nowrap'>{`${expireTime.s} second${expireTime.s > 1 ? 's' : ''}`}</p> */}
                </div>
              )}
            </div>
          )}
        {isManualReservation &&
          (manualReservationData?.status === RESERVATION_STATUS.EXPIRED ||
            manualReservationData?.status === RESERVATION_STATUS.MANUAL_CANCELLED) && (
            <div className="mt-[12px] bg-red-50 rounded-[16px] py-[23px] px-[24px] flex items-center font-inter-500 text-14-18 text-red-700">
              <span>{`This reservation has ${manualReservationData?.status === RESERVATION_STATUS.EXPIRED ? 'expired' : 'been cancelled'
                }`}</span>
            </div>
          )}
      </div>
      {/* date picker */}
      <div className="mobile-hidden">
        <SelectDatesV2
          anchorElement={datePickerRef.current}
          hostId={hostID as string}
          pmsPropertyId={propertyDetail?.id}
          loading={loading}
          mustHaveDatesBeforeClose={true}
          transformOrigin={{ vertical: -12, horizontal: 'left' }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      </div>
      <div className="md:hidden">
        <SelectDatesMobileV2
          hostId={hostID as string}
          pmsPropertyId={propertyDetail?.id}
          isShowBottom
          bookingPrices={bookingPrices}
          loading={loading}
        />
      </div>
      {/* guest */}
      <SelectGuestsV2
        anchorElement={selectGuestRef.current}
        transformOrigin={{ vertical: -12, horizontal: 'right' }}
        personCapacity={propertyDetail?.personCapacity || 0}
        maxPet={propertyDetail?.maxPet}
        isShowMaximumCapacityInfo={true}
        pmsType={propertyDetail?.pmsType}
        loading={loading}
      />
    </>
  )
}

export default BookingTripInformation
