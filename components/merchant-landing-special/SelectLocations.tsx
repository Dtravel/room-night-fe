import React, { useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import { getLocationList } from '@dtravel/helpers/api/property'
import { useAppSelector } from '@dtravel/redux/hooks'
import Image from 'next/image'
import ic_close_md from '@dtravel/assets/icons/ic_close_md.svg'
import ic_checked_2 from '@dtravel/assets/icons/ic_checked_2.svg'
import {
  setAnchorSelectLocation,
  setIsOpenSelectLocationDesktop,
  setIsOpenSelectLocationMobile,
  setLocations,
  setSelectedLocations,
} from '@dtravel/redux/slices/common'
import { useDispatch } from 'react-redux'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import { useRouter } from 'next/router'
import useTheme from '../../helpers/hooks/useTheme'

interface Props {
  hostID: string
  transformOrigin?: any
  anchorOrigin?: any
  anchorElement: HTMLElement | null
}

const SelectLocations: React.FC<Props> = ({ hostID, transformOrigin, anchorOrigin, anchorElement }) => {
  const dispatch = useDispatch()
  const { color } = useTheme()
  const router = useRouter()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isOpenSelectLocationDesktop, isOpenSelectLocationMobile, selectedLocations, locations } = useAppSelector(
    (state) => state.common
  )

  const parseLocationsFromQuery = (queryParams: any) => {
    const { locations } = queryParams
    if (locations && typeof locations === 'string') {
      dispatch(setSelectedLocations([locations]))
    } else if (Array.isArray(locations)) {
      dispatch(setSelectedLocations([...locations]))
    } else {
      dispatch(setSelectedLocations([]))
    }
  }

  // fetch locations by host id
  useEffect(() => {
    async function fetchLocationList() {
      try {
        const res: any = await getLocationList(hostID)
        if (Array.isArray(res.data)) {
          dispatch(setLocations(res.data))
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (hostID) fetchLocationList()
    // eslint-disable-next-line
  }, [hostID])

  useEffect(() => {
    parseLocationsFromQuery(router.query)
    // eslint-disable-next-line
  }, [router.query])

  useEffect(() => {
    setAnchorEl(isOpenSelectLocationDesktop ? anchorElement : null)
  }, [isOpenSelectLocationDesktop, anchorElement])

  const handleClose = () => {
    setAnchorEl(null)
    dispatch(setAnchorSelectLocation(null))
    dispatch(setIsOpenSelectLocationDesktop(false))
    dispatch(setIsOpenSelectLocationMobile(false))
    // reset selected locations
    parseLocationsFromQuery(router.query)
  }

  const joinCityAndCountry = (city: string, country: string) => {
    return [city, country].join(', ')
  }

  const handleSelectLocation = (city: string, country: string) => {
    const cityAndCountry = joinCityAndCountry(city, country)
    if (selectedLocations.includes(cityAndCountry)) {
      dispatch(setSelectedLocations(selectedLocations.filter((item: string) => item !== cityAndCountry)))
    } else {
      dispatch(setSelectedLocations([...selectedLocations, cityAndCountry]))
    }
  }

  const handleApply = () => {
    handleClose()
    const queryObj: any = { ...router.query, locations: selectedLocations }
    router.push(
      {
        pathname: router.pathname,
        query: queryObj,
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  const handleClear = () => {
    const queryObj: any = { ...router.query }
    delete queryObj.locations
    router.push(
      {
        pathname: router.pathname,
        query: queryObj,
      },
      undefined,
      { scroll: false, shallow: true }
    )
    dispatch(setSelectedLocations([]))
  }

  const open = Boolean(anchorEl)
  const hasSelected = selectedLocations.length > 0

  const renderContent = () => {
    return (
      <div className={''}>
        {/*---Header---*/}
        <div className={'hidden md:flex  justify-between items-center h-[64px] pl-[24px] pr-[14px]'}>
          <span className={'font-inter-500 text-neutral-900 text-16-20 md:text-16-20'}>
            {hasSelected
              ? `${selectedLocations.length} ${selectedLocations.length > 1 ? 'locations' : 'location'} selected`
              : 'Select locations'}
          </span>
          <button
            className={'w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-neutral-200'}
            onClick={handleClose}
          >
            <Image src={ic_close_md} width={20} height={20} alt="" />
          </button>
        </div>
        <div className={'h-[1px] bg-[#E9E9E4] md:mx-[-24px] hidden md:block'} />

        {/*---Body---*/}
        <div className={'max-h-[414px] overflow-y-auto md:px-[24px] hidden hidden-scroll-bar'}>
          {Array.isArray(locations) &&
            locations.map((item, index) => {
              const isLastItem = index === locations.length - 1
              return (
                <button
                  key={`location_${index}`}
                  className={`w-full flex justify-between items-center h-[64px] border-[#E5E5E0] ${isLastItem ? '' : 'border-b'
                    }`}
                  onClick={() => handleSelectLocation(item.city, item.country)}
                >
                  <span className={'font-inter-500 text-14-18 text-neutral-900 flex h-[24px] items-center'}>
                    {joinCityAndCountry(item.city, item.country)}
                  </span>
                  {selectedLocations.includes(joinCityAndCountry(item.city, item.country)) && (
                    <Image src={ic_checked_2} width={20} height={20} alt="" />
                  )}
                </button>
              )
            })}
        </div>

        <div className={'h-[1px] bg-[#E9E9E4] mx-[-16px] md:mx-[-24px]'} />

        {/*---Footer---*/}
        <div className={'flex justify-between items-center gap-[12px] h-[80px] md:h-[76px] md:px-[24px]'}>
          <button
            className={
              'bg-white font-inter-500 text-neutral-900 flex items-center justify-center ' +
              'h-[56px] md:h-[40px] ' +
              'rounded-[16px] md:rounded-[12px] ' +
              'text-16-20 md:text-14-18 ' +
              'w-1/3 md:w-auto ' +
              'border border-neutral-300 md:border-none ' +
              'md:active:underline ' +
              'md:disabled:active:no-underline ' +
              'disabled:opacity-50 ' +
              'disabled:cursor-not-allowed'
            }
            // disabled={!hasSelected}
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className={
              'bg-neutral-900 font-inter-500 text-white px-[16px] flex items-center justify-center ' +
              'h-[56px] md:h-[40px] ' +
              'rounded-[16px] md:rounded-[12px] ' +
              'text-16-20 md:text-14-18 ' +
              'w-2/3 md:w-auto ' +
              'disabled:opacity-50 ' +
              'disabled:cursor-not-allowed'
            }
            // disabled={!hasSelected}
            onClick={handleApply}
            style={color ? { backgroundColor: color } : {}}
          >
            Apply
          </button>
        </div>
      </div>
    )
  }

  const swipeTitle = hasSelected
    ? `${selectedLocations.length} ${selectedLocations.length > 1 ? 'locations' : 'location'} selected`
    : 'Select locations'

  if (isMobile) {
    return (
      <BasicSwipeDrawer
        isOpen={isOpenSelectLocationMobile}
        onClose={handleClose}
        title={swipeTitle}
        bodyStyle={{ padding: '0 16px' }}
      >
        {renderContent()}
      </BasicSwipeDrawer>
    )
  }

  return (
    <Popover
      id={'select-locations'}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={
        anchorOrigin
          ? { ...anchorOrigin }
          : {
            vertical: 'bottom',
            horizontal: 'left',
          }
      }
      transformOrigin={
        transformOrigin
          ? { ...transformOrigin }
          : {
            horizontal: 'left',
          }
      }
      sx={{
        '& .MuiPaper-root': {
          width: '400px',
          height: 'auto',
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.16)',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          padding: '0',
        },
      }}
    >
      {renderContent()}
    </Popover>
  )
}

export default SelectLocations
