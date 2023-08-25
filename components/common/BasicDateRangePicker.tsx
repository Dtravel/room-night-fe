import ic_arrow_back from '@dtravel/assets/icons/ic_arrow_back.svg'
import ic_arrow_forward from '@dtravel/assets/icons/ic_arrow_forward.svg'
import BasicButton from '@dtravel/components/ui/BasicButton'
import { DATE_FORMAT, END_DATE, START_DATE } from '@dtravel/helpers/constants/constants'
import { getNearestInValidDate, loadCalendarNextAndPrev } from '@dtravel/helpers/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'
import { setDatePickerFocusedId, setIsOpenDatePickerDesktop } from '@dtravel/redux/slices/common'
import { setCheckIn, setCheckOut, setMaximumStay, setMinimumStay } from '@dtravel/redux/slices/property'
import IconButton from '@mui/material/IconButton'
import moment, { Moment } from 'moment'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { DayPickerRangeController, FocusedInputShape, isInclusivelyAfterDay, ModifiersShape } from 'react-dates'
import { useDispatch } from 'react-redux'
import BasicTooltip from '@dtravel/components/ui/BasicTooltip'

interface Props {
  isMobile?: boolean
  startDate: Moment | null
  endDate: Moment | null
  hostId?: string
  pmsPropertyId?: string
  // eslint-disable-next-line no-unused-vars
  afterDatesChange?: (_startDate: string | null, _endDate: string | null) => void
  isDisabledAllDate?: boolean
  isKeepPopupAfterDatesChange?: boolean
}

moment.locale('en')

