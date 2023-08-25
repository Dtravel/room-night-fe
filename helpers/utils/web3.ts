import { AppDispatch } from '@dtravel/redux/store'
import { setConnecting } from '@dtravel/redux/slices/common'

export const isMobileDevice = () => {
  return 'ontouchstart' in window || 'onmsgesturechange' in window
}
export const isMetaMaskInstalled = () => {
  const ethereum = (window as any).ethereum
  return Boolean(ethereum && ethereum.isMetaMask)
}
export const connectWallet = async (onConnect: (walletAddress: string) => void, dispatch?: AppDispatch) => {
  if (!isMetaMaskInstalled()) return
  try {
    if (dispatch) dispatch(setConnecting(true))
    const accounts = await (window as any).ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    })
    if (accounts.length > 0) {
      checkIfWalletIsConnected(onConnect)
    }
  } catch (error) {
    console.error(error)
  } finally {
    if (dispatch) dispatch(setConnecting(false))
  }
}
export const checkIfWalletIsConnected = async (onConnected: (walletAddress: string) => void) => {
  if (isMetaMaskInstalled()) {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_accounts',
    })

    if (accounts.length > 0) {
      onConnected(accounts[0])
      return
    }
    if (isMobileDevice()) {
      await connectWallet(onConnected)
    }
  }
}
