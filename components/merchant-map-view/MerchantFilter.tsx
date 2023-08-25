import React, { useRef } from 'react'
import { DATE_FORMAT, END_DATE, START_DATE } from '@dtravel/helpers/constants/constants'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import {
  setAnchorDatePicker,
  setAnchorSelectGuest,
  setDatePickerFocusedId,
  setIsOpenDatePickerDesktop,
  setIsOpenDatePickerMobile,
  setIsOpenSelectGuestDesktop,
} from '@dtravel/redux/slices/common'
import { useAppSelector } from '@dtravel/redux/hooks'
import Image from 'next/image'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import ic_chevron_down from '@dtravel/assets/icons/ic_chevron_down.svg'

interface Props {
  position: 'in_header' | 'in_body'
}

const MerchantFilter: React.FC<Props> = ({ position }) => {
  const dispatch = useDispatch()
  const dateRef = useRef<HTMLButtonElement | any>(null)
  const guestRef = useRef<HTMLButtonElement | any>(null)
  const windowDimensions = useWindowDimensions()
  const { checkIn, checkOut, adults, children, infants, pets } = useAppSelector((state) => state.property)

  const handleOpenDatePickerMobile = () => {
    dispatch(setDatePickerFocusedId(START_DATE))
    dispatch(setIsOpenDatePickerMobile(true))
  }

  const handleOpenDatePicker = (focusedId?: 'startDate' | 'endDate' | null) => {
    dispatch(setAnchorDatePicker(dateRef.current))
    dispatch(setIsOpenDatePickerDesktop(true))
    dispatch(setDatePickerFocusedId(focusedId || START_DATE))
  }

  const handleOpenSelectGuest = () => {
    dispatch(setAnchorSelectGuest(guestRef.current))
    dispatch(setIsOpenSelectGuestDesktop(true))
  }

  const countGuest = () => adults + children + infants

  const showOnLargeScreen =
    (position === 'in_header' && windowDimensions.width >= 768) ||
    (position === 'in_body' && windowDimensions.width >= 640 && windowDimensions.width < 1024)

  const showOnSmallScreen = position === 'in_body' && windowDimensions.width < 640

  return (
    <>
      {showOnLargeScreen && (
        <div className={position === 'in_body' ? 'mb-[24px]' : ''}>
          <div className={'flex rounded-[12px] min-w-[420px]'}>
            <button
              ref={dateRef}
              className={
                'flex justify-between items-center rounded-l-[12px] border border-neutral-3 px-[12px] py-[10px] w-1/3'
              }
              onClick={() => handleOpenDatePicker(START_DATE)}
            >
              <div className={'flex flex-col text-left'}>
                <span className={'font-inter-500 text-10-12 text-sand-6 uppercase mb-[4px]'}>Check-in</span>
                <span className={'font-inter-500 text-14-18 text-sand-8'}>
                  {checkIn ? moment(checkIn).format('MM/DD/YYYY') : 'Select'}
                </span>
              </div>
              {position === 'in_body' && <Image src={ic_chevron_down} alt={'ic_chevron_down'} />}
            </button>
            <button
              className={
                'flex justify-between items-center border-t border-b border-neutral-3 px-[12px] py-[10px] w-1/3'
              }
              onClick={() => handleOpenDatePicker(END_DATE)}
            >
              <div className={'flex flex-col text-left'}>
                <span className={'font-inter-500 text-10-12 text-sand-6 uppercase mb-[4px]'}>Check-out</span>
                <span className={'font-inter-500 text-14-18 text-sand-8'}>
                  {checkOut ? moment(checkOut).format('MM/DD/YYYY') : 'Select'}
                </span>
              </div>
              {position === 'in_body' && <Image src={ic_chevron_down} alt={'ic_chevron_down'} />}
            </button>
            <button
              ref={guestRef}
              className={
                'flex justify-between items-center rounded-r-[12px] border border-neutral-3 px-[12px] py-[10px] w-1/3'
              }
              onClick={handleOpenSelectGuest}
            >
              <div className={'flex flex-col text-left'}>
                <span className={'font-inter-500 text-10-12 text-sand-6 uppercase mb-[4px]'}>GUEST</span>
                <span className={'font-inter-500 text-14-18 text-sand-8'}>
                  {countGuest() > 0 ? (
                    <>
                      {countGuest()} {countGuest() > 1 ? 'guests' : 'guest'}
                      {pets > 0 && (
                        <>
                          {', '}
                          {pets} {pets > 1 ? 'pets' : 'pet'}
                        </>
                      )}
                    </>
                  ) : (
                    'Select'
                  )}
                </span>
              </div>
              {position === 'in_body' && <Image src={ic_chevron_down} alt={'ic_chevron_down'} />}
            </button>
          </div>
        </div>
      )}

      {/* screen <640px and in body page */}
      {showOnSmallScreen && (
        <button
          className={'border border-neutral-3 rounded-[12px] mt-[12px] w-full flex font-inter-500'}
          onClick={handleOpenDatePickerMobile}
        >
          <div className="w-1/3 flex flex-col items-start p-[12px]">
            <span className="uppercase text-10-12 text-neutral-6 mb-[4px]">Check-in</span>
            <span className="text-14-18 text-neutral-8">
              {!checkIn ? 'Select' : moment(checkIn, DATE_FORMAT).format('DD MMM')}
            </span>
          </div>
          <div className="w-1/3 flex flex-col items-start p-[12px] border-l-[1px] border-r-[1px] border-neutral-3">
            <span className="uppercase text-10-12 text-neutral-6 mb-[4px]">Check-out</span>
            <span className="text-14-18 text-neutral-8">
              {!checkOut ? 'Select' : moment(checkOut, DATE_FORMAT).format('DD MMM')}
            </span>
          </div>
          <div className="w-1/3 flex flex-col items-start p-[12px]">
            <span className="uppercase text-10-12 text-neutral-6 mb-[4px]">Guest</span>
            <span className="text-14-18 text-neutral-8">
              {countGuest()} {countGuest() > 1 ? 'guests' : 'guest'}
            </span>
          </div>
        </button>
      )}
    </>
  )
}

export default MerchantFilter
