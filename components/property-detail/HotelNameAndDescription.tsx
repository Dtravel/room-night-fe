import ViewMoreContent from '@dtravel/components/common/ViewMoreContent'
import { capitalizeLetter } from '@dtravel/helpers/utils/common'
import { isEmpty } from '@dtravel/utils/common'
import React from 'react'

interface Props {
  internalName: string
  externalName: string
  description: string
  personCapacity: number
  bedrooms: number
  beds: number
  bathrooms: number
  propertyType: any
  propertyTypeName: string
  address: any
  roomType: string
  squareMeters?: string
  squareType?: string
}

const HotelNameAndDescription: React.FC<Props> = ({
  externalName,
  description,
  personCapacity,
  bedrooms,
  beds,
  bathrooms,
  propertyType,
  propertyTypeName,
  address,
  roomType,
  squareMeters,
  squareType
}) => {
  const renderInfo = () => {
    let result: string[] = []
    if (!isEmpty(squareMeters)) result.push(`${squareMeters} ${squareType === 'feet' ? 'ft²' : 'm²'}`)
    if (!isEmpty(roomType)) result.push(capitalizeLetter(roomType.split('_').join(' ')))
    if (personCapacity > 0) result.push(`${personCapacity > 16 ? 'Over 16' : personCapacity} guest${personCapacity > 1 ? 's' : ''}`)
    if (bedrooms > 0) result.push(`${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`)
    if (beds > 0) result.push(`${beds} bed${beds > 1 ? 's' : ''}`)
    if (bathrooms > 0) result.push(`${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}`)
    return result.join(' • ')
  }
  return (
    <div className={'pb-[24px] lg:pb-[48px] md:border-b border-solid border-neutral-300'}>
      {(propertyTypeName || propertyType?.name) && (
        <p
          className={
            'font-inter-600 text-neutral-900 tracking-[0.04em] text-10-12 md:text-12-16 uppercase mb-[8px] md:mb-[12px] pl-[2px] md:pl-0'
          }
        >
          {propertyTypeName || propertyType?.name} in {address?.city || address?.state || address?.country}
        </p>
      )}
      <p
        className={
          'text-32-32 md:text-40-40 mb-[8px] md:mb-[12px] font-inter-600 text-neutral-900 tracking-[0.02em] break-words'
        }
      >
        {externalName}
      </p>
      <p className={'font-inter-400 text-14-18 md:text-16-20 text-neutral-900 mb-[16px] md:mb-[24px] pl-[2px] md:pl-0'}>
        {renderInfo()}
      </p>

      {/*<ViewMoreContent content={description} numberOfLine={5} />*/}
      <ViewMoreContent content={description} numberOfLine={10} />
    </div>
  )
}

export default HotelNameAndDescription
