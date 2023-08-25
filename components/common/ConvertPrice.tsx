import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@dtravel/redux/store'
import { convertCurrency } from '@dtravel/helpers/api/common'
import DtravelPrice from '@dtravel/components/common/DtravelPrice'

interface Props {
  price: number
  baseCurrency: string
}

const ConvertPrice: React.FC<Props> = ({ price, baseCurrency }) => {
  const { selectedCurrency } = useSelector((state: RootState) => state.common)
  const [convertedPrice, setConvertedPrice] = useState<number>(price)

  useEffect(() => {
    async function fetchConvertCurrency() {
      const res = await convertCurrency(price, baseCurrency || 'usd', selectedCurrency.key)
      if (res.data) {
        setConvertedPrice(res.data[selectedCurrency.key])
      }
    }
    if (price && baseCurrency !== selectedCurrency.key) {
      fetchConvertCurrency()
    } else {
      setConvertedPrice(price)
    }
  }, [selectedCurrency, price, baseCurrency])

  return (
    <DtravelPrice
      price={convertedPrice}
      currency={selectedCurrency.key}
      isDynamic={selectedCurrency.type === 'CRYPTO'}
    />
  )
}

export default ConvertPrice
