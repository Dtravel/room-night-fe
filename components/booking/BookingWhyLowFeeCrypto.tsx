import React, { useState } from 'react'
import BasicDialog from '../ui/BasicDialog'

const BookingWhyLowFeeCrypto = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const renderTitle = () => {
    return (
      <div
        className={
          'font-inter-500 text-16-20 md:text-28-36 text-neutral-900 md:text-neutral-800 text-center tracking-[.-0.03em]'
        }
      >
        Why low fees with crypto?
      </div>
    )
  }
  const renderContent = () => {
    return (
      <div className={'mt-[16px] mb-[24px] md:mb-[64px]'}>
        <p className="mb-[16px] text-neutral-800 text-16-24 md:text-20-32 font-inter-500">Pay Less With Crypto</p>
        <p className="mb-[16px] text-neutral-700 text-16-20 font-inter-400">
          Crypto payments are peer-to-peer, meaning funds are sent directly from you to the host. No banks or
          intermediaries = no extra fees.
        </p>
      </div>
    )
  }

  return (
    <>
      <span className="text-neutral-600 text-14-18 underline cursor-pointer" onClick={handleOpen}>
        Why low fees with crypto?
      </span>
      <BasicDialog
        isOpen={isOpen}
        onClose={handleClose}
        title={renderTitle()}
      // showDefaultFooter
      >
        {renderContent()}
      </BasicDialog>
    </>
  )
}

export default BookingWhyLowFeeCrypto
