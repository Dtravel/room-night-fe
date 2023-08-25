import SelectGuestItem from '@dtravel/components/property-detail/SelectGuestItem'
import { GUEST_TYPE, PMS } from '@dtravel/helpers/constants/constants'
import { Amenity } from '@dtravel/helpers/interfaces/property'
import { useAppSelector } from '@dtravel/redux/hooks'
import Popover from '@mui/material/Popover'
import React, { useEffect, useState } from 'react'
import { setDatePickerFocusedId, setIsOpenSelectGuestDesktop } from '@dtravel/redux/slices/common'
import { useDispatch } from 'react-redux'
import { setAdults, setChildren, setInfants, setPets } from '@dtravel/redux/slices/property'
import { useRouter } from 'next/router'

interface Props {
  personCapacity: number
  amenities: Amenity[]
  loading?: boolean
  anchorElement: HTMLElement | null
  transformOrigin?: any
  anchorOrigin?: any
  pmsType?: string
  // eslint-disable-next-line no-unused-vars
  afterGuestChange?: (_: any) => void
  allowZeroAdult?: boolean
}

const SelectGuest = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { personCapacity, amenities, anchorElement, allowZeroAdult, transformOrigin, anchorOrigin, afterGuestChange } =
    props
  const { isOpenSelectGuestDesktop } = useAppSelector((state) => state.common)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
    }

    dispatch(setDatePickerFocusedId(null))
    // eslint-disable-next-line
  }, [allowZeroAdult])

  useEffect(() => {
    setAnchorEl(isOpenSelectGuestDesktop ? anchorElement : null)
  }, [isOpenSelectGuestDesktop, anchorElement])

  const handleClose = () => {
    setAnchorEl(null)
    dispatch(setIsOpenSelectGuestDesktop(false))
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover-guest' : undefined
  const petAmenities = amenities.find((v: Amenity) => v.pmsAmenityId === '37')
  const listType = GUEST_TYPE.filter((v) => {
    if (props.pmsType === PMS.UPLISTING && ['infant', 'pet'].includes(v)) {
      return false
    }
    return !petAmenities ? v !== 'pet' : v
  })

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
              vertical: -8,
              horizontal: 'right',
            }
      }
      sx={{
        '& .MuiPaper-root': {
          width: '432px',
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2)',
          borderRadius: '24px',
          backgroundColor: '#FFFFFF',
          padding: '24px',
        },
      }}
    >
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
    </Popover>
  )
}

export default SelectGuest
