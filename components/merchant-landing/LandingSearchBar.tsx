import React, { useRef } from 'react'
import ic_chevron_down_16x16 from '@dtravel/assets/icons/ic_chevron_down_16x16.svg'
import Image from 'next/image'
import SelectDatesV2 from '@dtravel/components/common/SelectDatesV2'
import { useAppSelector } from '@dtravel/redux/hooks'
import {
  setAnchorDatePicker,
  setAnchorSelectGuest,
  setAnchorSelectLocation,
  setDatePickerFocusedId,
  setIsOpenDatePickerDesktop,
  setIsOpenDatePickerMobile,
  setIsOpenSelectGuestDesktop,
  setIsOpenSelectGuestMobile,
  setIsOpenSelectLocationDesktop,
  setIsOpenSelectLocationMobile,
  // setSelectedLocations,
} from '@dtravel/redux/slices/common'
import { DATE_FORMAT, START_DATE } from '@dtravel/helpers/constants/constants'
import { useDispatch } from 'react-redux'
import moment from 'moment/moment'
import SelectLocations from '@dtravel/components/merchant-landing/SelectLocations'
import { useRouter } from 'next/router'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
// import queryString from 'query-string'
import SelectDatesMobileV2 from '@dtravel/components/common/SelectDatesMobileV2'
import SelectGuestsV2 from '@dtravel/components/common/SelectGuestsV2'
import { IconSearch } from '@dtravel/components/common/Icons'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  isInHeader?: boolean
}

