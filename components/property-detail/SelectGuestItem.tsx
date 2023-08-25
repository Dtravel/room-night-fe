import React, { useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import ic_minus from '@dtravel/assets/icons/ic_minus.svg'
import ic_plus from '@dtravel/assets/icons/ic_plus.svg'
import { GuestType } from '@dtravel/helpers/interfaces'
import { useAppSelector } from '@dtravel/redux/hooks'
import { useDispatch } from 'react-redux'
import { setAdults, setChildren, setInfants, setPets } from '@dtravel/redux/slices/property'

interface Props {
  type: GuestType
  hasBorderBot?: boolean
  pt?: number
  pb?: number
  personCapacity: number
  // eslint-disable-next-line no-unused-vars
  afterGuestChange?: (_: any) => void
  allowZeroAdult?: boolean
  isMerchantPage?: boolean
  maxPet?: number | null
}

const SelectGuestItem: React.FC<Props> = ({
  type,
  hasBorderBot,
  pt = 16,
  pb = 16,
  personCapacity,
  allowZeroAdult,
  afterGuestChange,
  isMerchantPage,
  maxPet,
}) => {
  const dispatch = useDispatch()
  const { checkIn, checkOut, adults, children, infants, pets } = useAppSelector((state) => state.property)

  const renderText = (type: GuestType, labelType: 'title' | 'subTitle') => {
    switch (type) {
      case 'adult':
        return labelType === 'title' ? 'Adults' : 'Ages 13+'
      case 'child':
        return labelType === 'title' ? 'Children' : 'Ages 2-12'
      case 'infant':
        return labelType === 'title' ? 'Infants' : 'Under 2'
      case 'pet':
        return labelType === 'title' ? 'Pets' : ''
    }
  }

  const renderCount = (type: GuestType) => {
    switch (type) {
      case 'adult':
        return adults
      case 'child':
        return children
      case 'infant':
        return infants
      case 'pet':
        return pets
    }
  }

  const handleChangeCount = useCallback(
    (type: GuestType, isIncreasement: boolean) => () => {
      switch (type) {
        case 'adult': {
          let newAdults = isIncreasement ? adults + 1 : adults > 1 ? adults - 1 : 1
          if (allowZeroAdult) {
            newAdults = isIncreasement ? adults + 1 : adults > 0 ? adults - 1 : 0
          }
          dispatch(setAdults(newAdults))
          if (typeof afterGuestChange === 'function') afterGuestChange({ adults: newAdults, children, infants, pets })
          break
        }
        case 'child': {
          const newChild = isIncreasement ? children + 1 : children > 0 ? children - 1 : 0
          dispatch(setChildren(newChild))
          if (typeof afterGuestChange === 'function') afterGuestChange({ adults, children: newChild, infants, pets })
          break
        }
        case 'infant': {
          const newInfants = isIncreasement ? infants + 1 : infants > 0 ? infants - 1 : 0
          dispatch(setInfants(isIncreasement ? infants + 1 : infants > 0 ? infants - 1 : 0))
          if (typeof afterGuestChange === 'function') afterGuestChange({ adults, children, infants: newInfants, pets })
          break
        }
        case 'pet': {
          let newPets = isIncreasement ? pets + 1 : pets > 0 ? pets - 1 : 0
          newPets = newPets > 5 ? 5 : newPets // max 5 pets
          dispatch(setPets(newPets))
          if (typeof afterGuestChange === 'function') afterGuestChange({ adults, children, infants, pets: newPets })
          break
        }
      }
    },
    [adults, children, infants, pets, checkIn, checkOut]
  )

  const disabledAdult = (type === 'adult' || type === 'child') && Number(adults) + Number(children) >= personCapacity
  const isDisabledPlus = disabledAdult || (type === 'pet' && !maxPet) || (type === 'pet' && pets >= 5)
  return (
    <div
      className={`flex justify-between items-center ${hasBorderBot ? 'border-b border-solid border-sand-3' : ''}`}
      style={{ paddingTop: pt, paddingBottom: pb }}
    >
      <div>
        <p className={isMerchantPage ? 'font-inter-500 text-neutral-900 text-14-18' : 'text-black text-16-20'}>
          {renderText(type, 'title')}
        </p>
        <p className={isMerchantPage ? 'font-inter-400 text-neutral-600 text-14-18' : 'text-sand-8 text-14-18'}>
          {renderText(type, 'subTitle')}
        </p>
      </div>
      <div className={'flex justify-between items-center gap-2'}>
        <IconButton
          onClick={handleChangeCount(type, false)}
          disabled={type === 'pet' && !maxPet}
          className={'cursor-pointer disabled:cursor-not-allowed disabled:opacity-30'}
        >
          <Image src={ic_minus} alt={'ic_minus'} />
        </IconButton>
        <span>{renderCount(type)}</span>
        <IconButton
          onClick={handleChangeCount(type, true)}
          disabled={isDisabledPlus}
          className={'cursor-pointer disabled:cursor-not-allowed disabled:opacity-30'}
        >
          <Image src={ic_plus} alt={'ic_plus'} />
        </IconButton>
      </div>
    </div>
  )
}

export default SelectGuestItem
