import React, { useState } from 'react'
import Image from 'next/image'
import ic_add_plus_circle from '@dtravel/assets/icons/ic_add_plus_circle.svg'
import call_out_supporting_host from '@dtravel/assets/images/call_out_supporting_host.png'
import EastIcon from '@mui/icons-material/East'
import BasicDialog from '../ui/BasicDialog'

interface Props {
  contactName: string
  children?: any
}

const CallOutSupportHost: React.FC<Props> = ({ contactName, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const renderContent = () => (
    <div>
      <div className={'rounded-[16px]'}>
        <Image src={call_out_supporting_host} className={'rounded-[16px]'} alt="" />
      </div>
      <div className={'mt-[24px]'}>
        <p className={'font-inter-500 text-16-24 md:text-20-32 text-neutral-800 mb-[16px] md:mb-[24px]'}>
          Benefits of Direct Stays
        </p>
        <p className={'font-inter-400 text-16-20 text-neutral-700 mb-[16px] md:mb-[24px]'}>
          With direct bookings, hosts aren&apos;t bound by third-party policies. Instead, they set the rules that apply
          to your booking. This offers you:
        </p>
        <p className={'font-inter-500 text-16-24 text-neutral-800 mb-[8px]'}>Lower rates</p>
        <p className={'font-inter-400 text-16-20 text-neutral-700 mb-[16px] md:mb-[24px]'}>
          Since hosts don&apos;t have to pay platform commissions with direct bookings, you often receive lower rates or
          even special perks.
        </p>
        <p className={'font-inter-500 text-16-24 text-neutral-800 mb-[8px]'}>Greater flexibility</p>
        <p className={'font-inter-400 text-16-20 text-neutral-700 mb-[16px] md:mb-[24px]'}>
          Making changes to a stay or submitting special requests directly with the host can be executed faster and with
          greater assurance than through third-party platforms.
        </p>
        <p className={'font-inter-500 text-16-24 text-neutral-800 mb-[8px]'}>Quicker dispute resolution </p>
        <p className={'font-inter-400 text-16-20 text-neutral-700 mb-[16px] md:mb-[24px]'}>
          If something doesn&apos;t go according to plan during a stay, rather than relying on customer support
          representatives, there&apos;s only a single point of contact: the host.
        </p>
        <p className={'font-inter-500 text-16-24 text-neutral-800 mb-[8px]'}>Support local entrepreneurs</p>
        <p className={'font-inter-400 text-16-20 text-neutral-700 mb-[16px] md:mb-[24px]'}>
          By booking a direct stay, you support the local community and economy.
        </p>

        <a
          className={'font-inter-500 text-16-20 text-neutral-800 hover:underline pb-[16px] md:pb-[24px]'}
          href={'https://dtravel.com/blog/the-rise-of-direct-bookings-and-greater-ownership/'}
          target={'_blank'}
          rel="noreferrer"
        >
          Learn more &nbsp;
          <EastIcon fontSize={'small'} />
        </a>
      </div>
    </div>
  )

  return (
    <>
      {children ? (
        <div onClick={handleOpen} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <button onClick={handleOpen} className={'h-[16px] w-[16px] flex items-center justify-center'}>
          <Image src={ic_add_plus_circle} width={16} height={16} alt="" />
        </button>
      )}
      <BasicDialog
        isOpen={isOpen}
        onClose={handleClose}
        title={
          <div
            className={
              'font-inter-500 text-16-20 md:text-28-36 text-neutral-900 md:text-neutral-800 text-left md:text-center'
            }
          >
            You&apos;re supporting hosts like {contactName} by booking direct
          </div>
        }
        showDefaultFooter
      >
        {renderContent()}
      </BasicDialog>
    </>
  )
}

export default CallOutSupportHost
