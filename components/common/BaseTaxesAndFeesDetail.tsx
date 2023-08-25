import { FEES_AND_DISCOUNT } from '@dtravel/helpers/constants/constants'
import { PriceReservation } from '@dtravel/helpers/interfaces/property'
import { isEmpty } from '@dtravel/utils/common'
import React from 'react'
import DtravelPrice from './DtravelPrice'

interface Props {
  priceInfo: PriceReservation
  currencyDisplay: string
  feeData?: Array<any>
  taxData?: Array<any>
  discountData?: Array<any>
  addonsData?: Array<any>
  total?: number
}

const BaseTaxesAndFeesDetail: React.FC<Props> = ({
  priceInfo,
  currencyDisplay,
  feeData,
  taxData,
  discountData,
  addonsData,
  total
}) => {
  const { priceDetail, exchangeRate } = priceInfo
  const rate = exchangeRate && exchangeRate.rates ? exchangeRate.rates[currencyDisplay] : 1

  return (
    <div className="font-inter-400 max-h-[360px] overflow-auto mx-[-16px] px-4">
      {/* FEE */}
      {(feeData || []).map((fee, index) => {
        return (
          <div key={'fee-' + index} className={'flex justify-between mb-2 text-neutral-600 text-14-18 font-inter-400'}>
            <div className="flex items-center pr-[16px]">{fee.title || FEES_AND_DISCOUNT[fee.name]}</div>
            <span className="text-neutral-900 font-inter-500">
              <DtravelPrice price={Number(fee.total || fee.value) * rate} currency={currencyDisplay} />
            </span>
          </div>
        )
      })}

      {/* TAX */}
      {(taxData || []).map((tax, index) => {
        return (
          <div key={'tax-' + index} className={'flex justify-between mb-2 text-neutral-600 text-14-18 font-inter-400'}>
            <div className="flex items-center pr-[16px]">{tax.title || FEES_AND_DISCOUNT[tax.name]}</div>
            <span className="text-neutral-900 font-inter-500">
              <DtravelPrice price={Number(tax.total || tax.value) * rate} currency={currencyDisplay} />
            </span>
          </div>
        )
      })}
      {/* Add-ons */}
      {(addonsData || []).map((addon, index) => {
        return (
          <div
            key={'addon-' + index}
            className={'flex justify-between mb-2 text-neutral-600 text-14-18 font-inter-400'}
          >
            <div className="flex items-center pr-[16px]">{addon.name}</div>
            <span className="text-neutral-900 font-inter-500">
              <DtravelPrice price={Number(addon.total || addon.value) * rate} currency={currencyDisplay} />
            </span>
          </div>
        )
      })}

      {/* DISCOUNTS */}
      {(discountData || []).map((discount, index) => {
        return (
          <div
            key={'discount-' + index}
            className={'flex justify-between mb-2 text-neutral-600 text-14-18 font-inter-400'}
          >
            <div className="flex items-center pr-[16px]">{discount.title || FEES_AND_DISCOUNT[discount.name]}</div>
            <span className="text-forest-700 font-inter-500">
              <DtravelPrice price={Number(discount.total || discount.value) * rate} currency={currencyDisplay} />
            </span>
          </div>
        )
      })}
      <div className="w-full flex justify-between font-inter-500 text-neutral-800 text-16-20 border-t border-t-neutral-300 pt-4">
        <span>Total</span>
        {(!isEmpty(feeData) || !isEmpty(taxData)) && (
          <DtravelPrice price={Number((total || 0) * rate)} currency={currencyDisplay} />
        )}
        {!isEmpty(addonsData) && (
          <DtravelPrice price={Number(priceDetail.totalAddOns.value * rate)} currency={currencyDisplay} />
        )}
        {!isEmpty(discountData) && (
          <DtravelPrice price={Number(priceDetail.totalDiscount.value * rate)} currency={currencyDisplay} />
        )}
      </div>
    </div>
  )
}

export default BaseTaxesAndFeesDetail
