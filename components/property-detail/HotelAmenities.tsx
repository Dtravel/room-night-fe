import React, { useEffect, useState } from 'react'
import { Amenity } from '@dtravel/helpers/interfaces/property'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import DetailCard from '@dtravel/components/property-detail/DetailCard'
import BasicButton from '@dtravel/components/ui/BasicButton'
import BasicPopup from '@dtravel/components/ui/BasicPopup'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import { removeDuplicate } from '@dtravel/helpers/utils/common'

interface Props {
  amenities: Amenity[]
}

const HotelAmenities: React.FC<Props> = ({ amenities }) => {
  const isMounted = useMounted()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [groupAmenity, setGroupAmenity] = useState<any>()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024
  const amenitiesFiltered = removeDuplicate(amenities)

  useEffect(() => {
    if (Array.isArray(amenities)) {
      let categories: any = {}
      for (let amenity of amenities) {
        if (Object.prototype.hasOwnProperty.call(categories, amenity.category)) {
          //rest of the code
          categories[amenity.category].push(amenity)
        } else {
          categories[amenity.category] = [amenity]
        }
      }
      setGroupAmenity(categories)
    } // eslint-disable-next-line
  }, [JSON.stringify(amenities)])

  const handleOpenPopup = () => {
    setIsOpen(true)
  }

  const handleClosePopup = () => {
    setIsOpen(false)
  }

  const renderContent = () => (
    <div className={'grid grid-cols-1'}>
      {Object.keys(groupAmenity).map((key, groupIndex) => {
        return (
          <div key={key}>
            <p className={`${groupIndex === 0 ? '' : 'pt-4'} font-inter-500 text-16-24 md:text-20-32 text-neutral-700`}>
              {key}
            </p>
            {groupAmenity[key].map((amenity: any, index: number) => {
              return (
                <div
                  className={`py-[16px] font-inter-400 text-16-20 text-neutral-600 ${
                    index === groupAmenity[key].length - 1 ? '' : 'border-b border-solid border-neutral-300'
                  }`}
                  key={amenity.id + '_' + index}
                >
                  {amenity.name}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )

  if (!isMounted) {
    return null
  }

  return (
    <DetailCard title={'Amenities'}>
      <div className={'flex flex-col lg:grid lg:grid-cols-3 gap-[16px]'}>
        {amenitiesFiltered.slice(0, isMobile ? 5 : 9).map((amenity) => (
          <div key={amenity.id} className={'font-inter-400 text-16-20 text-neutral-900 '}>
            {amenity.name}
          </div>
        ))}
      </div>

      {amenitiesFiltered.length > (isMobile ? 5 : 9) && (
        <div className={'mt-[32px] md:mt-[24px]'}>
          <BasicButton variant={'outlined'} clases={'w-full lg:w-auto'} onClick={handleOpenPopup}>
            Show all amenities
          </BasicButton>
        </div>
      )}

      {isMobile ? (
        <BasicSwipeDrawer isOpen={isOpen} onClose={handleClosePopup} title={'Amenities'} titleAlign={'center'}>
          {renderContent()}
        </BasicSwipeDrawer>
      ) : (
        <BasicPopup isOpen={isOpen} onClose={handleClosePopup} title={'Amenities'} maxWidth={'md'}>
          {renderContent()}
        </BasicPopup>
      )}
    </DetailCard>
  )
}

export default HotelAmenities
