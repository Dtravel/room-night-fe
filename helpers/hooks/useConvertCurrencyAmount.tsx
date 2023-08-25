import { RateData } from '../interfaces/property'


export const useConvertCurrencyAmount = (amount: number | string, from: string, targetCurrency: string, rates: RateData[]) => {
  const fromRate = rates.find((v: RateData) => v.key === from)
  const toRate = rates.find((v: RateData) => v.key === targetCurrency)
  if (fromRate && toRate) {
    return Number(amount) * Number(fromRate.rate) / Number(toRate.rate)
  } else return amount
}