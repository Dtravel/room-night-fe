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
import ic_arrow_right_white from '@dtravel/assets/icons/ic_arrow_right_white.svg'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { IconCalendar, IconLocation, IconUsers } from '@dtravel/components/common/Icons'
import BasicButton from '@dtravel/components/ui/BasicButton'
import LandingGetInTouch from './LandingGetInTouch'

interface Props { }

const LandingSearchBarSpecial: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const { color } = useTheme()
  const router = useRouter()
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

  const handleOpenSelectGuest = () => {
    if (isMobile) {
      dispatch(setIsOpenSelectGuestMobile(true))
    } else {
      dispatch(setAnchorSelectGuest(guestRef.current))
      dispatch(setIsOpenSelectGuestDesktop(true))
    }
  }

  const handleOpenSelectLocation = () => {
    if (isMobile) {
      dispatch(setIsOpenSelectLocationMobile(true))
    } else {
      dispatch(setAnchorSelectLocation(locationRef.current))
      dispatch(setIsOpenSelectLocationDesktop(true))
    }
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
      // const stringify = queryString.stringify(queryObj, { skipNull: true, skipEmptyString: true })
      // window.open(
      //   hostId
      //     ? `/${hostId}/property/${stringify ? `?${stringify}` : ''}`
      //     : `/property${stringify ? `?${stringify}` : ''}`,
      //   '_blank'
      // )
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

  const renderSearchBarInHeroSection = () => {
    return (
      <>
        {/*---In hero image, only show on DESKTOP---*/}
        <div className={'w-full flex flex-col gap-3'}>
          <button
            ref={locationRef}
            className={
              'h-[56px] flex items-center justify-between w-full p-[16px] rounded-[12px] border-[0.5px] border-[#00000026] truncate ' +
              'disabled:opacity-50 ' +
              'disabled:cursor-not-allowed'
            }
            onClick={handleOpenSelectLocation}
            disabled={locations.length === 0 || locations.length === 1}
          >
            <div
              className={'flex items-center font-inter-500 text-16-20 text-grayscale-900 text-left truncate min-w-0'}
            >
              <div className="min-w-[20px]">
                <IconLocation color={color} />
              </div>
              &nbsp;
              <span className="truncate">{renderTextLocations()}</span>
            </div>
            <span className={'min-w-[16px] ml-[8px]'}>
              <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
            </span>
          </button>

          <button
            ref={dateRef}
            className={
              'h-[56px] flex items-center justify-between w-full p-[16px] rounded-[12px] border-[0.5px] border-[#00000026]'
            }
            onClick={() => handleOpenDatePicker('startDate')}
          >
            <div className={'flex items-center font-inter-500 text-16-20 text-grayscale-900 text-left truncate'}>
              <div className="min-w-[20px]">
                <IconCalendar color={color} />
              </div>
              &nbsp;
              {renderDates()}
            </div>
            <span className={'min-w-[16px] ml-[8px]'}>
              <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
            </span>
          </button>

          <button
            ref={guestRef}
            className={
              'h-[56px] flex items-center justify-between w-full p-[16px] rounded-[12px] border-[0.5px] border-[#00000026]'
            }
            onClick={handleOpenSelectGuest}
          >
            <div className={'flex items-center font-inter-500 text-16-20 text-grayscale-900 text-left'}>
              <div className="min-w-[20px]">
                <IconUsers color={color} />
              </div>
              &nbsp;
              {renderGuests()}
            </div>
            <span className={'min-w-[16px] ml-[8px]'}>
              <Image src={ic_chevron_down_16x16} width={16} height={16} alt={'ic_chevron_down'} />
            </span>
          </button>
          <div className='w-full mt-5 flex flex-col lg:flex-row items-center gap-2'>
            <div className={'w-full lg:w-1/2'}>
              <BasicButton variant={'contained'} size={'xxl'} clases={'w-full'} onClick={handleBookNow}>
                <span>Explore properties</span>
                <Image src={ic_arrow_right_white} alt="" width={20} height={20} className="ml-[4px]" />
              </BasicButton>
            </div>
            <LandingGetInTouch />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {renderSearchBarInHeroSection()}

      <SelectLocations
        hostID={hostID}
        anchorElement={anchorSelectLocation}
        transformOrigin={{ vertical: -8, horizontal: 0 }}
      />

      <SelectDatesV2
        anchorElement={anchorDatePicker}
        transformOrigin={{ vertical: -8, horizontal: 'left' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onSaveDates={handleSaveDates}
      />
      <SelectDatesMobileV2 isShowBottom={true} onSaveDates={handleSaveDates} />

      <SelectGuestsV2
        anchorElement={anchorSelectGuest}
        transformOrigin={{ vertical: -8, horizontal: 'left' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        personCapacity={50}
        pmsType={businessInfor?.pmsType}
        allowZeroAdult={true}
        onSaveGuest={handleSaveGuest}
        maxPet={100}
      />
    </>
  )
}

export default LandingSearchBarSpecial
