import React, { useEffect, useState } from 'react'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@dtravel/redux/store'
import {
  CommonState,
  setIsOpenSelectCurrency,
  setSelectedCurrency,
  setListCurrency,
  setIsSelectedCurrencyByCountry,
} from '@dtravel/redux/slices/common'
import { getIpInfo, getSupportCurrencies } from '@dtravel/helpers/api/common'
import Image from 'next/image'
import BasicPopup from '@dtravel/components/ui/BasicPopup'
import BasicSwipeDrawer from '@dtravel/components/ui/BasicSwipeDrawer'
import { MAP_COUNTRY_AND_CURRENCY, MAP_ICON_CRYPTO_CURRENCY } from '@dtravel/helpers/constants/constants'
import { useRouter } from 'next/router'

const SelectCurrency = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const windowDimensions = useWindowDimensions()
  const [countryCode, setCountryCode] = useState<string>('')
  const { isOpenSelectCurrency, selectedCurrency, listCurrency }: CommonState = useSelector(
    (state: RootState) => state.common
  )

  useEffect(() => {
    const currencyStorage = window.localStorage.getItem('currency')
    // if we have storage selected currency => set selected
    if (currencyStorage) {
      dispatch(setSelectedCurrency(JSON.parse(currencyStorage)))
      dispatch(setIsSelectedCurrencyByCountry(false))
    } else {
      // if not => get currency by country
      const currencyByCountry = MAP_COUNTRY_AND_CURRENCY.get(countryCode)
      const currItem = listCurrency.find((curr: any) => curr.key === currencyByCountry)
      if (currItem) {
        dispatch(setSelectedCurrency(currItem))
        dispatch(setIsSelectedCurrencyByCountry(true))
      }
    }
    // eslint-disable-next-line
  }, [countryCode, listCurrency])

  useEffect(() => {
    async function fetchCurrencies() {
      const res = await getSupportCurrencies()
      if (res.success) {
        const convertData = Array.isArray(res.data)
          ? res.data.map((item: any) => {
              item.icon = MAP_ICON_CRYPTO_CURRENCY[item.key]
              return { ...item }
            })
          : []
        dispatch(setListCurrency(convertData))
      }
    }

    async function fetchCountryCodeByIp() {
      try {
        const res = await getIpInfo().then((res) => res.data)
        if (res.country) setCountryCode(res.countryCode)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCountryCodeByIp()
    fetchCurrencies()
    // eslint-disable-next-line
  }, [])

  const handleClose = () => {
    dispatch(setIsOpenSelectCurrency(false))
  }

  const onClickCurrencyItem = (data: any) => {
    dispatch(setSelectedCurrency(data))
    window.localStorage.setItem('currency', JSON.stringify(data))
    handleClose()
    // if merchant map view page: reset maxPrice
    if (router.pathname === '/[hostId]/property' || router.pathname === '/property') {
      const queryObj: any = { ...router.query }
      delete queryObj.minPrice
      delete queryObj.maxPrice
      router.push(
        {
          pathname: router.pathname,
          query: queryObj,
        },
        undefined,
        { scroll: false, shallow: true }
      )
    }
  }

  const renderContent = () => {
    return (
      <div>
        <p className={'text-16-20 lg:text-16-24 font-inter-500 text-neutral-700 mb-[16px]'}>Fiat Currencies</p>
        <div className={'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] mb-[32px]'}>
          {listCurrency
            .filter((item) => item.type === 'FIAT')
            .map((item) => {
              return (
                <button
                  key={item.key}
                  className={
                    'px-[16px] py-[12px] flex flex-col gap-[2px] rounded-[16px] border box-border ' +
                    `${selectedCurrency.key === item.key ? 'border-neutral-800 border-[2px]' : ' border-neutral-300'}`
                  }
                  onClick={() => onClickCurrencyItem(item)}
                >
                  <span className={'text-14-18 font-inter-400 text-neutral-600'}>{item.name}</span>
                  <span className={'text-14-18 font-inter-500 text-neutral-800'}>
                    {item.key} - {item.symbol}
                  </span>
                </button>
              )
            })}
        </div>

        <p className={'text-16-20 lg:text-16-24 font-inter-500 text-neutral-700 mb-[16px]'}>Cryptocurrencies</p>
        <div className={'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px]'}>
          {listCurrency
            .filter((item) => item.type === 'CRYPTO')
            .map((item) => {
              return (
                <button
                  key={item.key}
                  className={
                    'px-[16px] py-[12px] flex items-center gap-[12px] rounded-[16px] border box-border ' +
                    `${selectedCurrency.key === item.key ? 'border-neutral-800 border-[2px]' : ' border-neutral-300'}`
                  }
                  onClick={() => onClickCurrencyItem(item)}
                >
                  <div>
                    {item.icon ? <Image src={item.icon} alt={item.name} width={24} height={24} /> : <>{item.symbol}</>}
                  </div>
                  <div className={'flex flex-col items-start gap-[2px]'}>
                    <span className={'text-14-18 font-inter-400 text-neutral-600'}>{item.name}</span>
                    <span className={'text-14-18 font-inter-500 text-neutral-800'}>{item.symbol}</span>
                  </div>
                </button>
              )
            })}
        </div>
      </div>
    )
  }

  if (windowDimensions.width >= 1024) {
    return (
      <BasicPopup
        isOpen={isOpenSelectCurrency}
        onClose={handleClose}
        title={'Select currency'}
        padding={'32px'}
        allowBackdropClick
        maxWidth={'md'}
      >
        {renderContent()}
      </BasicPopup>
    )
  }
  return (
    <BasicSwipeDrawer
      isOpen={isOpenSelectCurrency}
      onClose={handleClose}
      title={'Select currency'}
      titleAlign={'center'}
    >
      {renderContent()}
    </BasicSwipeDrawer>
  )
}

export default SelectCurrency
