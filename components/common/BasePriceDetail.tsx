import { PriceReservation } from '@dtravel/helpers/interfaces/property'
import { isEmpty } from '@dtravel/utils/common'
import moment from 'moment'
import React from 'react'
import DtravelPrice from './DtravelPrice'

interface Props {
  priceInfo: PriceReservation
  currencyDisplay: string
}

const BasePriceDetail: React.FC<Props> = ({ priceInfo, currencyDisplay }) => {
  const { baseRateDetail, calendar, price, basePricePerNight, nights, exchangeRate } = priceInfo
  const rate = exchangeRate && exchangeRate.rates ? exchangeRate.rates[currencyDisplay] : 1
  const isShowAverage = nights >= 8 || isEmpty(baseRateDetail)
  if (isShowAverage) {
    return (
      <span className="font-inter-400 w-full flex text-sand-6 text-16-20 whitespace-nowrap">
        The average base price per night is rounded by&nbsp;
        <DtravelPrice price={Number(basePricePerNight * rate)} currency={currencyDisplay} />.
      </span>
    )
  }

  return (
    <div className="font-inter-400">
      {Array.isArray(baseRateDetail) && baseRateDetail.length > 0 ? (
        baseRateDetail.map((item: any, idx: number) => {
          return (
            <div key={idx} className="w-full flex justify-between text-neutral-600 text-14-18 mb-4">
              <span className="text-neutral-600 font-inter-400">{moment(item.date).format('MMM DD, YYYY')}</span>
              <span className="text-neutral-900 font-inter-500">
                <DtravelPrice price={Number(item.value * rate)} currency={currencyDisplay} />
              </span>
            </div>
          )
        })
      ) : Array.isArray(calendar) && calendar.length > 0 ? (
        <>
          {/*Manual reservation still use calendar (v1 price) */}
          {calendar.map((el: any, idx: number) => {
            return (
              <div key={idx} className="w-full flex justify-between text-neutral-600 text-14-18 mb-4">
                <span className="text-neutral-600 font-inter-400">{moment(el?.date).format('MMM DD, YYYY')}</span>
                <span className="text-neutral-900 font-inter-500">
                  <DtravelPrice price={Number(el.price?.[currencyDisplay] || 0)} currency={currencyDisplay} />
                </span>
              </div>
            )
          })}
        </>
      ) : null}
      <div className="w-full flex justify-between text-neutral-800 text-14-18 font-inter-500 border-t border-t-sand-3 pt-4">
        <span>Total Base Price</span>
        <DtravelPrice price={Number(price * rate)} currency={currencyDisplay} />
      </div>
    </div>
  )
}

export default BasePriceDetail
