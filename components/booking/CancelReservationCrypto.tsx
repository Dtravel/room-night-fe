import DtravelPrice from '@dtravel/components/common/DtravelPrice'
import ConnectWallet from '@dtravel/components/connectWallet/ConnectWallet'
import BasicButton from '@dtravel/components/ui/BasicButton'
import BasicPopup from '@dtravel/components/ui/BasicPopup'
import { getCancelPrice } from '@dtravel/helpers/api/booking'
import { PROVIDER_NETWORKS, RESERVATION_STATUS } from '@dtravel/helpers/constants/constants'
import { getChainId, getCurrentAccount, switchToBscNetwork, switchToETHNetwork } from '@dtravel/helpers/utils/ether'
import { cancelBookingSmartContract } from '@dtravel/helpers/utils/ether'
import { useAppDispatch } from '@dtravel/redux/hooks'
import { setToastError } from '@dtravel/redux/slices/common'
import React, { useEffect, useState } from 'react'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { isBSC } from '@dtravel/helpers/utils/common'

interface Props {
  propertyDetail: any
  handleChangeStatus: any
  bookingStatus: string
}

const CancelReservationCrypto: React.FC<Props> = ({ propertyDetail, handleChangeStatus, bookingStatus }) => {
  const { guestWallet, reservationId, propertyContract } = propertyDetail
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [data, setData] = useState<any>(null)
  const { color } = useTheme()

  useEffect(() => {
    const ethereum = typeof window === 'undefined' ? null : (window as any).ethereum
    if (ethereum)
      ethereum.on('accountsChanged', (accounts: string[]) => {
        setWalletAddress(accounts.length > 0 ? accounts[0] : '')
      })
  }, [])

  useEffect(() => {
    if (bookingStatus === RESERVATION_STATUS.CANCELLED) {
      if (isOpen) handleClose()
      if (isLoading) setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [bookingStatus])

  useEffect(() => {
    async function fetchMetamaskAccount() {
      const account = await getCurrentAccount()
      setWalletAddress(account)
    }
    if (isOpen) {
      fetchMetamaskAccount()
    }
  }, [isOpen])

  useEffect(() => {
    async function fetchCancelPrice(id: string, walletAddress: string) {
      try {
        const res: any = await getCancelPrice(id, walletAddress)
        if (res.success) {
          setData(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (reservationId && walletAddress) {
      fetchCancelPrice(reservationId, walletAddress)
    }
  }, [reservationId, walletAddress])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    if (!isLoading) {
      setIsLoading(true)
      try {
        const chainId = await getChainId()
        const currentChainId = PROVIDER_NETWORKS.find((v) => `${v.hex}` === `${chainId}` || `${v.decimal}` === `${chainId}`)
        const reservationChainId = PROVIDER_NETWORKS.find((v) => `${v.hex}` === `${propertyDetail?.chainId}` || `${v.decimal}` === `${propertyDetail?.chainId}`)
        if (currentChainId && reservationChainId && currentChainId?.decimal !== reservationChainId?.decimal) {
          if (isBSC(reservationChainId?.decimal)) await switchToBscNetwork()
          else await switchToETHNetwork()
        }
        await cancelBookingSmartContract(reservationId, guestWallet, propertyContract)
        handleChangeStatus(reservationId)
        // dispatch(setToastSuccess({ message: 'Cancel Reservation Successful!' }))
        // handleClose()
      } catch (err: any) {
        const dataRes = err.data
        if (dataRes) dispatch(setToastError({ message: dataRes.message }))
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col items-start">
      <p className="text-neutral-900 font-inter-400 text-16-24 mb-8">
        {'If you need to modify or cancel your reservation, please click below.'}
      </p>
      <BasicButton variant={'outlined'} clases={'w-full lg:w-auto'} onClick={handleOpen}>
        <span className="font-inter-500 text-neutral-900 text-16-20" style={color ? { color } : {}}>
          Modify Reservation
        </span>
      </BasicButton>
      <BasicPopup
        isOpen={isOpen}
        onClose={handleClose}
        title={walletAddress && walletAddress !== guestWallet ? 'Wrong Wallet Address' : 'Cancel Reservation'}
      >
        {walletAddress ? (
          walletAddress !== guestWallet ? (
            <p className={'font-inter-400 text-center text-16-24 pb-6'}>
              You are ineligible to cancel this booking because the connected wallet address is unassociated with the
              booking. Please try with another.
            </p>
          ) : (
            <div>
              <p className={'font-inter-400 text-center text-16-24 pb-6'}>
                Please acknowledge that there might be a booking penalty arising if you decide to cancel this
                reservation per the cancellation policy of the accommodation. The refund process will follow our Refund
                policy in our&nbsp;
                <a className="underline text-16-24" href={'/terms-and-conditions'} target={'_blank'} rel="noreferrer">
                  Terms and Conditions
                </a>
                .
              </p>
              <p className={'text-10-12 uppercase pb-3'}>REFUND DETAILS</p>
              <div className={'flex justify-between pb-3'}>
                <span className={'text-16-20 text-sand-6'}>Booking total paid</span>
                <span>
                  {data && (
                    <DtravelPrice price={Number(data.reservationFinalPrice)} currency={data.currency} isDynamic />
                  )}
                </span>
              </div>
              <div className={'flex justify-between'}>
                <span className={'text-16-20 text-sand-6'}>Cancellation fee</span>
                <span>
                  {data && (
                    <DtravelPrice
                      price={Number(data.reservationFinalPrice) - Number(data.refundAmount)}
                      currency={data.currency}
                      isDynamic
                    />
                  )}
                </span>
              </div>
              <div className={'h-[1px] w-full bg-sand-3 my-3'} />
              <div className={'flex justify-between'}>
                <span className={'text-16-20 text-sand-6'}>Refund amount</span>
                <span>
                  {data && <DtravelPrice price={Number(data.refundAmount)} currency={data.currency} isDynamic />}
                </span>
              </div>

              <div className={'mt-6'}>
                <BasicButton variant={'contained'} clases={'w-full'} onClick={handleClose}>
                  Keep this reservation
                </BasicButton>
              </div>
              <div className={'mt-3'}>
                <BasicButton variant={'outlined'} clases={'w-full'} onClick={handleSubmit} loading={isLoading}>
                  Still cancel this reservation
                </BasicButton>
              </div>
            </div>
          )
        ) : (
          <div className={'mt-8 text-center'}>
            <p className={'font-inter-400 mb-4'}>
              Please connect to the wallet address which was used to pay for this booking.
            </p>
            <ConnectWallet />
          </div>
        )}
      </BasicPopup>
    </div>
  )
}

export default CancelReservationCrypto
