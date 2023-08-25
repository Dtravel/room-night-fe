import DtravelPrice from '@dtravel/components/common/DtravelPrice'
import Loading from '@dtravel/components/common/Loading'
import PriceBreakDown from '@dtravel/components/common/PriceBreakDown'
import BasicButton from '@dtravel/components/ui/BasicButton'
import { START_DATE, DATE_FORMAT } from '@dtravel/helpers/constants/constants'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import { PriceReservation, Amenity } from '@dtravel/helpers/interfaces/property'
import { firstTimeLoadCalendar, getAveragePrice7Days } from '@dtravel/helpers/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'
import {
  setDatePickerFocusedId,
  setIsOpenDatePickerDesktop,
  setIsOpenDatePickerMobile,
  setIsOpenSelectGuestDesktop,
  setIsOpenSelectGuestMobile,
} from '@dtravel/redux/slices/common'
import { isEmpty, showDateRange } from '@dtravel/utils/common'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import ic_chevron_down from '@dtravel/assets/icons/ic_chevron_down.svg'
import Image from 'next/image'
import clsx from 'clsx'
import { setCheckIn, setCheckOut } from '@dtravel/redux/slices/property'
import Skeleton from '@mui/material/Skeleton'
import BookingSaving from '../booking/BookingSaving'
import SelectDatesV2 from '@dtravel/components/common/SelectDatesV2'
import SelectDatesMobileV2 from '@dtravel/components/common/SelectDatesMobileV2'
import SelectGuestsV2 from '@dtravel/components/common/SelectGuestsV2'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { IconUsers, IconCalendar } from '@dtravel/components/common/Icons'

interface Props {
  data: PriceReservation | null
  hostId: string
  propertyId: string
  pmsPropertyId: string
  minNights?: number
  maxNights?: number
  personCapacity: number
  amenities: Amenity[]
  currency: string
  pmsType: string
  propertyStatus: string
  isActive: boolean
  avgPrice?: number
  maxPet?: any
}

