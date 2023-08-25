import { DOMAIN_TYPE, RESERVATION_STATUS, TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'
import { IResponse, TypePayment } from '@dtravel/helpers/interfaces'
import moment from 'moment'
import { DateTime } from 'luxon'
import { RateData } from '@dtravel/helpers/interfaces/property'

const has = Object.prototype.hasOwnProperty
export const isEmpty = (prop: any) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  )
}
export function isEmailValid(email: string) {
  // let re =
  // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // let re = /^[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+$/
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const isURL = (url: string) => {
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  const regex = new RegExp(expression)
  return url.match(regex)
}
export const isIP = (address: string) => {
  const regex = RegExp(
    '^http[s]?://((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])'
  )
  return regex.test(address)
}
export const shorterAddress = (address: string) => {
  if (address) {
    return address.substring(0, 10) + '...' + address.substring(address.length - 5)
  }
  return ''
}

export const isOnlyLetters = (str: string) => {
  // eslint-disable-next-line no-control-regex
  const letters = /^[^\u0000-\u001F\u0021-\u0040\u005B-\u0060\u007B-\u007E\u0080-\u009F\u00A0-\u00BF\u00D7\u00F7]*$/g
  // const letters = /^[a-zA-Z][a-zA-Z\s]*$/
  return str.match(letters)
}

export const isNumber = (str: string) => {
  const numberRegex = /^[0-9]+$/
  return str.match(numberRegex)
}

export const isPostalCode = (str: string) => {
  const postalPattern = /^[0-9A-Za-z\- ]+$/
  return postalPattern.test(str)
}

export const output = (res?: any): IResponse => ({
  ok: true,
  result: res,
})

export const error = (code?: number, msg?: string, data?: any): IResponse => ({
  ok: false,
  code,
  msg,
  data,
})

export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getKeys = <T extends {}>(o: T): Array<keyof T> => <Array<keyof T>>Object.keys(o)

export const showStatusBooking = (status: string) => {
  if (status === RESERVATION_STATUS.AWAITING_PAYMENT) return 'processing'
  if (
    status === RESERVATION_STATUS.CONFIRMED ||
    status === RESERVATION_STATUS.NEW ||
    status === RESERVATION_STATUS.MODIFIED
  )
    return 'confirmed'
  if (status === RESERVATION_STATUS.CANCELLED) return 'cancelled'
  return status
}
export const showDateRange = (checkIn: string, checkOut: string) => {
  if (moment(checkIn).format('YYYY') !== moment(checkOut).format('YYYY'))
    return `${moment(checkIn).format('MMM DD, YYYY')} - ${moment(checkOut).format('MMM DD, YYYY')}`
  if (moment(checkIn).format('MMM') !== moment(checkOut).format('MMM'))
    return `${moment(checkIn).format('MMM DD')} - ${moment(checkOut).format('MMM DD, YYYY')}`
  return `${moment(checkIn).format('MMM DD')} - ${moment(checkOut).format('DD, YYYY')}`
}
export const convertAmPm = (hour: number) => {
  if (hour !== null && hour !== undefined && !isNaN(hour)) {
    if (hour > 12) return `${hour - 12}` + ':00 PM'
    if (hour === 12) return '12:00 PM'
    return hour + ':00 AM'
  }
  return ''
}

export const convertTimeZone = (timezone: string) => {
  const d = DateTime.local().setZone(timezone)
  return d.offsetNameShort
}

export const convertRating = (rating: string | number, toFixed?: number) => {
  const convertedRating = Number(rating || 0) / 2
  if (toFixed) {
    const reminder = convertedRating - Math.floor(convertedRating)
    return reminder > 0 ? Number(convertedRating.toFixed(toFixed)) : convertedRating
  }
  return convertedRating
}

export const convertCurrencyAmount = (
  amount: number | string,
  from: string,
  targetCurrency: string,
  rates: RateData[]
) => {
  const fromRate = rates.find((v: RateData) => v.key === from)
  const toRate = rates.find((v: RateData) => v.key === targetCurrency)
  if (fromRate && toRate) {
    return (Number(amount) * Number(fromRate.rate)) / Number(toRate.rate)
  } else return amount
}

export const getImageUrlSpecial = (name: string, isMobile?: boolean) => {
  const IMG_CDN = `${process.env.NEXT_PUBLIC_IMAGE_CDN}/gallery`
  const result = `${IMG_CDN}/${name}`
  return `${result}${isMobile ? '?w=640' : '?w=1080'}`
}
export const converHostDomain = (hostDomain: string) => {
  return hostDomain
    ?.replace('localhost:3000', process.env.NEXT_PUBLIC_SITE_URL_DOMAIN || 'dataismist.com')
    ?.replace(':3000', '')
    ?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    .split('/')[0]
}
export const checkRedirectActived = (settingUrl: any, hostDomain: string) => {
  const domain = converHostDomain(hostDomain)
  return (
    settingUrl?.customId &&
    ((settingUrl?.type === DOMAIN_TYPE.CUSTOM &&
      domain !== `${settingUrl?.customId}.${process.env.NEXT_PUBLIC_SITE_URL_DOMAIN}`) ||
      (settingUrl?.type === DOMAIN_TYPE.SELF_HOSTED && hostDomain !== settingUrl?.customId))
  )
}

export const convertSubPaymentMethod = (paymentType: TypePayment) => {
  // https://stripe.com/docs/api/charges/object#charge_object-payment_method_details-type
  // card, apple_pay, google_pay, affirm, afterpay_clearpay, klarna, alipay, paynow.....
  const MAPPING_VALUES = {
    [TYPE_PAYMENT.CREDIT_CARD]: 'card',
    [TYPE_PAYMENT.CRYPTO]: 'crypto',
    [TYPE_PAYMENT.APPLE_PAY]: 'apple_pay',
    [TYPE_PAYMENT.GOOGLE_PAY]: 'google_pay',
    [TYPE_PAYMENT.AFFIRM_PAY]: 'affirm',
    [TYPE_PAYMENT.AFTER_PAY]: 'afterpay_clearpay',
    [TYPE_PAYMENT.KLARNA_PAY]: 'klarna',
  }
  return paymentType ? MAPPING_VALUES[paymentType] : ''
}
export const getPropertyTitleSite = (propertyName: string, userId: string, siteName: string) => {
  if (siteName) return `${siteName || ''} | ${propertyName || ''}`
  return `Dtravel | ${propertyName || ''}`
}
export const renderLocationsMetaData = (locations: any[]) => {
  if (!isEmpty(locations)) {
    const countries: string[] = locations.map((v: any) => v.country)
    return `in ${[...new Set(countries)].join(', ')}`
  }
  return ''
}
export const canParseJSON = (str: any) => {
  try {
    JSON.parse(str)
    return true // can be parsed to JSON
  } catch (error) {
    return false // cannot be parsed to JSON
  }
}
export const removeEmptyFields = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !isEmpty(v)))
}
export const showLocation = (city: string, state: string, country: string) => {
  return [city, state, country].filter((v) => !isEmpty(v)).join(', ')
}
