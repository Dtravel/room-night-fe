import React, { useEffect } from 'react'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import { useAppSelector } from '@dtravel/redux/hooks'
import { useDispatch } from 'react-redux'
import { setIsOpenSelectGuestMobile } from '@dtravel/redux/slices/common'
import { Amenity } from '@dtravel/helpers/interfaces/property'
import { GUEST_TYPE, PMS } from '@dtravel/helpers/constants/constants'
import SelectGuestItem from '@dtravel/components/property-detail/SelectGuestItem'
import BasicButton from '@dtravel/components/ui/BasicButton'
import { setAdults, setChildren, setInfants, setPets } from '@dtravel/redux/slices/property'
import { useRouter } from 'next/router'

interface Props {
  personCapacity: number
  amenities: Amenity[]
  pmsType?: string
  // eslint-disable-next-line no-unused-vars
  afterGuestChange?: (_: any) => void
  allowZeroAdult?: boolean
}

const SelectGuestMobile: React.FC<Props> = ({
  amenities,
  personCapacity,
  pmsType,
  afterGuestChange,
  allowZeroAdult,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isOpenSelectGuestMobile } = useAppSelector((state) => state.common)

  const petAmenities = amenities.find((v: Amenity) => v.pmsAmenityId === '37')
  const listType = GUEST_TYPE.filter((v) => {
    if (pmsType === PMS.UPLISTING && ['infant', 'pet'].includes(v)) {
      return false
    }
    return !petAmenities ? v !== 'pet' : v
  })

  useEffect(() => {
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
    } // eslint-disable-next-line
  }, [allowZeroAdult])

  const handleClose = () => {
    dispatch(setIsOpenSelectGuestMobile(false))
  }

  const handleSaveGuest = () => {
    handleClose()
  }

  return (
    <BasicSwipeDrawer isOpen={isOpenSelectGuestMobile} onClose={handleClose} title={'Add guests'}>
      <div>
        {listType.map((type, index) => {
          return (
            <SelectGuestItem
              key={type}
              type={type}
              hasBorderBot={index !== listType.length - 1}
              pt={index === 0 ? 0 : 16}
              pb={index === listType.length - 1 ? 0 : 16}
              personCapacity={personCapacity}
              afterGuestChange={afterGuestChange}
              allowZeroAdult={allowZeroAdult}
            />
          )
        })}
      </div>
      <div className={'mt-6'}>
        <BasicButton variant={'contained'} color={'black'} clases={'w-full'} onClick={handleSaveGuest}>
          Done
        </BasicButton>
      </div>
    </BasicSwipeDrawer>
  )
}

export default SelectGuestMobile
