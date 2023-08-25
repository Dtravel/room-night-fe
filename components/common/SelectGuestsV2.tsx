import SelectGuestItem from '@dtravel/components/property-detail/SelectGuestItem'
import { GUEST_TYPE } from '@dtravel/helpers/constants/constants'
import { useAppSelector } from '@dtravel/redux/hooks'
import Popover from '@mui/material/Popover'
import React, { useEffect, useState } from 'react'
import {
  setDatePickerFocusedId,
  setIsOpenSelectGuestDesktop,
  setIsOpenSelectGuestMobile,
} from '@dtravel/redux/slices/common'
import { useDispatch } from 'react-redux'
import { setAdults, setChildren, setInfants, setPets } from '@dtravel/redux/slices/property'
import { useRouter } from 'next/router'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import Image from 'next/image'
import ic_close_md from '@dtravel/assets/icons/ic_close_md.svg'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  personCapacity: number
  loading?: boolean
  anchorElement: HTMLElement | null
  transformOrigin?: any
  anchorOrigin?: any
  pmsType?: string
  // eslint-disable-next-line no-unused-vars
  afterGuestChange?: (_: any) => void
  // eslint-disable-next-line no-unused-vars
  onSaveGuest?: (_: any) => void
  allowZeroAdult?: boolean
  maxPet?: number | null
  isShowMaximumCapacityInfo?: boolean
}

const SelectGuestsV2 = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    personCapacity,
    anchorElement,
    allowZeroAdult,
    transformOrigin,
    anchorOrigin,
    afterGuestChange,
    onSaveGuest,
    maxPet,
    isShowMaximumCapacityInfo,
  } = props
  const { isOpenSelectGuestDesktop, isOpenSelectGuestMobile } = useAppSelector((state) => state.common)
  const { adults, children, infants, pets } = useAppSelector((state) => state.property)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { color } = useTheme()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768

  const parseGuestFromQuery = (queryParams: any, allowZeroAdult?: boolean) => {
    const { adults, children, infants, pets } = router.query
    if (adults && parseInt(String(adults)) > 0) {
      dispatch(setAdults(parseInt(String(adults))))
    } else {
      dispatch(setAdults(allowZeroAdult ? 0 : 1))
    }
    if (children && parseInt(String(children)) > 0) {
      dispatch(setChildren(parseInt(String(children))))
    } else {
      dispatch(setChildren(0))
    }
    if (infants && parseInt(String(infants)) > 0) {
      dispatch(setInfants(parseInt(String(infants))))
    } else {
      dispatch(setInfants(0))
    }
    if (pets && parseInt(String(pets)) > 0) {
      dispatch(setPets(parseInt(String(pets))))
    } else {
      dispatch(setPets(0))
    }
  }

  useEffect(() => {
    dispatch(setDatePickerFocusedId(null))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    parseGuestFromQuery(router.query, allowZeroAdult)
    // eslint-disable-next-line
  }, [router.query, allowZeroAdult])

  useEffect(() => {
    setAnchorEl(isOpenSelectGuestDesktop ? anchorElement : null)
  }, [isOpenSelectGuestDesktop, anchorElement])

  const handleClose = (ignoreParse?: boolean) => {
    setAnchorEl(null)
    dispatch(setIsOpenSelectGuestDesktop(false))
    dispatch(setIsOpenSelectGuestMobile(false))

    if (!ignoreParse) {
      // reset selected guest
      parseGuestFromQuery(router.query, allowZeroAdult)
    }
  }

  const handleApply = () => {
    if (typeof onSaveGuest === 'function') {
      onSaveGuest({ adults, children, infants, pets })
    } else {
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
    handleClose(true)
  }

  const handleClear = () => {
    dispatch(setAdults(0))
    dispatch(setChildren(0))
    dispatch(setInfants(0))
    dispatch(setPets(0))
    const queryObj: any = { ...router.query }
    delete queryObj.adults
    delete queryObj.children
    delete queryObj.infants
    delete queryObj.pets
    router.push(
      {
        pathname: router.pathname,
        query: queryObj,
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover-guest' : undefined

  const countGuest = () => adults + children + infants

  const renderContent = () => {
    return (
      <>
        <div className={'hidden md:flex justify-between items-center h-[64px] px-[24px]'}>
          <span className={'font-inter-500 text-grayscale-900 text-16-20 md:text-16-20'}>
            {countGuest() > 0 ? `${countGuest()} ${countGuest() > 1 ? 'Guests' : 'Guest'} selected` : 'Select guest'}
          </span>
          <button
            className={'w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-grayscale-300'}
            onClick={() => handleClose()}
          >
            <Image src={ic_close_md} width={20} height={20} alt="" />
          </button>
        </div>
        <div className={'h-[1px] bg-[#E9E9E4] hidden md:block'} />
        <div className={'px-[24px] py-[16px]'}>
          {GUEST_TYPE.map((type, index) => {
            return (
              <SelectGuestItem
                key={type}
                type={type}
                hasBorderBot={index !== GUEST_TYPE.length - 1 || isShowMaximumCapacityInfo}
                pt={index === 0 ? 0 : 16}
                pb={index !== GUEST_TYPE.length - 1 || isShowMaximumCapacityInfo ? 16 : 0}
                personCapacity={personCapacity}
                afterGuestChange={afterGuestChange}
                allowZeroAdult={allowZeroAdult}
                isMerchantPage
                maxPet={maxPet}
              />
            )
          })}
          {isShowMaximumCapacityInfo && (
            <div className={`flex justify-between items-center`} style={{ paddingTop: 16, paddingBottom: 0 }}>
              <p className={'font-inter-400 text-14-18 text-neutral-600'}>
                This listing has a maximum of {personCapacity > 16 ? '16+' : personCapacity} {personCapacity > 1 ? 'guests' : 'guest'}, not including
                infants. Pets are {maxPet ? 'allowed' : 'not allowed'}.
              </p>
            </div>
          )}
        </div>

        <div className={'h-[1px] bg-[#E9E9E4] '} />
        {/*---Footer---*/}
        <div className={'flex justify-between items-center h-[80px] md:h-[76px] px-[24px] gap-[12px]'}>
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
            disabled={countGuest() <= 0}
            onClick={handleClear}
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
            disabled={countGuest() <= 0}
            onClick={handleApply}
            style={color ? { backgroundColor: color } : {}}
          >
            Apply
          </button>
        </div>
      </>
    )
  }

  const swipeTitle =
    countGuest() > 0 ? `${countGuest()} ${countGuest() > 1 ? 'Guests' : 'Guest'} selected` : 'Select guest'

  if (isMobile) {
    return (
      <BasicSwipeDrawer
        isOpen={isOpenSelectGuestMobile}
        onClose={() => handleClose()}
        title={swipeTitle}
        bodyStyle={{ padding: '0 0 0 0' }}
      >
        {renderContent()}
      </BasicSwipeDrawer>
    )
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => handleClose()}
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
            vertical: -8,
            horizontal: 'right',
          }
      }
      sx={{
        '& .MuiPaper-root': {
          width: '400px',
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2)',
          borderRadius: '24px',
          backgroundColor: '#FFFFFF',
          padding: '0',
        },
      }}
    >
      {renderContent()}
    </Popover>
  )
}

export default SelectGuestsV2
