import { convertCurrency, convertCurrencySymbol, isCryptoCurrency, numberWithCommas } from '@dtravel/helpers/utils/common'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MAP_ICON_CRYPTO_CURRENCY } from '@dtravel/helpers/constants/constants'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {
  price: number
  currency?: string
  isDynamic?: boolean
  isRounded?: boolean
  isDiscount?: boolean
  isOriginal?: boolean
}


const DtravelPrice: React.FC<Props> = ({ price, currency, isDynamic, isRounded, isDiscount, isOriginal }) => {
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const currencySelected = currency || selectedCurrency.key || 'USD'
  const [converted, setConverted] = useState('')
  const isSpecialCurrency = currencySelected === "VND" || currencySelected === "KRW"
  const isCrypto = isCryptoCurrency(currencySelected as string)
  const isETH = currency === 'ETH'

  useEffect(() => {
    if (isOriginal) {
      setConverted(String(price))
    } else {
      const numberCommas = isSpecialCurrency ? 0 : isETH ? 6 : 2
      // const amountPreConvert = isSpecialCurrency ? Number(Number(price).toFixed(0)) : Number(Number(price).toFixed(2))
      // const amount = isDynamic ? amountPreConvert : isSpecialCurrency ? Number(price).toFixed(0) : Number(price).toFixed(2)
      const amount = Number(price).toFixed(numberCommas)
      if (typeof amount !== 'number' && !amount) {
        setConverted('')
      } else {
        const amountToString = String(Number(amount) < 0 ? -1 * Number(amount) : Number(amount))
        const arrSplit = amountToString.split('.')
        if (arrSplit[1]) {
          // case số thập phân, có phần nguyên
          if (arrSplit[1].length === 1) {
            arrSplit[1] = arrSplit[1] + '0'
          } else {
            // case có từ 2 chữ số sau dấu phẩy trở lên => GIỮ NGUYÊN
          }
        } else {
          // case số nguyên, ko có phần thập phân sau dấu phẩy
          arrSplit[1] = isRounded || isSpecialCurrency ? '' : '00'
        }
        let newAmount = arrSplit.filter((v) => v !== '').join('.')
        setConverted(newAmount)
      }
    }
    // eslint-disable-next-line
  }, [price, currencySelected, isDynamic, isRounded, isOriginal])

  if (isDynamic) {
    let icon = null
    if (currencySelected) {
      icon = MAP_ICON_CRYPTO_CURRENCY[currencySelected.toUpperCase()]
    }

    return (
      <span className="inline-flex items-center">
        {icon ? (
          <Image src={icon} alt="" width={24} height={24} />
        ) : (
          <>{convertCurrencySymbol(currencySelected)}</>
        )}
        <span className="ml-2 mb-[-2px]">
          {convertCurrency(converted.toString())}&nbsp;{currencySelected}
        </span>
      </span>
    )
  }

  return (
    <span className='whitespace-nowrap'>
      {(price < 0 || isDiscount) && '-'}
      {convertCurrencySymbol(currencySelected)}
      {isCrypto && <>&nbsp;</>}
      {numberWithCommas(converted)}
    </span>
  )
}

export default DtravelPrice
