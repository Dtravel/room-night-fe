import DetailCard from '@dtravel/components/property-detail/DetailCard'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import { PropertyRoom } from '@dtravel/helpers/interfaces'
import { Address } from '@dtravel/helpers/interfaces/property'
import { isEmpty } from '@dtravel/utils/common'
import IconButton from '@mui/material/IconButton'
import React, { useEffect, useRef, useState } from 'react'
import { PMS } from '@dtravel/helpers/constants/constants'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import { IconBathrooms, IconBed } from '@dtravel/components/common/Icons'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import ic_arrow_left_small from '@dtravel/assets/icons/ic_arrow_left_small.svg'
import Image from 'next/image'
import clsx from 'clsx'
interface Props {
  internalName: string
  externalName: string
  propertyRooms: PropertyRoom[]
  address: Address
  pmsType: string
  personCapacity: number
  bedrooms: number
  beds: number
  bathrooms: number
  livingrooms?: number
  kitchens?: number
  bathroomTypes?: any[]
}

const SpaceDetails: React.FC<Props> = ({ propertyRooms, pmsType, personCapacity, bedrooms, beds, bathrooms, livingrooms, kitchens, bathroomTypes }) => {
  const roomRef = useRef<HTMLDivElement>(null)
  const isMounted = useMounted()
  const { color } = useTheme()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024
  // const [scrollLeft, setScrollLeft] = useState<number>(0)
  const [uplistingGroupBed, setUplistingGroupBed] = useState<any>({})
  // const [scrollWidth, setScrollWidth] = useState<number>(0)
  // const [offsetWidth, setOffsetWidth] = useState<number>(0)
  // const scrollWidth = 0
  // const offsetWidth = 0
  const [isLeftActive, setLeftActive] = useState<boolean>(false)
  const [isRightActive, setRightActive] = useState<boolean>(true)
  const [isDisabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (pmsType === PMS.UPLISTING && Array.isArray(propertyRooms) && propertyRooms.length > 0) {
      let groupBed: any = {}
      for (let room of propertyRooms) {
        const bedTypes = room.bedTypes
        for (let bed of bedTypes) {
          if (Object.prototype.hasOwnProperty.call(groupBed, bed.name)) {
            groupBed[bed.name] = groupBed[bed.name] + 1
          } else {
            groupBed[bed.name] = 1
          }
        }
      }
      setUplistingGroupBed(groupBed)
    }
  }, [propertyRooms, pmsType])

  // useLayoutEffect(() => {
  //   if (roomRef.current) {
  //     console.log('---propertyRooms--', propertyRooms)
  //     console.log('--scrollWidth--', roomRef.current.scrollWidth)
  //     console.log('--offsetWidth--', roomRef.current.offsetWidth)
  //     setScrollWidth(roomRef.current.scrollWidth)
  //     setOffsetWidth(roomRef.current.offsetWidth)
  //   }
  // }, [propertyRooms])
  const checkScroll = () => {
    if (typeof window === 'undefined') return
    const el = roomRef.current as HTMLDivElement
    if (el) {
      if (el.scrollLeft <= 0) {
        if (isLeftActive) setLeftActive(false)
        if (!isRightActive) setRightActive(true)
      } else if (el.scrollLeft + el.offsetWidth + 4 >= el.scrollWidth) {
        if (!isLeftActive) setLeftActive(true)
        if (isRightActive) setRightActive(false)
      } else {
        if (!isLeftActive) setLeftActive(true)
        if (!isRightActive) setRightActive(true)
      }
    }
  }
  const handleScrollLeft = () => {
    if (isDisabled) return;
    const el = roomRef.current as HTMLDivElement
    if (el) {
      setDisabled(true)
      const value = el.getBoundingClientRect()?.width + 16
      el.scrollLeft -= value
      checkScroll()
      setTimeout(() => {
        setDisabled(false)
      }, 500);
    }
  }
  const handleScrollRight = () => {
    if (isDisabled) return;
    const el = roomRef.current as HTMLDivElement
    if (el) {
      setDisabled(true)
      const value = el.getBoundingClientRect()?.width + 16
      el.scrollLeft += value
      checkScroll()
      setTimeout(() => {
        setDisabled(false)
      }, 500);
    }
  }

  // const handleClickNextPrev = (type: 'next' | 'prev') => () => {
  //   const element = roomRef.current as HTMLDivElement
  //   const currentoOffsetWidth = element.offsetWidth
  //   if (type === 'prev') {
  //     setScrollLeft((prevState) => {
  //       element.scrollLeft = prevState - currentoOffsetWidth
  //       return prevState - currentoOffsetWidth
  //     })
  //   } else {
  //     setScrollLeft((prevState) => {
  //       element.scrollLeft = prevState + currentoOffsetWidth
  //       return prevState + currentoOffsetWidth
  //     })
  //   }
  // }

  const convertBedName = (bed: string, count: number) => {
    return (
      bed.replaceAll('_', ' ') + (bed.includes('bed') || bed.includes('beds') ? '' : `${count > 1 ? ' bed' : ' bed'}`)
    )
  }

  if (isEmpty(propertyRooms) || !isMounted) return null
  const renderBedInfo = () => {
    let result: Array<string> = []
    if (bedrooms > 0) result.push(`${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`)
    if (beds > 0) result.push(`${beds} bed${beds > 1 ? 's' : ''}`)
    if (bathrooms > 0) result.push(`${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}`)
    if (Number(livingrooms || 0) > 0) result.push(`${Number(livingrooms || 0)} living room${Number(livingrooms || 0) > 1 ? 's' : ''}`)
    if (Number(kitchens || 0) > 0) result.push(`${kitchens} kitchen${Number(kitchens || 0) > 1 ? 's' : ''}`)
    return result.join(', ')
  }

  if (pmsType === PMS.UPLISTING) {
    return (
      <DetailCard title={'Space details'}>
        <div className={'rounded-[16px]'}>
          <p className={'font-inter-400 text-16-20 text-neutral-900 mb-[8px]'}>{renderBedInfo()}</p>
          <p className={'font-inter-400 text-16-20 text-neutral-900 mt-[32px] first-letter:capitalize'}>
            {Object.keys(uplistingGroupBed).map((bed, index) => {
              const name = convertBedName(bed, Number(uplistingGroupBed[bed]))?.toLowerCase()
              const nameShow = name[0].toUpperCase() + name.slice(1)
              return (
                <span key={bed}>
                  {index !== 0 ? ', ' : ''}
                  {nameShow} ({uplistingGroupBed[bed]})
                </span>
              )
            })}
          </p>
        </div>
      </DetailCard>
    )
  }
  const rooms = [...(propertyRooms || []), ...(bathroomTypes || [])]

  return (
    <DetailCard title={'Space details'}>
      <p className={'font-inter-400 text-16-20 text-neutral-900 mb-[8px]'}>{renderBedInfo()}</p>
      {!isEmpty(rooms) && (
        <div className={'w-full relative mt-[32px]'}>
          {rooms.length > 3 && !isMobile && (
            <>
              {isLeftActive && (
                <IconButton
                  sx={{
                    '&.MuiIconButton-root': {
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      left: -20,
                      zIndex: 1,
                      border: '1px solid #E3E3DE',
                      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                      backgroundColor: '#FFF',
                      width: 48,
                      height: 48
                    },
                  }}
                  onClick={handleScrollLeft}
                >
                  <Image src={ic_arrow_left_small} width={24} height={24} alt="" />
                </IconButton>
              )}

              {isRightActive && (
                <IconButton
                  sx={{
                    '&.MuiIconButton-root': {
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      right: -20,
                      zIndex: 1,
                      border: '1px solid #E3E3DE',
                      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                      backgroundColor: '#FFF',
                      width: 48,
                      height: 48
                    },
                  }}
                  onClick={handleScrollRight}
                >
                  <Image src={ic_arrow_left_small} width={24} height={24} alt="" className="rotate-180" />
                </IconButton>
              )}
            </>
          )}

          <div
            // className={'flex gap-[16px] overflow-x-auto hidden-scroll-bar max-w-[785px]'}
            className={clsx(
              'mx-[-16px] px-4 md:mx-[-24px] md:px-6 lg:mx-0 lg:px-0',
              'w-[calc(100%_+_32px)] md:w-[calc(100%_+_48px)] lg:w-full flex gap-[16px] overflow-x-auto hidden-scroll-bar'
            )}
            ref={roomRef}
            onScroll={() => checkScroll()}
          >
            {rooms.map((item: any, idx: number) => {
              const isBathroom = idx >= propertyRooms.length
              return (
                <div
                  key={item.id}
                  // className={
                  //   'border border-solid border-neutral-300 rounded-[16px] p-[24px] h-[126px] lg:h-[180px] min-w-[230px] lg:min-w-[calc(100%/3-16px)]'
                  // }
                  className={clsx(
                    `flex flex-col justify-between relative`,
                    'border border-solid border-neutral-300 rounded-[16px] p-[24px] h-[126px] lg:h-[180px]',
                    'w-[calc(100%_-_16px)] min-w-[calc(100%_-_16px)] md:w-[calc(50%_-_16px)] md:min-w-[calc(50%_-_16px)] lg:w-[calc(100%/3_-_10.67px)] lg:min-w-[calc(100%/3_-_10.67px)]'
                  )}

                >
                  <p className={'font-inter-600 text-10-12 text-neutral-900 tracking-[0.04em] uppercase'}>
                    {isBathroom ? `Bathroom ${idx - propertyRooms.length + 1}` :
                      <>
                        {item.name === 'Bedroom 0' || item.name?.toLowerCase() === 'Bedroom 0'.toLowerCase()
                          ? 'Common space'
                          : item.name}
                      </>
                    }
                  </p>
                  <div className={'w-[22px] h-[21px] lg:w-[41px] lg:h-[40px] mt-[12px] lg:mt-[48px]'}>
                    {isBathroom ?
                      <IconBathrooms color={color} width={isMobile ? 22 : 40} height={isMobile ? 22 : 40} /> :
                      <IconBed color={color} width={isMobile ? 22 : 40} height={isMobile ? 22 : 40} />
                    }
                  </div>

                  {isBathroom && <p
                    className={
                      'mt-[12px] font-inter-400 text-16-18 text-neutral-900 line-clamp-1 first-letter:capitalize'
                    }
                  >
                    {item.name}
                  </p>
                  }
                  {Array.isArray(item.bedTypes) && item.bedTypes.length > 0 && (
                    <p
                      className={
                        'mt-[12px] font-inter-400 text-16-18 text-neutral-900 line-clamp-1 first-letter:capitalize'
                      }
                    >
                      {(item.bedTypes || []).map((bed: any, index: number) => {
                        const name = bed?.name?.toLowerCase()
                        const nameShow = name[0].toUpperCase() + name.slice(1)
                        return (
                          <React.Fragment key={'bed_' + index}>
                            {index !== 0 ? ', ' : ''}
                            {nameShow} {`${bed.quantity ? `(${bed.quantity})` : ''}`}
                          </React.Fragment>
                        )
                      })}
                    </p>
                  )}
                </div>
              )
            })}
            <div className={'min-w-[249px] p-[24px] hidden lg:block'} />
          </div>
        </div>
      )}
    </DetailCard>
  )
}

export default SpaceDetails
