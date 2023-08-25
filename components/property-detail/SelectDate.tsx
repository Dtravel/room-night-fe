import BasicDateRangePicker from '@dtravel/components/common/BasicDateRangePicker'
import BasicButton from '@dtravel/components/ui/BasicButton'
import { DATE_FORMAT, END_DATE, START_DATE } from '@dtravel/helpers/constants/constants'
import { useAppSelector } from '@dtravel/redux/hooks'
import { setDatePickerFocusedId, setIsOpenDatePickerDesktop } from '@dtravel/redux/slices/common'
import { setCheckIn, setCheckOut } from '@dtravel/redux/slices/property'
import Popover from '@mui/material/Popover'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  hostId?: string
  pmsPropertyId?: string
  loading?: boolean
  anchorElement: HTMLElement | null
  transformOrigin?: any
  anchorOrigin?: any
  mustHaveDatesBeforeClose?: boolean
  // eslint-disable-next-line no-unused-vars
  afterDatesChange?: (_startDate: string | null, _endDate: string | null) => void
  isDisabledAllDate?: boolean
  isScrollToTopWhenOpen?: boolean
}

const SelectDate: React.FC<Props> = ({
  hostId,
  pmsPropertyId,
  anchorElement,
  transformOrigin,
  anchorOrigin,
  mustHaveDatesBeforeClose,
  afterDatesChange,
  isDisabledAllDate,
  isScrollToTopWhenOpen,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { checkIn, checkOut, minimumStay } = useAppSelector((state) => state.property)
  const { isOpenDatePickerDesktop, datePickerFocusedId } = useAppSelector((state) => state.common)

  useEffect(() => {
    const { check_in, check_out } = router.query
    if (check_in && moment(check_in, DATE_FORMAT).isValid()) {
      dispatch(setCheckIn(String(check_in)))
    }
    if (check_out && moment(check_out, DATE_FORMAT).isValid()) {
      dispatch(setCheckOut(String(check_out)))
    }

    dispatch(setDatePickerFocusedId(null))
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
    }
    // eslint-disable-next-line
  }, [router.query])

  useEffect(() => {
    setAnchorEl(isOpenDatePickerDesktop ? anchorElement : null)
    if (isOpenDatePickerDesktop && isScrollToTopWhenOpen) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [isOpenDatePickerDesktop, anchorElement, isScrollToTopWhenOpen])

  const handleClose = () => {
    if (mustHaveDatesBeforeClose) {
      if (checkIn && checkOut) {
        dispatch(setIsOpenDatePickerDesktop(false))
        dispatch(setDatePickerFocusedId(null))
        setAnchorEl(null)
      }
    } else {
      dispatch(setIsOpenDatePickerDesktop(false))
      dispatch(setDatePickerFocusedId(null))
      setAnchorEl(null)
    }
  }

  const handleSelectFocusedId = (focusedId?: 'startDate' | 'endDate' | null) => {
    dispatch(setDatePickerFocusedId(focusedId || START_DATE))
  }

  const handleClearDate = () => {
    dispatch(setCheckIn(null))
    dispatch(setCheckOut(null))
    dispatch(setDatePickerFocusedId(START_DATE))
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

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={
        anchorOrigin
          ? { ...anchorOrigin }
          : {
            vertical: 'bottom',
            horizontal: 'right',
          }
      }
      transformOrigin={
        transformOrigin
          ? { ...transformOrigin }
          : {
            vertical: window && window.innerHeight < 800 ? 68 : -8,
            horizontal: 'right',
          }
      }
      sx={{
        '& .MuiPaper-root': {
          width: 'auto',
          height: 'auto',
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2)',
          borderRadius: '24px',
          backgroundColor: '#FFFFFF',
          padding: '0px',
        },
      }}
    >
      <div className={'flex justify-between items-center px-[32px] py-[24px]'}>
        <div>
          <p className={'font-editorial-new text-24-32 text-sand-8'}>{renderLabel('title')}</p>
          <p className={'text-16-24 text-sand-6'}>{renderLabel('subtitle')}</p>
        </div>
        <div className={'flex justify-between border-box rounded-[16px]'}>
          <div
            className={`max-h-16 pr-[80px] py-[14px] px-4 rounded-l-[16px] ${datePickerFocusedId === 'startDate' ? 'border-2 border-sand-8' : 'border border-sand-3'
              }`}
            onClick={() => handleSelectFocusedId(START_DATE)}
          >
            <p className={'uppercase text-10-12 text-sand-6 letter-spacing-004em'}>Check in</p>
            <p className={'uppercase text-16-20 text-sand-5 mt-[2px]'}>
              {checkIn ? moment(checkIn).format('MM/DD/YYYY') : 'MM/DD/YYYY'}
            </p>
          </div>
          <div
            className={`max-h-16 pr-[80px] py-[14px] px-4 rounded-r-[16px] ${datePickerFocusedId === 'endDate' ? 'border-2 border-sand-8' : 'border border-sand-3'
              }`}
            onClick={() => handleSelectFocusedId(END_DATE)}
          >
            <p className={'uppercase text-10-12 text-sand-6 letter-spacing-004em'}>Check out</p>
            <p className={'uppercase text-16-20 text-sand-5 mt-[2px]'}>
              {checkOut ? moment(checkOut).format('MM/DD/YYYY') : 'MM/DD/YYYY'}
            </p>
          </div>
        </div>
      </div>
      <div className={'customDateRange'} style={{ backgroundColor: '#FCFAFA' }}>
        <BasicDateRangePicker
          startDate={checkIn ? moment(checkIn, DATE_FORMAT) : null}
          endDate={checkOut ? moment(checkOut, DATE_FORMAT) : null}
          hostId={hostId}
          pmsPropertyId={pmsPropertyId}
          afterDatesChange={afterDatesChange}
          isDisabledAllDate={isDisabledAllDate}
        />
      </div>

      <div className={'flex justify-between items-center py-[24px] px-[32px]'}>
        <BasicButton variant={'outlined'} size={'lg'} onClick={handleClearDate} disabled={!checkIn && !checkIn}>
          Clear dates
        </BasicButton>
        <BasicButton variant={'contained'} onClick={handleClose} size={'lg'}>
          Save dates
        </BasicButton>
      </div>
    </Popover>
  )
}

export default SelectDate