const LandingSearchBar: React.FC<Props> = ({ isInHeader }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { color } = useTheme()
  const { hostId } = router.query
  const { userID } = useAppSelector((state) => state.property)
  const hostID = (userID || hostId) as string
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const dateRef = useRef<HTMLButtonElement | any>(null)
  const guestRef = useRef<HTMLButtonElement | any>(null)
  const locationRef = useRef<HTMLButtonElement | any>(null)
  const { checkIn, checkOut, adults, children, infants, pets, businessInfor } = useAppSelector(
    (state) => state.property
  )
  const { anchorDatePicker, anchorSelectGuest, anchorSelectLocation, selectedLocations, locations } = useAppSelector(
    (state) => state.common
  )

  const handleOpenDatePicker = (focusedId?: 'startDate' | 'endDate' | null) => {
    dispatch(setDatePickerFocusedId(focusedId || START_DATE))
    if (isMobile) {
      dispatch(setIsOpenDatePickerMobile(true))
    } else {
      dispatch(setAnchorDatePicker(dateRef.current))
      dispatch(setIsOpenDatePickerDesktop(true))
    }
  }

  const handleOpenSelectGuest = (e: any) => {
    if (isMobile) {
      dispatch(setIsOpenSelectGuestMobile(true))
    } else {
      dispatch(setAnchorSelectGuest(guestRef.current))
      dispatch(setIsOpenSelectGuestDesktop(true))
    }
    e.preventDefault()
  }

  const handleOpenSelectLocation = (e: any) => {
    if (isMobile) {
      dispatch(setIsOpenSelectLocationMobile(true))
    } else {
      dispatch(setAnchorSelectLocation(locationRef.current))
      dispatch(setIsOpenSelectLocationDesktop(true))
    }
    e.preventDefault()
  }

  const handleBookNow = () => {
    if (typeof window !== 'undefined' && hostID) {
      let queryObj: any = {}
      if (checkIn) queryObj = { ...queryObj, check_in: checkIn }
      if (checkOut) queryObj = { ...queryObj, check_out: checkOut }
      if (adults) queryObj = { ...queryObj, adults }
      if (children) queryObj = { ...queryObj, children }
      if (infants) queryObj = { ...queryObj, infants }
      if (pets) queryObj = { ...queryObj, pets }
      if (selectedLocations) queryObj = { ...queryObj, locations: selectedLocations }
      if (hostId) queryObj = { ...queryObj }
      router.push({
        pathname: hostId ? `/${hostId}/property` : `/property`,
        query: queryObj,
      })
    }
  }

  const handleSaveDates = (check_in: string | null, check_out: string | null) => {
    const queryObj: any = { ...router.query, check_in, check_out }
    if (!check_in) delete queryObj.check_in
    if (!check_out) delete queryObj.check_out
    router.push(
      {
        pathname: router.pathname,
        query: queryObj,
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  const handleSaveGuest = ({ adults, children, infants, pets }: any) => {
    const queryObj: any = { ...router.query, adults, children, infants, pets }
    if (!adults) delete queryObj.adults
    if (!children) delete queryObj.children
    if (!infants) delete queryObj.infants
    if (!pets) delete queryObj.pets
    router.push(
      {
        pathname: router.pathname,
        query: queryObj,
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  const renderDates = () => {
    const { check_in, check_out } = router.query
    const isSameYear = moment(check_in, DATE_FORMAT).format('YYYY') === moment(check_out, DATE_FORMAT).format('YYYY')
    return check_in && check_out
      ? moment(check_in, DATE_FORMAT).format(isSameYear ? 'MMM DD' : 'MMM DD, YYYY') +
          ' - ' +
          moment(check_out, DATE_FORMAT).format('MMM DD, YYYY')
      : 'Any dates'
  }

  const renderGuests = () => {
    const _adults = router.query.adults ? Number(router.query.adults) : 0
    const _children = router.query.children ? Number(router.query.children) : 0
    const _infants = router.query.infants ? Number(router.query.infants) : 0
    const _pets = router.query.pets ? Number(router.query.pets) : 0
    const guests = _adults + _children + _infants
    let _text = guests + ' ' + (guests > 1 ? 'guests' : 'guest')
    if (_pets > 0) {
      _text += `, ${_pets} ${_pets > 1 ? 'pets' : 'pet'}`
    }
    return guests > 0 ? _text : 'Any guests'
  }

  const renderTextLocations = () => {
    if (router.query.locations && typeof router.query.locations === 'string') {
      return router.query.locations
    }
    if (Array.isArray(router.query.locations)) {
      return router.query.locations.join(', ')
    }
    // locations from data api
    if (locations.length === 1) {
      return locations[0].city + ', ' + locations[0].country
    }
    return 'All locations'
  }

  const renderSearchBarInHeader = () => {
    return (
      <div
        className={
          'flex items-center rounded-[100px] border border-neutral-300 h-[40px] w-full md:w-[384px] lg:w-[600px] font-inter-500 text-neutral-900 text-14-18'
        }
      >
        <button
          className={
            'px-[12px] flex justify-between items-center h-full w-1/3 border-r border-neutral-300 gap-[12px] min-w-0 ' +
            'disabled:opacity-50 ' +
            'disabled:cursor-not-allowed'
          }
          ref={locationRef}
          onClick={handleOpenSelectLocation}
          disabled={locations.length === 0 || locations.length === 1}
        >
          <span className={'flex items-center gap-[8px] min-w-0'}>
            <span className={'min-w-[16px]'}>
              <IconSearch color={color} />
            </span>
            <span className={'truncate'}>{renderTextLocations()}</span>
          </span>
          <span className={'hidden lg:block min-w-[16px]'}>
            <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
          </span>
        </button>
        <button
          className={'px-[12px] flex justify-between items-center h-full w-1/3 border-r border-neutral-300 gap-[12px]'}
          ref={dateRef}
          onClick={() => handleOpenDatePicker('startDate')}
        >
          <span className={'truncate'}>{renderDates()}</span>
          <span className={'hidden lg:block min-w-[16px]'}>
            <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
          </span>
        </button>
        <button
          className={'px-[12px] flex justify-between items-center h-full w-1/3 gap-[12px]'}
          ref={guestRef}
          onClick={handleOpenSelectGuest}
        >
          <span>{renderGuests()}</span>
          <span className={'hidden lg:block min-w-[16px]'}>
            <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
          </span>
        </button>
      </div>
    )
  }

  const renderSearchBarInHeroSection = () => {
    return (
      <>
        {/*---In hero image, only show on DESKTOP---*/}
        <div
          className={
            'w-full md:w-[586px] lg:w-[646px] xl:w-[720px] 2xl:w-[832px] h-[80px] bg-white rounded-[24px] hidden md:flex items-center justify-between px-[16px] py-[20px] '
          }
          style={{ boxShadow: '0px 8px 24px -4px rgba(0, 0, 0, 0.08), 0px 8px 8px -4px rgba(0, 0, 0, 0.03)' }}
        >
          <button
            ref={locationRef}
            className={
              'flex items-center justify-between gap-[12px] p-[12px] w-[calc((100%-126px)/3)] flex-1 truncate ' +
              'disabled:opacity-50 ' +
              'disabled:cursor-not-allowed'
            }
            onClick={handleOpenSelectLocation}
            disabled={locations.length === 0 || locations.length === 1}
          >
            <span className={'font-inter-500 text-16-20 text-neutral-900 text-left truncate min-w-0'}>
              {renderTextLocations()}
            </span>
            <span className={'min-w-[16px]'}>
              <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
            </span>
          </button>

          <div className={'w-[1px] h-full bg-neutral-300'} />

          <button
            ref={dateRef}
            className={'flex items-center justify-between gap-[12px] p-[12px] w-[calc((100%-126px)/3)]'}
            onClick={() => handleOpenDatePicker('startDate')}
          >
            <span className={'font-inter-500 text-16-20 text-neutral-900 text-left truncate'}>{renderDates()}</span>
            <span className={'min-w-[16px]'}>
              <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
            </span>
          </button>

          <div className={'w-[1px] h-full bg-neutral-300'} />

          <button
            ref={guestRef}
            className={'flex items-center justify-between gap-[12px] p-[12px] w-[calc((100%-126px)/3)]'}
            onClick={handleOpenSelectGuest}
          >
            <span className={'font-inter-500 text-16-20 text-neutral-900 text-left'}>{renderGuests()}</span>
            <span className={'min-w-[16px]'}>
              <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
            </span>
          </button>

          <div className={'min:w-[124px]'}>
            <button
              className={
                'bg-neutral-900 rounded-[16px] font-inter-500 md:text-14-18 lg:text-16-20 text-white px-[24px] h-[48px] flex items-center justify-center w-full hover:opacity-90 ' +
                'relative ' +
                'active:after:top-[-4px] active:after:right-[-4px] active:after:bottom-[-4px] active:after:left-[-4px] ' +
                'active:after:border-[2px] active:after:rounded-[16px] ' +
                'active:after:border-neutral-900 ' +
                'active:after:content-[""] active:after:box-content active:after:bg-none active:after:absolute'
              }
              onClick={handleBookNow}
            >
              Book now
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {isInHeader ? renderSearchBarInHeader() : renderSearchBarInHeroSection()}

      <SelectLocations
        hostID={hostID}
        anchorElement={anchorSelectLocation}
        transformOrigin={{ vertical: isInHeader ? -12 : -32, horizontal: isInHeader ? 0 : 16 }}
      />

      <SelectDatesV2
        anchorElement={anchorDatePicker}
        transformOrigin={{ vertical: isInHeader ? -12 : -32, horizontal: 'left' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onSaveDates={handleSaveDates}
      />
      <SelectDatesMobileV2 isShowBottom={true} onSaveDates={handleSaveDates} />

      <SelectGuestsV2
        anchorElement={anchorSelectGuest}
        transformOrigin={{ vertical: isInHeader ? -12 : -32, horizontal: 'right' }}
        personCapacity={50}
        pmsType={businessInfor?.pmsType}
        allowZeroAdult={true}
        onSaveGuest={handleSaveGuest}
        maxPet={100}
      />
    </>
  )
}

export default LandingSearchBar
