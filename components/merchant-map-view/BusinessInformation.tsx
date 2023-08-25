import React, { useState } from 'react'
import Zoom from '@mui/material/Zoom'
import Image from 'next/image'
import ic_info from '@dtravel/assets/icons/ic_info.svg'
import { convertRating, isEmpty } from '@dtravel/utils/common'
import { capitalizeLetter } from '@dtravel/helpers/utils/common'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import BasicTooltip from '@dtravel/components/ui/BasicTooltip'
import BasicPopup from '@dtravel/components/ui/BasicPopup'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import BusinessStatItem from '@dtravel/components/merchant-map-view/BusinessStatItem'
import BusinessReviewItem from '@dtravel/components/merchant-map-view/BusinessReviewItem'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {
  children?: React.ReactNode
  hideTooltip?: boolean
}

const BusinessInformation: React.FC<Props> = ({ children, hideTooltip }) => {
  const [isOpen, setIsOpen] = useState(false)
  const windowDimensions = useWindowDimensions()
  const { businessInfor } = useAppSelector((state) => state.property)

  const stats = [
    {
      type: 'booking',
      amount: businessInfor?.totalBookings,
    },
    {
      type: 'rating',
      amount: convertRating(businessInfor?.rating, 1),
    },
    {
      type: 'review',
      amount: businessInfor?.totalReviews,
    },
  ].filter((v) => v.amount && v.amount > 0)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const renderContent = () => {
    return (
      <div>
        {!isEmpty(stats) && (
          <>
            <p className={'font-inter-500 text-16-24 text-neutral-800 mb-[16px] mt-[8px]'}>Stats</p>
            {stats.map((item, index) => (
              <BusinessStatItem key={item.type} type={item.type} amount={item.amount} index={index} />
            ))}
          </>
        )}
        {Array.isArray(businessInfor?.reviews) && businessInfor?.reviews.length > 0 && (
          <>
            <p className={'font-inter-500 text-16-24 text-neutral-800 mb-[16px] mt-[30px]'}>Recent reviews</p>
            {(businessInfor?.reviews || []).map((item: any) => (
              <BusinessReviewItem key={item.id} {...item} />
            ))}
          </>
        )}
      </div>
    )
  }
  if (isEmpty(stats) && !businessInfor?.bio) return null

  const renderAction = () => {
    return (
      <>
        {children ? (
          <div onClick={handleOpen}>{children}</div>
        ) : (
          <button
            className={
              'w-[40px] sm:w-[48px] h-[48px] rounded-[16px] flex justify-center items-center hover:bg-sand-2 active:bg-sand-3'
            }
            onClick={handleOpen}
          >
            <Image src={ic_info} alt="" width={24} height={24} />
          </button>
        )}
      </>
    )
  }

  return (
    <>
      {hideTooltip ? (
        renderAction()
      ) : (
        <BasicTooltip title={`About ${businessInfor?.contactName}`} TransitionComponent={Zoom}>
          {renderAction()}
        </BasicTooltip>
      )}
      {windowDimensions.width >= 1024 ? (
        <BasicPopup
          isOpen={isOpen}
          onClose={handleClose}
          title={`About ${capitalizeLetter(businessInfor?.contactName)}`}
          extraTitle={businessInfor?.bio}
          allowBackdropClick
        >
          {renderContent()}
        </BasicPopup>
      ) : (
        <BasicSwipeDrawer
          isOpen={isOpen}
          onClose={handleClose}
          title={`About ${capitalizeLetter(businessInfor?.contactName)}`}
          extraTitle={businessInfor?.bio}
          titleAlign={'center'}
        >
          {renderContent()}
        </BasicSwipeDrawer>
      )}
    </>
  )
}

export default BusinessInformation
