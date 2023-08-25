import BasicDateRangePicker from '@dtravel/components/common/BasicDateRangePicker'
import BasicButton from '@dtravel/components/ui/BasicButton'
import { DATE_FORMAT, START_DATE } from '@dtravel/helpers/constants/constants'
import { useAppSelector } from '@dtravel/redux/hooks'
import { setDatePickerFocusedId, setIsOpenDatePickerDesktop } from '@dtravel/redux/slices/common'
import { setCheckIn, setCheckOut } from '@dtravel/redux/slices/property'
import Popover from '@mui/material/Popover'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import ic_close_md from '@dtravel/assets/icons/ic_close_md.svg'

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
  // eslint-disable-next-line no-unused-vars
  onSaveDates?: (_startDate: string | null, _endDate: string | null) => void
  isDisabledAllDate?: boolean
}

const SelectDatesV2: React.FC<Props> = ({
  hostId,
  pmsPropertyId,
  anchorElement,
  transformOrigin,
  anchorOrigin,
  mustHaveDatesBeforeClose,
  afterDatesChange,
  onSaveDates,
  isDisabledAllDate,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { checkIn, checkOut } = useAppSelector((state) => state.property)
  const { isOpenDatePickerDesktop } = useAppSelector((state) => state.common)

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
    dispatch(setDatePickerFocusedId(null))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    parseDatesFromQuery(router.query)
    // eslint-disable-next-line
  }, [router.query])

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
    if (isOpenDatePickerDesktop && anchorElement) {
      const rect = anchorElement.getBoundingClientRect() // button element, where popup appear
      // popover height = 511
      // distance between popover and anchor element = 12
      const bottomPopover = rect.bottom + 599 + 12
      if (bottomPopover > window.innerHeight) {
        // popover missing content
        window.scrollTo({
          top: window.scrollY + (bottomPopover - window.innerHeight) + 20,
          behavior: 'smooth',
        })

        window.setTimeout(() => {
          setAnchorEl(anchorElement)
        }, 500)
      } else {
        setAnchorEl(anchorElement)
      }
    } else {
      setAnchorEl(null)
    }
  }, [isOpenDatePickerDesktop, anchorElement])

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
    // reset check_in, check_out (case selected but do not click apply)
    parseDatesFromQuery(router.query)
  }

  const handleClearDate = () => {
    dispatch(setCheckIn(null))
    dispatch(setCheckOut(null))
    dispatch(setDatePickerFocusedId(START_DATE))
    if (typeof onSaveDates === 'function') {
      onSaveDates(null, null)
    } else {
      // change params url
      if (!mustHaveDatesBeforeClose) {
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
  }

  const handleApply = () => {
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
    handleClose()
  }

  const renderLabel = () => {
    return checkIn && checkOut
      ? moment(checkIn, DATE_FORMAT).format('MMM D') + ' - ' + moment(checkOut, DATE_FORMAT).format('MMM D, YYYY')
      : 'Select dates'
  }

  const open = Boolean(anchorEl)
  const id = open ? 'datepickerPopover' : undefined

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
      <div id={'dateWrapper'}>
        <div className={'flex justify-between items-center p-[24px]'}>
          <span className={'font-inter-500 text-16-20 text-grayscale-900'}>{renderLabel()}</span>
          <button
            className={'w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-grayscale-300'}
            onClick={handleClose}
          >
            <Image src={ic_close_md} width={20} height={20} alt="" />
          </button>
        </div>
        <div className={'customDateRange'} style={{ backgroundColor: '#FCFAFA' }}>
          <BasicDateRangePicker
            startDate={checkIn ? moment(checkIn, DATE_FORMAT) : null}
            endDate={checkOut ? moment(checkOut, DATE_FORMAT) : null}
            hostId={hostId}
            pmsPropertyId={pmsPropertyId}
            afterDatesChange={afterDatesChange}
            isDisabledAllDate={isDisabledAllDate}
            isKeepPopupAfterDatesChange={true}
          />
        </div>

        <div className={'flex justify-between items-center py-[24px] px-[32px]'}>
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
            onClick={handleClearDate}
            disabled={!checkIn && !checkIn}
          >
            Clear
          </button>
          <BasicButton variant={'contained'} onClick={handleApply} size={'lg'} disabled={!checkIn || !checkOut}>
            <span className={'font-inter-500 text-14-18 text-white'}>Apply</span>
          </BasicButton>
        </div>
      </div>
    </Popover>
  )
}

export default SelectDatesV2
