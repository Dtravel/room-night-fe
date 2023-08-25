import React, { useState } from 'react'
import Image from 'next/image'
import ic_add_plus_circle from '@dtravel/assets/icons/ic_add_plus_circle.svg'
import DtravelPrice from '../common/DtravelPrice'
import BasicDialog from '../ui/BasicDialog'
import saving_image from '@dtravel/assets/images/saving_image.jpg'

interface Props {
  saveAmount: number
  saveAmountByHost: number
  saveAmountByCrypto: number
  currencyDisplay: string
  children?: any
  showDefaultFooter?: boolean
}
const CallOutYouAreSaving: React.FC<Props> = ({ saveAmount, currencyDisplay, children, showDefaultFooter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const renderTitle = () => {
    return (
      <div className={'font-inter-500 text-16-20 md:text-28-36 text-neutral-800 text-center tracking-[-0.03em]'}>
        You’re saving at least&nbsp;
        <DtravelPrice price={saveAmount} currency={currencyDisplay} />
      </div>
    )
  }

  const renderContent = () => {
    return (
      <>
        <div className={'rounded-[16px] w-full'}>
          <Image src={saving_image} className={'rounded-[16px]'} alt="" />
        </div>
        <div className={'mt-[24px]'}>
          <p className="mb-[24px] text-neutral-800 text-16-24 md:text-20-32 font-inter-500">
            How Direct Bookings & Crypto Save You Money
          </p>
          <p className="mb-[8px] text-neutral-800 text-16-24 font-inter-500">Out with the old...</p>
          <p className="mb-[24px] text-neutral-700 text-16-20 font-inter-400">
            Bookings made via online travel agencies and vacation rental platforms involve commission fees of between
            15-20%, meaning you and/or the host always pay more.
          </p>
          <p className="mb-[8px] text-neutral-800 text-16-24 font-inter-500">...In with the new</p>
          <p className="mb-[24px] text-neutral-700 text-16-20 font-inter-400">
            This has led to the rise of direct bookings, which bypass intermediaries and their high fees. Using web3
            technology like smart contracts, Dtravel decentralizes bookings by automating them with code, significantly
            reducing fees.
          </p>
          {/* <p className='mb-[16px] text-neutral-8 text-16-24 font-inter-400'>
            With Dtravel,&nbsp;
            <b className='font-inter-500'>you save <DtravelPrice price={saveAmountByCrypto} currency={currencyDisplay} /></b>&nbsp;
            when booking this property direct with crypto
            (
            <b className='font-inter-500'>
              <DtravelPrice price={saveAmountByHost} currency={currencyDisplay} />
            </b>
            &nbsp;when you book with fiat).
          </p> */}
        </div>
      </>
    )
  }

  return (
    <>
      {children ? (
        <div onClick={handleOpen} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <button onClick={handleOpen} className={'h-[16px] w-[16px] flex items-center justify-center'}>
          <Image src={ic_add_plus_circle} style={{ width: 16, height: 16 }} alt="" />
        </button>
      )}
      <BasicDialog isOpen={isOpen} onClose={handleClose} title={renderTitle()} showDefaultFooter={showDefaultFooter}>
        {renderContent()}
      </BasicDialog>
    </>
  )
}

export default CallOutYouAreSaving
