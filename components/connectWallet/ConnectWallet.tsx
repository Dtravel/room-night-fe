import React, { useState } from 'react'
import Image from 'next/image'
import BasicButton from '@dtravel/components/ui/BasicButton'
import BasicPopup from '@dtravel/components/ui/BasicPopup'
import ConnectMetamask from './ConnectMetamask'
import ic_wallet_connect_group from '@dtravel/assets/icons/ic_wallet_connect_group.svg'
interface Props {
  type?: 'booking'
}

const ConnectWallet = ({ type }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {type === 'booking' ? (
        <div
          className="w-full lg:w-[calc(50%_-_8px)] p-[24px] border-[0.5px] hover:border-[1px] border-[#00000026] hover:border-grayscale-900 rounded-2xl flex flex-col items-start cursor-pointer"
          onClick={handleOpen}
        >
          <Image src={ic_wallet_connect_group} alt="" width={20} height={20} />
          <span className="mt-[12px] text-16-20 text-grayscale-900 font-inter-500">Connect wallet</span>
        </div>
      ) : (
        <div className={'flex justify-center'}>
          <BasicButton
            variant={'contained'}
            // className="bg-grayscale-900 rounded-xl px-4 py-4 text-white font-inter-400 text-14-18"
            onClick={handleOpen}
            // color="white"
          >
            Connect wallet
          </BasicButton>
        </div>
      )}
      <BasicPopup
        isOpen={open}
        onClose={handleClose}
        title={'Connect your wallet'}
        maxWidth={'xs'}
        topTitle="Secure checkout"
      >
        <>
          <ConnectMetamask handleClose={handleClose} />
          {/* <ConnectCoinbase /> */}
          {/* <WalletConnect /> */}
        </>
      </BasicPopup>
    </>
  )
}
export default ConnectWallet
