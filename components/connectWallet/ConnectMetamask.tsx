import React from 'react'
import Image from 'next/image'
import ic_metamask from '@dtravel/assets/icons/ic_metamask.svg'
import { connectWallet, fetchChainId } from '@dtravel/helpers/utils/ether'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setToastError, setConnecting, setAccounts } from '@dtravel/redux/slices/common'

interface Props {
  handleClose: () => void
}

const ConnectMetamask: React.FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const { connecting } = useAppSelector((state) => state.common)

  const detectAccountChange = (acc: any) => {
    dispatch(setAccounts(acc))
  }
  const handleConnectMetamask = async () => {
    try {
      dispatch(setConnecting(true))
      const accounts = await connectWallet()
      let address = accounts.length > 0 ? accounts[0] : ''
      if (address) {
        dispatch(setAccounts(accounts))
        fetchChainId()
        const ethereum = typeof window === 'undefined' ? null : (window as any).ethereum
        if (ethereum) ethereum.on('accountsChanged', detectAccountChange)
        handleClose()
      } else {
        dispatch(setToastError({ message: 'Please select an account' }))
        return
      }
    } catch (err: any) {
      handleClose()
      dispatch(setToastError({ message: typeof err === 'string' ? err : err.message }))
    } finally {
      dispatch(setConnecting(false))
    }
  }

  return (
    <>
      <button
        className={`w-full flex justify-between items-center rounded-2xl p-4 mb-4 bg-white ${
          connecting ? 'cursor-not-allowed' : 'border border-solid border-black-1 cursor-pointer'
        }`}
        style={connecting ? { background: 'rgba(63, 63, 63, 0.08)' } : {}}
        onClick={handleConnectMetamask}
      >
        <Image src={ic_metamask} alt="" style={{ width: 24, height: 24, opacity: connecting ? 0.8 : 1 }} />
        <span className={`text-18-24 ${connecting ? 'text-sand-6' : 'text-sand-7'}`}>
          {connecting ? 'Connecting...' : 'MetaMask'}
        </span>
        <div style={{ width: 24, height: 24 }} />
      </button>
    </>
  )
}

export default ConnectMetamask