const PriceCard: React.FC<Props> = ({
  hostId,
  data,
  propertyId,
  pmsPropertyId,
  personCapacity,
  amenities,
  pmsType,
  propertyStatus,
  isActive,
  avgPrice,
  maxPet,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { color } = useTheme()
  const datesRef = useRef<HTMLButtonElement | any>(null)
  const guestRef = useRef<HTMLButtonElement | any>(null)
  const { isLoading, isOpenDatePickerMobile, selectedCurrency } = useAppSelector((state) => state.common)
  const { checkIn, checkOut, adults, children, infants, pets, calendarDatesMap, isDisableCalendar } = useAppSelector(
    (state) => state.property
  )

  const [nights, setNights] = useState<number>(1)
  const isMounted = useMounted()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024
  const rates = data?.exchangeRate?.rates || {}
  const rate = rates[selectedCurrency.key] || 1

  // call api to get calendar data (4 months)
  useEffect(() => {
    async function fetchCalendar(address: string, id: string) {
      await firstTimeLoadCalendar(address, id)
    }

    if (hostId && pmsPropertyId) {
      fetchCalendar(hostId, pmsPropertyId)
    }
  }, [hostId, pmsPropertyId])

  // set nights
  useEffect(() => {
    const checkInDate = moment(checkIn, 'YYYY-MM-DD')
    const checkOutDate = moment(checkOut, 'YYYY-MM-DD')
    const diffDays = checkOutDate.diff(checkInDate, 'days')
    setNights(diffDays)
  }, [checkIn, checkOut])

  const getParamsQuery = () => {
    let paramsQuery: any = {
      check_in: checkIn,
      check_out: checkOut,
      adults,
      children,
      infants,
      pets,
    }
    if (hostId) paramsQuery = { ...paramsQuery, hostId }
    if (propertyId) paramsQuery = { ...paramsQuery, propertyId }
    return paramsQuery
  }

  // redirect to booking page
  const handleBook = () => {
    router.push({
      pathname: `/booking/[propertyId]`,
      query: {
        ...getParamsQuery(),
        guests: adults + children + infants,
      },
    })
  }

  // handle click check avaiability button: open date range picker
  const handleCheckAvailability = (type: 'mobile' | 'desktop') => {
    if (checkIn && checkOut && adults + children + infants === 0) {
      handleOpenSelectGuest()
    } else {
      dispatch(setDatePickerFocusedId(START_DATE))
      if (type === 'mobile') {
        dispatch(setIsOpenDatePickerMobile(true))
      }
      if (type === 'desktop') {
        dispatch(setIsOpenDatePickerDesktop(true))
      }
    }
  }

  // handle click "Save dates" button on mobile
  const handleSaveDates = () => {
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
    dispatch(setIsOpenDatePickerMobile(false)) // close date picker mobile
    dispatch(setIsOpenSelectGuestMobile(true)) // open select guest mobile
  }

  const handleOpenDatePicker = (focusedId?: 'startDate' | 'endDate' | null) => {
    dispatch(setDatePickerFocusedId(focusedId || START_DATE))
    dispatch(setIsOpenDatePickerDesktop(true))
  }

  const handleOpenDatePickerMobile = () => {
    dispatch(setDatePickerFocusedId(START_DATE))
    dispatch(setIsOpenDatePickerMobile(true))
  }

  const clearDates = () => {
    dispatch(setCheckIn(null))
    dispatch(setCheckOut(null))
    dispatch(setDatePickerFocusedId(START_DATE))
  }

  const handleOpenSelectGuest = () => {
    dispatch(setIsOpenSelectGuestDesktop(true))
  }

  const isActiveAndPublished = () => {
    return propertyStatus === 'active' && isActive
  }

  if (!isMounted) {
    return null
  }

  const countGuest = () => adults + children + infants

  const isCrypto = selectedCurrency.type === 'CRYPTO'

  return (
    <>
      {/* DESKTOP */}
      {!isMobile && (
        <div className={'sticky top-[80px]'}>
          <div
            className={
              'box-border border border-solid border-neutral-300 rounded-[24px] px-[24px] pb-[24px] pt-[32px] '
            }
          >
            {isLoading && <Loading />}

            {data ? (
              <p className={'inline-flex items-center'}>
                <span className={'font-inter-600 text-20-32 text-neutral-900'} style={color ? { color } : {}}>
                  <DtravelPrice price={data.basePricePerNight * rate} currency={selectedCurrency.key} />
                </span>
                <span className={'font-inter-400 text-16-20 text-neutral-900'}>&nbsp;/&nbsp;night</span>
              </p>
            ) : avgPrice !== undefined ? (
              <p className={'inline-flex items-center'}>
                <span className={'font-inter-600 text-20-32 text-neutral-900'} style={color ? { color } : {}}>
                  <DtravelPrice price={avgPrice} currency={selectedCurrency.key} isDynamic={isCrypto} isRounded />
                </span>
                <span className={'font-inter-400 text-16-20 text-neutral-900'}>&nbsp;/&nbsp;night</span>
              </p>
            ) : (
              <Skeleton variant="rectangular" width={180} height={36} style={{ borderRadius: 12 }} />
            )}

            <div className={'grid grid-cols-1 mt-4 '}>
              <button
                onClick={() => handleOpenDatePicker(START_DATE)}
                className={clsx({
                  'h-[48px] flex gap-[8px] items-center px-[16px] py-[14px] rounded-t-[12px] border border-solid border-neutral-300 cursor-pointer':
                    true,
                })}
                ref={datesRef}
              >
                <IconCalendar color={color} />
                <span
                  className={`font-inter-500 text-14-18 ${checkIn && checkOut ? 'text-neutral-900' : 'text-neutral-600'
                    }`}
                >
                  {checkIn && checkOut ? showDateRange(checkIn, checkOut) : 'Dates'}
                </span>
                <span className={'ml-auto flex items-center'}>
                  <Image src={ic_chevron_down} alt={'ic_chevron_down'} />
                </span>
              </button>
              <button
                ref={guestRef}
                className={
                  'h-[48px] flex gap-[8px] items-center px-[16px] py-[14px] rounded-b-[12px] border border-t-0 border-solid border-neutral-300 cursor-pointer'
                }
                onClick={handleOpenSelectGuest}
              >
                <IconUsers color={color} />
                <span className={'font-inter-500 text-14-18 text-neutral-900'}>
                  {countGuest() > 0 ? (
                    <>
                      {countGuest() + ' '}
                      {countGuest() > 1 ? 'guests' : 'guest'}
                      {pets > 0 && (
                        <>
                          {', '}
                          {pets} {pets > 1 ? 'pets' : 'pet'}
                        </>
                      )}
                    </>
                  ) : (
                    'Guests'
                  )}
                </span>
                <span className={'ml-auto flex items-center'}>
                  <Image src={ic_chevron_down} alt={'ic_chevron_down'} />
                </span>
              </button>
            </div>

            {/*{data && !isDisabled && <PriceBreakDown data={data} nights={nights} hasBorder />}*/}
            {/* Alawy show USD price for detail page */}
            {data && <PriceBreakDown data={data} nights={nights} hasBorder />}
            {!isEmpty(data) && !data?.isAvail && (
              <p className="font-inter-400 text-red-6 text-12-16 bg-red-1 rounded-[12px] p-3 mt-4">
                Unfortunately the requested time slot is not available for reservation. Change your selected time to
                book this.
              </p>
            )}

            <div className={'mt-4'}>
              {checkIn && checkOut && adults + children + pets > 0 ? (
                isActiveAndPublished() ? (
                  <BasicButton
                    variant={'contained'}
                    clases={'w-full'}
                    size={'xl'}
                    onClick={handleBook}
                    disabled={isDisableCalendar}
                    style={color ? { backgroundColor: color } : {}}
                  >
                    <span className={'text-16-20'}>Reserve</span>
                  </BasicButton>
                ) : (
                  ''
                )
              ) : (
                <BasicButton
                  variant={'contained'}
                  clases={'w-full'}
                  size={'xl'}
                  onClick={() => handleCheckAvailability('desktop')}
                  style={color ? { backgroundColor: color } : {}}
                >
                  <span className={'text-16-20'}>Check availability</span>
                </BasicButton>
              )}
            </div>
          </div>
          <BookingSaving bookingPrices={data} averagePrice7Days={data ? null : avgPrice} />
        </div>
      )}

      {/* MOBILE */}
      {isMobile && (
        <div
          className={
            // 'block lg:hidden' +
            'fixed w-full bottom-0 left-0 right-0 border-y border-sand-3 p-[16px] bg-white'
          }
          style={{
            boxShadow: '0px -1px 16px rgba(0, 0, 0, 0.04), 0px -1px 0px rgba(0, 0, 0, 0.04)',
            zIndex: isOpenDatePickerMobile ? 9999 : 99,
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className={'font-inter-500 text-16-20 text-neutral-700 inline-flex mb-[8px]'}>
                <DtravelPrice
                  price={data ? Number(data.finalPrice[selectedCurrency.key]) : avgPrice ? avgPrice : 0}
                  currency={selectedCurrency.key}
                  isDynamic={!data && isCrypto}
                />{' '}
                {data ? '' : '/ night'}
              </div>

              {checkIn && checkOut ? (
                <div className={'text-14-18 underline py-1'} onClick={() => handleOpenDatePickerMobile()}>
                  {moment(checkIn, DATE_FORMAT).format('MMM D') +
                    ' - ' +
                    moment(checkOut, DATE_FORMAT).format('MMM D, YYYY')}
                </div>
              ) : isOpenDatePickerMobile ? (
                <div
                  className={'font-inter-500 text-14-18 text-neutral-800 underline py-1'}
                  onClick={() => clearDates()}
                >
                  Clear dates
                </div>
              ) : (
                <div
                  className={'font-inter-500 text-14-18 text-neutral-800 underline'}
                  onClick={handleOpenDatePickerMobile}
                >
                  Add dates
                </div>
              )}
            </div>
            {isOpenDatePickerMobile ? (
              <BasicButton
                variant={'contained'}
                onClick={handleSaveDates}
                disabled={!checkIn || !checkOut}
                size={'xxl'}
              >
                <span className={'font-inter-500 text-16-20'}>Apply</span>
              </BasicButton>
            ) : (
              <>
                {checkIn && checkOut && adults + children + pets > 0 ? (
                  isActiveAndPublished() ? (
                    <BasicButton variant={'contained'} onClick={handleBook} disabled={isDisableCalendar} size={'xxl'}>
                      <span className={'font-inter-500 text-16-20'}>Reserve</span>
                    </BasicButton>
                  ) : (
                    ''
                  )
                ) : (
                  <BasicButton variant={'contained'} onClick={() => handleCheckAvailability('mobile')} size={'xxl'}>
                    <span className={'font-inter-500 text-16-20'}>Check availability</span>
                  </BasicButton>
                )}
              </>
            )}
          </div>
          {!isEmpty(data) && !data?.isAvail && (
            <p className="font-inter-400 text-red-6 text-12-16 bg-red-1 rounded-xl p-3 mt-4">
              Unfortunately the requested time slot is not available for reservation. Change your selected time to book
              this.
            </p>
          )}
        </div>
      )}

      <SelectDatesV2
        anchorElement={datesRef.current}
        hostId={hostId}
        pmsPropertyId={pmsPropertyId}
        isDisabledAllDate={!isActiveAndPublished() || isDisableCalendar}
        transformOrigin={{ vertical: -12, horizontal: 'right' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />

      <SelectDatesMobileV2
        hostId={hostId}
        pmsPropertyId={pmsPropertyId}
        isDisabledAllDate={!isActiveAndPublished() || isDisableCalendar}
      />

      <SelectGuestsV2
        anchorElement={guestRef.current}
        transformOrigin={{ vertical: -12, horizontal: 'right' }}
        personCapacity={personCapacity}
        maxPet={maxPet}
        isShowMaximumCapacityInfo={true}
        pmsType={pmsType}
      />
    </>
  )
}

export default PriceCard
