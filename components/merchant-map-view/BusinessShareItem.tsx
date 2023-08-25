import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setToastSuccess } from '@dtravel/redux/slices/common'
import { TwitterShareButton, WhatsappShareButton } from 'react-share'
import ic_copy from '@dtravel/assets/icons/ic_copy.svg'
import ic_mail from '@dtravel/assets/icons/ic_mail.svg'
import ic_messages from '@dtravel/assets/icons/ic_messages.png'
import ic_WhatsApp from '@dtravel/assets/icons/ic_WhatsApp.png'
import ic_Twitter from '@dtravel/assets/icons/ic_Twitter.png'
import { useRouter } from 'next/router'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {
  type: string
  label: string
  url: string
  isFirstItem?: boolean
  isLastItem?: boolean
}

const BusinessShareItem: React.FC<Props> = ({ type, url, label, isFirstItem, isLastItem }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { propertyId } = router.query
  const { businessInfor } = useAppSelector((state) => state.property)
  const title = `Explore ${propertyId ? 'this' : 'these'} vacation ${propertyId ? 'rental' : 'rentals'}${businessInfor?.contactName ? ' from ' + businessInfor?.contactName : ''
    } on Dtravel!`
  const content = `${title} ${encodeURIComponent(url)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    dispatch(setToastSuccess({ title: '', message: 'Copied!' }))
  }

  const handleShareEmail = () => {
    window.location.href = 'mailto:?body=' + content
  }

  const handleSendMessages = () => {
    window.location.href = 'sms:?&body=' + content
  }

  const handleClickItem = (_type: string) => {
    switch (_type) {
      case 'link':
        handleCopy()
        break
      case 'email':
        handleShareEmail()
        break
      case 'messages':
        handleSendMessages()
        break
    }
  }

  return (
    <>
      {(type === 'link' || type === 'email' || type === 'messages') && (
        <button
          onClick={() => handleClickItem(type)}
          className={
            'flex justify-between items-center bg-sand-2 mb-[2px] pl-[16px] pr-[8px] h-[64px] font-inter-500 text-sand-8 text-16-20 w-full' +
            ' ' +
            `${isFirstItem && 'rounded-t-[16px]'}` +
            ' ' +
            `${isLastItem && 'rounded-b-[16px]'}`
          }
        >
          <span>{label}</span>

          {type === 'link' && <Image src={ic_copy} alt={label} width={24} height={24} />}
          {type === 'email' && <Image src={ic_mail} alt={label} width={24} height={24} />}
          {type === 'messages' && <Image src={ic_messages} alt={label} width={24} height={24} />}
        </button>
      )}

      {type === 'whatsapp' && (
        <WhatsappShareButton
          title={title}
          url={url}
          resetButtonStyle={false}
          className={
            'flex justify-between items-center bg-sand-2 mb-[2px] pl-[16px] pr-[8px] h-[64px] font-inter-500 text-sand-8 text-16-20 w-full' +
            ' ' +
            `${isFirstItem && 'rounded-t-[16px]'}` +
            ' ' +
            `${isLastItem && 'rounded-b-[16px]'}`
          }
        >
          <span>{label}</span>
          <Image src={ic_WhatsApp} alt={label} width={24} height={24} />
        </WhatsappShareButton>
      )}

      {type === 'twitter' && (
        <TwitterShareButton
          title={title}
          url={url}
          resetButtonStyle={false}
          className={
            'flex justify-between items-center bg-sand-2 mb-[2px] pl-[16px] pr-[8px] h-[64px] font-inter-500 text-sand-8 text-16-20 w-full' +
            ' ' +
            `${isFirstItem && 'rounded-t-[16px]'}` +
            ' ' +
            `${isLastItem && 'rounded-b-[16px]'}`
          }
        >
          <span>{label}</span>
          <Image src={ic_Twitter} alt={label} width={24} height={24} />
        </TwitterShareButton>
      )}
    </>
  )
}

export default BusinessShareItem