const BasicDateTimePicker: React.FC<Props> = ({
  isMobile,
  startDate,
  endDate,
  hostId,
  pmsPropertyId,
  afterDatesChange,
  isDisabledAllDate,
  isKeepPopupAfterDatesChange,
}) => {
  const dispatch = useDispatch()
  const [currentMonthOnCalendar, setCurrentMonthOnCalendar] = useState<Moment>(
    moment(startDate || moment()).startOf('month')
  )
  const [listMonth, setListMonth] = useState<string[]>([
    moment(startDate || moment())
      .startOf('month')
      .format(DATE_FORMAT),
    moment(startDate || moment())
      .add(1, 'month')
      .startOf('month')
      .format(DATE_FORMAT),
  ])
  const [nearestInValidDate, setNearestInValidDate] = useState<string | null>(null)
  const { datePickerFocusedId } = useAppSelector((state) => state.common)
  const { calendarDatesMap, disabledDatesMap, minimumStay, maximumStay } = useAppSelector((state) => state.property)
  const [showTooltip, setShowTooltip] = useState<any>({})

  useEffect(() => {
    // remove tooltip when user click clear dates
    if (!startDate && !endDate) {
      setShowTooltip({})
    }
  }, [startDate, endDate])

  const onFocusChange = (focusedInput: FocusedInputShape | null) => {
    if (focusedInput) {
      dispatch(setDatePickerFocusedId(focusedInput))
    } else {
      if (isMobile || isKeepPopupAfterDatesChange) {
        dispatch(setDatePickerFocusedId(START_DATE))
      } else {
        dispatch(setDatePickerFocusedId(null))
        dispatch(setIsOpenDatePickerDesktop(false))
      }
    }
  }

  const onDatesChange = ({ startDate, endDate }: { startDate: Moment | null; endDate: Moment | null }) => {
    // new logic 2022-07-19: get minimumStay and maximumStay from calendar by checkin date
    if (startDate) {
      const keyMonth = startDate.format('YYYY-MM')
      const datesInMonth = calendarDatesMap.get(keyMonth)
      const dataStartDate =
        Array.isArray(datesInMonth) && datesInMonth.find((item) => item.date === startDate.format(DATE_FORMAT))
      if (dataStartDate) {
        dispatch(setMinimumStay(dataStartDate.minimumStay))
        dispatch(setMaximumStay(dataStartDate.maximumStay))
      }
      setNearestInValidDate(getNearestInValidDate(startDate, calendarDatesMap))
    }
    if (startDate && endDate) {
      const diff = endDate.diff(startDate, 'day')
      const isLessThanMinNight = 0 < diff && diff < minimumStay
      const isGreaterMaxNight = 0 < diff && maximumStay < diff
      if (startDate.format(DATE_FORMAT) === endDate.format(DATE_FORMAT) || isLessThanMinNight || isGreaterMaxNight) {
        dispatch(setCheckIn(startDate.format(DATE_FORMAT)))
        dispatch(setCheckOut(null))
        dispatch(setDatePickerFocusedId(END_DATE))
      } else {
        dispatch(setCheckIn(startDate.format(DATE_FORMAT)))
        dispatch(setCheckOut(endDate.format(DATE_FORMAT)))
      }
    } else {
      dispatch(setCheckIn(startDate ? startDate.format(DATE_FORMAT) : null))
      dispatch(setCheckOut(endDate ? endDate.format(DATE_FORMAT) : null))
    }

    if (typeof afterDatesChange === 'function') {
      afterDatesChange(startDate ? startDate.format(DATE_FORMAT) : null, endDate ? endDate.format(DATE_FORMAT) : null)
    }
  }

  const onNextPrevMonthClick = (type: 'next' | 'prev') => async (newMonth: moment.Moment) => {
    setCurrentMonthOnCalendar(newMonth.startOf('month'))
    if (hostId && pmsPropertyId) {
      await loadCalendarNextAndPrev({
        currentDate: newMonth,
        type,
        currentCalendardMap: calendarDatesMap,
        currentDisabledMap: disabledDatesMap,
        hostId,
        pmsPropertyId,
      })
    }
  }

  const onNextPrevMonthMobileClick = async (type: 'next' | 'prev') => {
    const firstItem = moment(listMonth[0], DATE_FORMAT)
    const lastItem = moment(listMonth[listMonth.length - 1], DATE_FORMAT)
    const newList =
      type === 'prev'
        ? [
            moment(firstItem).add(-2, 'month').format(DATE_FORMAT),
            moment(firstItem).add(-1, 'month').format(DATE_FORMAT),
            ...listMonth,
          ]
        : [
            ...listMonth,
            moment(lastItem).add(1, 'month').format(DATE_FORMAT),
            moment(lastItem).add(2, 'month').format(DATE_FORMAT),
          ]
    setListMonth(newList)
    if (hostId && pmsPropertyId) {
      await loadCalendarNextAndPrev({
        currentDate: type === 'prev' ? firstItem : lastItem,
        type,
        currentCalendardMap: calendarDatesMap,
        currentDisabledMap: disabledDatesMap,
        hostId,
        pmsPropertyId,
      })
    }
  }

  const isDayBlocked = (day: Moment) => {
    if (isDisabledAllDate) {
      return true
    }
    if (day.startOf('day').isBefore(moment().startOf('day'))) {
      return true
    }
    if (datePickerFocusedId === END_DATE && day.startOf('day').isSameOrBefore(startDate)) {
      return true
    }
    if (
      datePickerFocusedId === END_DATE &&
      nearestInValidDate &&
      day.startOf('day').isSameOrAfter(moment(nearestInValidDate, DATE_FORMAT).startOf('day'))
    ) {
      return true
    }
    const key = moment(day).format('YYYY-MM')
    const disabledList = disabledDatesMap.get(key)
    return disabledList && disabledList.has(moment(day).format(DATE_FORMAT))
  }

  const renderDayClass = (day: Moment, modifiers: Set<string>) => {
    if (
      (modifiers.has('blocked-out-of-range') || modifiers.has('blocked-calendar')) &&
      !modifiers.has('selected-start') &&
      !modifiers.has('selected-end')
    ) {
      return 'line-through'
    }
    if (modifiers.has('selected-start') || modifiers.has('selected-end')) {
      return 'rounded-full w-full h-full flex items-center justify-center bg-sand-8 text-white'
    }
    if (modifiers.has('hovered')) {
      return 'rounded-full w-full h-full flex items-center justify-center bg-white border-2 border-solid border-sand-8 text-sand-7'
    }
    return 'text-sand-7'
  }

  const renderDayInMinMaxNight = (day: moment.Moment, modifiers: ModifiersShape, title: string) => {
    if (isMobile) {
      const dateFormated = day.format(DATE_FORMAT)
      return (
        <BasicTooltip title={title} placement={'top'} open={!!showTooltip[dateFormated]} arrow>
          <div
            onClick={(event) => {
              event.stopPropagation()
              setShowTooltip(() => ({ [dateFormated]: true }))
            }}
            className={
              renderDayClass(day, modifiers) +
              ' ' +
              'cursor-not-allowed opacity-60  w-full h-full flex items-center justify-center'
            }
          >
            {day.format('D')}
          </div>
        </BasicTooltip>
      )
    }
    return (
      <BasicTooltip title={title} placement={'top'}>
        <div
          onClick={(event) => event.stopPropagation()}
          className={
            renderDayClass(day, modifiers) +
            ' ' +
            'cursor-not-allowed opacity-60  w-full h-full flex items-center justify-center'
          }
        >
          {day.format('D')}
        </div>
      </BasicTooltip>
    )
  }

  const renderDayCheckInCheckOutOnly = (day: Moment, modifiers: ModifiersShape) => {
    const isSelected = modifiers.has('selected-start') || modifiers.has('selected-end')
    // const isSelected =
    //   (startDate && startDate.format(DATE_FORMAT) === dateFormated) ||
    //   (endDate && endDate.format(DATE_FORMAT) === dateFormated)
    if (isMobile) {
      const dateFormated = day.format(DATE_FORMAT)
      return (
        <BasicTooltip title={'Check-out Only'} placement={'top'} open={!!showTooltip[dateFormated]} arrow>
          <div
            onClick={(event) => {
              event.stopPropagation()
              setShowTooltip(() => ({ [dateFormated]: true }))
              setTimeout(() => {
                setShowTooltip(() => ({ [dateFormated]: false }))
              }, 3000)
            }}
            className={
              renderDayClass(day, modifiers) +
              `${isSelected ? '' : ' cursor-not-allowed opacity-60'}` +
              '  w-full h-full flex items-center justify-center'
            }
          >
            {day.format('D')}
          </div>
        </BasicTooltip>
      )
    }
    return (
      <BasicTooltip title={'Check-out Only'} placement={'top'}>
        <div
          onClick={(event) => event.stopPropagation()}
          className={
            renderDayClass(day, modifiers) +
            `${isSelected ? '' : ' cursor-not-allowed opacity-60'}` +
            '  w-full h-full flex items-center justify-center'
          }
        >
          {day.format('D')}
        </div>
      </BasicTooltip>
    )
  }

  const renderDayContent = (day: moment.Moment, modifiers: ModifiersShape) => {
    // check min night, max night
    const diff = day.diff(startDate, 'day')
    const isLessThanMinNight = 0 < diff && diff < minimumStay
    const isGreaterMaxNight = 0 < diff && maximumStay < diff
    const title = isLessThanMinNight
      ? `This host requires a ${minimumStay} ${minimumStay > 1 ? 'nights' : 'night'} minimum`
      : `This host requires a ${maximumStay} ${maximumStay > 1 ? 'nights' : 'night'} maximum`

    // check close on checkin, close on checkout
    const key = moment(day).format('YYYY-MM')
    const dataMonth = calendarDatesMap.get(key)
    const dataDate = Array.isArray(dataMonth)
      ? dataMonth.find((item: any) => item.date === moment(day).format(DATE_FORMAT))
      : null
    const isCheckoutOnly = !!(dataDate && dataDate.closedOnCheckin && !dataDate.closedOnCheckout)
    const isShowCheckoutOnly = isCheckoutOnly && datePickerFocusedId !== END_DATE

    return day ? (
      datePickerFocusedId === END_DATE && (isLessThanMinNight || isGreaterMaxNight) ? (
        renderDayInMinMaxNight(day, modifiers, title)
      ) : isShowCheckoutOnly ? (
        renderDayCheckInCheckOutOnly(day, modifiers)
      ) : (
        <div
          className={
            'w-full h-full flex items-center justify-center font-inter-500 ' + ' ' + renderDayClass(day, modifiers)
          }
        >
          {day.format('D')}
        </div>
      )
    ) : (
      <></>
    )
  }

  const isOutsideRange = (day: Moment) => {
    return !isInclusivelyAfterDay(day, moment())
  }

  return (
    <DayPickerRangeController
      navPosition={'navPositionTop'}
      orientation={isMobile ? 'verticalScrollable' : 'horizontal'}
      verticalHeight={500}
      startDate={startDate}
      endDate={endDate}
      focusedInput={datePickerFocusedId}
      onFocusChange={onFocusChange}
      isDayBlocked={isDayBlocked}
      onDatesChange={onDatesChange}
      hideKeyboardShortcutsPanel={true}
      numberOfMonths={2}
      isOutsideRange={isOutsideRange}
      noBorder={true}
      daySize={45}
      withPortal={false}
      initialVisibleMonth={null}
      minimumNights={0}
      navPrev={
        isMobile ? (
          <BasicButton
            disabled={moment(listMonth[0], DATE_FORMAT).isSameOrBefore(moment().startOf('month'))}
            variant={'outlined'}
            clases={`w-full ${
              moment(listMonth[0], DATE_FORMAT).isSameOrBefore(moment().startOf('month')) ? 'hidden' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              onNextPrevMonthMobileClick('prev')
            }}
          >
            Load more dates
          </BasicButton>
        ) : (
          <IconButton
            // onClick={(e) => {
            //   e.preventDefault()
            //   onNextPrevMonthClick('prev')
            // }}
            classes={{ root: 'absolute top-[22px] left-[20px]' }}
            disabled={currentMonthOnCalendar.isSameOrBefore(moment().startOf('month'))}
          >
            <Image src={ic_arrow_back} alt={'ic_arrow_back'} />
          </IconButton>
        )
      }
      navNext={
        isMobile ? (
          <BasicButton
            variant={'outlined'}
            clases={'w-full mt-6'}
            onClick={(e) => {
              e.preventDefault()
              onNextPrevMonthMobileClick('next')
            }}
          >
            Load more dates
          </BasicButton>
        ) : (
          <IconButton
            // onClick={(e) => {
            //   e.preventDefault()
            //   onNextPrevMonthClick('next')
            // }}
            classes={{ root: 'absolute top-[22px] right-[20px]' }}
          >
            <Image src={ic_arrow_forward} alt={'ic_arrow_forward'} />
          </IconButton>
        )
      }
      onPrevMonthClick={onNextPrevMonthClick('prev')}
      onNextMonthClick={onNextPrevMonthClick('next')}
      renderDayContents={renderDayContent}
    />
  )
}

export default BasicDateTimePicker
