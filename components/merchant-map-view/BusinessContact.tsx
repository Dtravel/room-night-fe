import React, { useEffect, useState } from 'react'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import Zoom from '@mui/material/Zoom'
import Image from 'next/image'
import BasicPopup from '@dtravel/components/ui/BasicPopup'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import ic_mail from '@dtravel/assets/icons/ic_mail.svg'
import ic_social_instagram from '@dtravel/assets/icons/ic_social_instagram.svg'
import ic_logos_whatsapp from '@dtravel/assets/icons/ic_logos_whatsapp.svg'
import ic_facebook2 from '@dtravel/assets/icons/ic_facebook2.svg'
import { SUPPORT_EMAIL } from '@dtravel/helpers/constants/constants'
import BasicTooltip from '@dtravel/components/ui/BasicTooltip'
import { useAppSelector } from '@dtravel/redux/hooks'
import { IconEmail, IconMobileButton } from '@dtravel/components/common/Icons'
import BasicButton from '@dtravel/components/ui/BasicButton'
import { isEmpty } from '@dtravel/utils/common'

interface Props {
  children?: React.ReactNode
  hideTooltip?: boolean
  parentClass?: string
  contactEmail?: string
  contactPhone1?: string
  contactPhone2?: string
}

const BusinessContact: React.FC<Props> = ({
  children,
  hideTooltip,
  parentClass,
  contactEmail,
  contactPhone1,
  contactPhone2,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [fields, setFields] = useState<any[]>([])
  const { businessInfor, landingSetting } = useAppSelector((state) => state.property)
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024

  useEffect(() => {
    let _fields: any[] = [
      {
        field: 'email',
        label: businessInfor?.contactEmail || contactEmail || SUPPORT_EMAIL,
        actionType: 'Copy',
      },
    ]
    if (businessInfor?.contactPhone || contactPhone1 || contactPhone2) {
      _fields.push({
        field: 'phone',
        label: businessInfor?.contactPhone || contactPhone1 || contactPhone2,
        actionType: isMobile ? 'Call' : 'Copy',
      })
    }
    if (businessInfor && businessInfor.userId) {
      if (!isEmpty(landingSetting?.contact)) {
        const contactModal = landingSetting?.contact
        _fields = Array.isArray(contactModal) ? _fields.concat(contactModal) : _fields
      }
    }
    setFields(_fields)
    // eslint-disable-next-line
  }, [
    businessInfor?.userId,
    businessInfor?.contactPhone,
    businessInfor?.contactPhone,
    contactEmail,
    contactPhone1,
    contactPhone2,
    isMobile,
    landingSetting?.contact,
  ])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleAction = ({ field, label, actionType, mediaLink }: any) => {
    if (actionType === 'Copy') {
      navigator.clipboard.writeText(label)
    }
    if (actionType === 'Call') {
      window.location.href = 'tel:' + (businessInfor?.contactPhone || contactPhone1 || contactPhone2)
    }
    if (actionType === 'Message') {
      if (field === 'whatsapp') {
        // window.open('https://wa.me/' + businessInfor?.contactPhone, '_blank')
        window.open(mediaLink, '_blank')
      }
      if (field === 'facebook' || field === 'instagram') {
        window.open(mediaLink)
      }
    }
  }

  const renderContent = () => {
    return (
      <div>
        {fields.map((item: any, index: number) => {
          const isLastItem = index === fields.length - 1
          return (
            <div
              key={item.field}
              className={
                'flex h-[64px] border-b border-neutral-300 items-center gap-[8px] ' +
                `${isLastItem ? 'border-none' : ''}`
              }
            >
              <span className={'w-[40px] h-[40px] flex items-center justify-center'}>
                {item.field === 'email' && <IconEmail />}
                {item.field === 'phone' && <IconMobileButton />}
                {item.field === 'whatsapp' && <Image src={ic_logos_whatsapp} alt={'ic_logos_whatsapp'} />}
                {item.field === 'facebook' && <Image src={ic_facebook2} alt={'ic_facebook2'} />}
                {item.field === 'instagram' && <Image src={ic_social_instagram} alt={'ic_social_instagram'} />}
              </span>
              <span>{item.label}</span>
              <span className={'ml-auto'}>
                <BasicButton variant={'outlined'} size={'sm'} onClick={() => handleAction(item)}>
                  {item.actionType}
                  {/*<span className={'text-grayscale-800 font-inter-500 text-12-16'}>Copy</span>*/}
                </BasicButton>
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  const renderAction = () => {
    return (
      <>
        {children ? (
          <div className={parentClass || ''} onClick={handleOpen}>
            {children}
          </div>
        ) : (
          <button
            className={
              'w-[40px] sm:w-[48px] h-[48px] rounded-[16px] flex justify-center items-center hover:bg-sand-2 active:bg-sand-3'
            }
            onClick={handleOpen}
          >
            <Image src={ic_mail} alt="" width={24} height={24} />
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
        <BasicTooltip title={'Contact host'} TransitionComponent={Zoom}>
          {renderAction()}
        </BasicTooltip>
      )}
      {isMobile ? (
        <BasicSwipeDrawer
          isOpen={isOpen}
          onClose={handleClose}
          title={'Contact us'}
          extraTitle={'Let us know how we can help you book your next stay.'}
          titleAlign={'center'}
        >
          {renderContent()}
        </BasicSwipeDrawer>
      ) : (
        <BasicPopup
          isOpen={isOpen}
          onClose={handleClose}
          title={'Contact us'}
          extraTitle={'Let us know how we can help you book your next stay.'}
          allowBackdropClick
        >
          {renderContent()}
        </BasicPopup>
      )}
    </>
  )
}

export default BusinessContact
