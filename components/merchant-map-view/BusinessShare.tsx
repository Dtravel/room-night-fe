import React, { useEffect, useState } from 'react'
import ic_share from '@dtravel/assets/icons/ic_share.svg'
import ic_dot_dot_dot from '@dtravel/assets/icons/ic_dot_dot_dot.svg'
import { useRouter } from 'next/router'
import Zoom from '@mui/material/Zoom'
import Image from 'next/image'
import BasicPopup from '@dtravel/components/ui/BasicPopup'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import BusinessShareItem from '@dtravel/components/merchant-map-view/BusinessShareItem'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import BasicTooltip from '@dtravel/components/ui/BasicTooltip'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {
  children?: React.ReactNode
  hideTooltip?: boolean
}

const BusinessShare: React.FC<Props> = ({ children, hideTooltip }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { propertyId } = router.query
  const isMounted = useMounted()
  const windowDimensions = useWindowDimensions()
  const [shares, setShares] = useState<any>([])
  const { businessInfor } = useAppSelector((state) => state.property)


  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}`
    setShares([
      {
        type: 'link',
        label: 'Copy link',
        url,
      },
      {
        type: 'email',
        label: 'Email',
        url,
      },
      {
        type: 'messages',
        label: 'Messages',
        url,
      },
      {
        type: 'whatsapp',
        label: 'WhatsApp',
        url,
      },
      {
        type: 'twitter',
        label: 'Twitter',
        url,
      },
    ])
  }, [router.query])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleShareMoreOptions = async () => {
    const content = `Explore ${propertyId ? 'this' : 'these'} vacation ${propertyId ? 'rental' : 'rentals'}${businessInfor?.contactName ? ' from ' + businessInfor?.contactName : ''
      } on Dtravel! ${window.location.href}`
    await navigator.share({ text: content })
  }

  const renderContent = () => {
    return (
      <div>
        {shares.map((item: any, index: number) => (
          <BusinessShareItem
            key={item.type}
            {...item}
            index={index}
            isFirstItem={index === 0}
            isLastItem={index === shares.length - 1}
          />
        ))}

        {isMounted && window.navigator && !!window.navigator.canShare && (
          <button
            className={
              'flex justify-between items-center bg-sand-2 mb-[2px] pl-[16px] pr-[8px] h-[64px] mt-[16px] rounded-[16px] lg:hidden font-inter-500 text-sand-8 text-16-20 w-full'
            }
            onClick={handleShareMoreOptions}
          >
            <span>More options</span>
            <span>
              <Image src={ic_dot_dot_dot} alt={'ic_dot_dot_dot'} />
            </span>
          </button>
        )}
      </div>
    )
  }
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
            <Image src={ic_share} alt="" width={24} height={24} />
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
        <BasicTooltip title={'Share business'} TransitionComponent={Zoom}>
          {renderAction()}
        </BasicTooltip>
      )}
      {windowDimensions.width >= 1024 ? (
        <BasicPopup isOpen={isOpen} onClose={handleClose} title={'Share'} allowBackdropClick>
          {renderContent()}
        </BasicPopup>
      ) : (
        <BasicSwipeDrawer isOpen={isOpen} onClose={handleClose} title={'Share'} titleAlign={'center'}>
          {renderContent()}
        </BasicSwipeDrawer>
      )}
    </>
  )
}

export default BusinessShare
