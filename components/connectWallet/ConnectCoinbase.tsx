import React from 'react'
import Image from 'next/image'
import ic_coinbase_wallet from '@dtravel/assets/icons/ic_coinbase_wallet.svg'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {}

const ConnectCoinbase: React.FC<Props> = () => {
  const { connecting } = useAppSelector((state) => state.common)
  return (
    <button
      className={`w-full flex justify-between items-center rounded-2xl p-4 bg-white mb-4 ${
        connecting ? 'cursor-not-allowed' : 'border border-solid border-black-1 cursor-pointer'
      }`}
      style={connecting ? { background: 'rgba(63, 63, 63, 0.08)' } : {}}
    >
      <Image src={ic_coinbase_wallet} alt="" style={{ width: 24, height: 24, opacity: connecting ? 0.8 : 1 }} />
      <span className={`text-18-24 ${connecting ? 'text-sand-6' : 'text-sand-7'}`}>
        {connecting ? 'Connecting...' : 'Coinbase Wallet'}
      </span>
      <div style={{ width: 24, height: 24 }} />
    </button>
  )
}

export default ConnectCoinbase
