import { getTokenContract } from '@dtravel/helpers/api/booking'
import { getConvertCurrency } from '@dtravel/helpers/api/property'
import { PROVIDER_NETWORKS, TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'
import { PriceReservation } from '@dtravel/helpers/interfaces/property'
import { getBalance, getBalanceETH, switchToBscNetwork, switchToETHNetwork } from '@dtravel/helpers/utils/ether'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setCryptoPayment } from '@dtravel/redux/slices/common'
import { shorterAddress } from '@dtravel/utils/common'
import { isEmpty } from '@dtravel/utils/common'
import { utils } from 'ethers'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ic_arrow_down from '@dtravel/assets/icons/ic_chevron_down.svg'
import ic_checked from '@dtravel/assets/icons/ic_check.svg'
import clsx from 'clsx'
import Popover from '@mui/material/Popover'
import { isBSC } from '@dtravel/helpers/utils/common'

interface Props {
  paymentMethods: Array<any>
  bookingPrices: PriceReservation
  propertyDetail: any
}
let tempBalance: any = {}

const BookingCrypto: React.FC<Props> = ({ paymentMethods, bookingPrices, propertyDetail }) => {
  const { accounts, chainId, cryptoPayment, typePayment, selectedCurrency } = useAppSelector((state) => state.common)
  const dispatch = useAppDispatch()
  const [tokenContract, setTokenContract] = useState<Array<any>>([])
  const [balances, setBalances] = useState<any>({})
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const propertyContracts: Array<any> = propertyDetail?.propertyContracts || []
  const paymentMethodCrypto: Array<any> = paymentMethods.filter((v) => v.type === 'CRYPTO')
  const paymentMethodCryptoEnabled: Array<any> = paymentMethodCrypto.filter((v) => {
    const isDisabled =
      (balances?.[v?.currency] && Number(balances[v?.currency] || 0) < bookingPrices?.finalPrice?.['USD']) ||
      !balances?.[v?.currency]
    return !isDisabled
  })
  const handleOpen = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    if (
      !isEmpty(paymentMethodCryptoEnabled) &&
      typePayment === TYPE_PAYMENT.CRYPTO &&
      !isEmpty(accounts) &&
      Object.keys(balances).length >= tokenContract.length
    ) {
      if (cryptoPayment) {
        // selected payment method before
        const itemActive = paymentMethodCryptoEnabled.find((v: any) => v?.currency === cryptoPayment)
        if (!itemActive) {
          const itCurrencySelect = paymentMethodCryptoEnabled.find((v: any) => v?.currency === selectedCurrency?.key)
          dispatch(setCryptoPayment(itCurrencySelect?.currency || paymentMethodCryptoEnabled[0]?.currency))
        }
      } else {
        // not select payment method before
        const itCurrencySelect = paymentMethodCryptoEnabled.find((v: any) => v?.currency === selectedCurrency?.key)
        dispatch(setCryptoPayment(itCurrencySelect?.currency || paymentMethodCryptoEnabled[0]?.currency))
      }
    } else {
      dispatch(setCryptoPayment(''))
    }
    // eslint-disable-next-line
  }, [paymentMethods, paymentMethodCryptoEnabled, typePayment, selectedCurrency])

  const fetchTokenContract = async () => {
    const networkItem = PROVIDER_NETWORKS.find((v) => v.hex === chainId)
    if (networkItem) {
      try {
        const res: any = await getTokenContract(networkItem?.decimal)
        if (res?.success) {
          const result = (res?.data || []).filter((v: any) => paymentMethodCrypto.find((el) => el.key === v.symbol))
          setTokenContract(result)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const fetchConvertCurrency = async (value: number | string, currency: string) => {
    try {
      const res = await getConvertCurrency(value, currency.toLowerCase())
      if (res?.success) {
        tempBalance = {
          ...tempBalance,
          [currency]: Number(res.data['USD'] || 0).toFixed(2),
        }
        setBalances(tempBalance)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchBalancesAll = () => {
    tokenContract.forEach(async (el: any) => {
      if (el.address) {
        if (el.address === "0x0000000000000000000000000000000000000000") {
          let balance = await getBalanceETH(accounts[0] || '')
          fetchConvertCurrency(utils.formatUnits(balance.toString(), el?.decimal).toString(), el?.symbol)
        } else {
          let balance = await getBalance(el.address, accounts[0] || '')
          fetchConvertCurrency(utils.formatUnits(balance.toString(), el.decimal).toString(), el.symbol)
        }
      }
    })
  }

  useEffect(() => {
    if (!isEmpty(tokenContract)) fetchBalancesAll()
    // eslint-disable-next-line
  }, [tokenContract])

  useEffect(() => {
    if (chainId && !isEmpty(paymentMethodCrypto)) fetchTokenContract()
    // eslint-disable-next-line
  }, [chainId, paymentMethods])
  const renderCryptoPayment = (item: any) => {
    const isChecked = cryptoPayment === item.key
    const isDisabled = Number(balances[item.key] || 0) < bookingPrices?.finalPrice?.['USD']
    if (!tokenContract.find((el: any) => el?.symbol === item?.currency)) return null
    return (
      <div
        className={clsx(
          'flex justify-between w-full lg:w-[calc(50%_-_16px)] items-center',
          isChecked ? 'border-grayscale-900 border-[2px]' : 'border-[0.5px] border-[#00000026] hover:border-[1px]',
          isDisabled ? 'cursor-not-allowed opacity-[0.64]' : 'cursor-pointer opacity-100 hover:border-grayscale-900',
          'rounded-2xl mt-4 lg:mx-[8px] p-[24px] radio-item-box'
        )}
        key={item.key}
        onClick={() => {
          if (!isDisabled) dispatch(setCryptoPayment(item.currency))
        }}
        role="presentation"
      >
        <div className='flex items-center'>
          <Image src={item.icon} alt="" width={24} height={24} className='w-[24px] h-[24px] min-w-[24px]' />
          <span className='text-16-20 text-grayscale-900 font-inter-500 ml-[12px]'>{item.currency}</span>
        </div>
        {isDisabled ?
          <span className="text-14-18 text-grayscale-600 font-inter-400">
            {'Insufficient balance'}
          </span> :
          <div
            className={`radio-item w-6 h-6 min-w-[24px] rounded-full ${isChecked ? 'border-8 border-grayscale-900 radio-checked' : 'border-2 border-grayscale-300'}`}
          />
        }
      </div>
    )
  }

  const label = process.env.NEXT_PUBLIC_SUPPORT_BSC_CHAIN_ID === '0x61' ? ' (Testnet)' : ''
  const open = Boolean(anchorEl)
  // const id = open ? 'popover-select-network' : undefined
  const isMultipleNetwork = Boolean(propertyContracts.find(v => !isBSC(v.chainId))) // default always support BSC  
  const isWrongNetwork = isMultipleNetwork ?
    chainId !== process.env.NEXT_PUBLIC_SUPPORT_BSC_CHAIN_ID && chainId !== process.env.NEXT_PUBLIC_SUPPORT_ETH_CHAIN_ID :
    chainId !== process.env.NEXT_PUBLIC_SUPPORT_BSC_CHAIN_ID
  const isBSCNetwork = isBSC(chainId)
  return (
    <>
      {accounts.map((el: string, idx: number) => {
        if (idx > 0) return null
        const network = PROVIDER_NETWORKS.find((v) => v.hex === chainId)
        return (
          <div className="flex items-start mt-[16px]" key={el}>
            <div
              className={clsx(
                'w-full border-[0.5px] text-14-18 text-grayscale-900 px-[24px] py-[14px] rounded-2xl flex items-center cursor-pointer',
                isWrongNetwork ? 'border-red-700' : 'border-[#00000026]',
              )}
              onClick={(e: React.MouseEvent<any>) => {
                if (isMultipleNetwork) handleOpen(e)
              }}
            >
              <div className={`w-[8px] h-[8px] rounded-[50%] mr-[8px] border ${isWrongNetwork ? 'bg-red-200 border-red-700' : 'bg-forest-200 border-forest-700'}`} />
              <div className="w-full flex flex-col font-inter-500">
                <span className={`uppercase text-12-16 ${isWrongNetwork ? 'text-red-700' : 'text-forest-700'}`}>
                  {network?.name}
                </span>
                <span className='text-12-16 text-grayscale-600'>{shorterAddress(el)}</span>
              </div>
              {isMultipleNetwork && <Image src={ic_arrow_down} alt="" width={24} height={24} />}
            </div>
          </div>
        )
      })}

      {!isWrongNetwork ? (
        <div className='flex flex-col lg:flex-row lg:mx-[-8px] flex-wrap lg:w-[calc(100%_+_16px)]'>
          {(paymentMethodCrypto || []).map((el: any) => renderCryptoPayment(el))}
        </div>
      ) : (
        <div className="bg-red-100 py-[16px] px-[24px] rounded-xl flex flex-col items-start mt-[16px]">
          <p className="text-14-18 text-grayscale-600 font-inter-400 mb-[12px]">
            {isMultipleNetwork ?
              `In order to transact on Dtravel, you'll need to switch to correct chain (BSC network, Ethereum).` :
              `In order to transact on Dtravel, you’ll need to switch to BNB Chain${label}`
            }&nbsp;
            <a
              className="underline"
              href={
                'https://www.notion.so/dtravel/How-to-Switch-from-the-Ethereum-Network-to-the-BNB-Smart-Chain-on-Dtravel-e0fdc3df6203452580f63ebbd63102ac'
              }
              target={'_blank'}
              rel="noreferrer"
            >
              Learn more
            </a>
          </p>
          {!isMultipleNetwork &&
            <p
              className="w-full md:w-[auto] text-center md:text-left px-[12px] py-[8px] bg-red-700 rounded-lg text-white text-12-16 cursor-pointer font-inter-500 whitespace-nowrap"
              onClick={switchToBscNetwork}
            >
              Switch to BNB Chain{label}
            </p>
          }
        </div>
      )}
      <Popover
        id={'select-locations'}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          '& .MuiPaper-root': {
            // width: '100%',
            height: 'auto',
            boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.16)',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            padding: '0 24px',
            marginTop: '8px'
          },
        }}
        PaperProps={{
          style: { width: anchorEl ? anchorEl.clientWidth : 0 },
        }}
      >
        <div>
          {[
            { name: 'BSC Network', key: 'bsc', isActived: isBSCNetwork && !isWrongNetwork },
            { name: 'Ethereum', key: 'eth', isActived: !isBSCNetwork && !isWrongNetwork },
          ].map((el: any) => {
            return (
              <div
                className={clsx(
                  'flex items-center justify-between py-4 cursor-pointer',
                  'shadow-[0px_1px_0px_0px_#E5E5E0]',
                )}
                key={el.key}
                onClick={() => {
                  if (!el?.isActived) {
                    if (el?.key === 'bsc') switchToBscNetwork()
                    else switchToETHNetwork()
                  }
                  handleClose()
                }}
              >
                <p className='text-14-18 font-inter-500 text-neutral-900'>{el.name}</p>
                {el?.isActived && !isWrongNetwork &&
                  <Image src={ic_checked} alt="" width={24} height={24} />
                }
              </div>
            )
          })}

        </div>
      </Popover>
    </>
  )
}
export default BookingCrypto
