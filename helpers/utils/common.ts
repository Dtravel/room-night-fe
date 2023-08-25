import { getCalendar } from '@dtravel/helpers/api/property'
import { DATE_FORMAT, DOMAIN_TYPE, MONTH_FORMAT, PROVIDER_NETWORKS } from '@dtravel/helpers/constants/constants'
import { PriceAvailability, SettingUrlProps } from '@dtravel/helpers/interfaces'
import { setDisabledDatesMap, setCalendarDatesMap, setIsDisableCalendar } from '@dtravel/redux/slices/property'
import { store } from '@dtravel/redux/store'
import { isEmpty } from '@dtravel/utils/common'
import moment, { Moment } from 'moment'
import queryString from 'query-string'

export const isMobileDevice = (UA?: any) => {
  try {
    const userAgent = UA || navigator.userAgent || navigator.vendor || (window as any).opera
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|WPDesktop/i.test(userAgent)
  } catch (e) {
    return false
  }
}

export const getNearestInValidDate = (checkIn: Moment, calendarDatesMap: any) => {
  const groupCalendar = []
  for (let i = 0; i < 12; i++) {
    const nextMonth = moment(checkIn).add(i, 'month')
    const keyMonth = nextMonth.format('YYYY-MM')
    if (Array.isArray(calendarDatesMap.get(keyMonth))) {
      groupCalendar.push(calendarDatesMap.get(keyMonth))
    }
  }
  const fullCalendar = groupCalendar.flatMap((x) => x)
  const indexCheckIn = fullCalendar.findIndex((item: any) => item.date === checkIn.format(DATE_FORMAT))
  if (indexCheckIn === -1) {
    return null
  }
  const length = fullCalendar.length
  let indexNearestInValid
  for (let i = indexCheckIn; i < length; i++) {
    if (!fullCalendar[i].bookable) {
      if (fullCalendar[i].closedOnCheckout) {
        indexNearestInValid = i
      } else {
        indexNearestInValid = i + 1
      }
      break
    }
  }
  return indexNearestInValid && fullCalendar[indexNearestInValid] ? fullCalendar[indexNearestInValid].date : null
}

export const getAveragePrice7Days = (calendarDatesMap: any) => {
  const groupCalendar = []
  for (let i = 0; i < 2; i++) {
    const nextMonth = moment().add(i, 'month')
    const keyMonth = nextMonth.format('YYYY-MM')
    if (Array.isArray(calendarDatesMap.get(keyMonth))) {
      groupCalendar.push(calendarDatesMap.get(keyMonth))
    }
  }
  const fullAvailable = groupCalendar
    .flatMap((x) => x)
    .filter((x) => moment(x.date, DATE_FORMAT).startOf('day').isSameOrAfter(moment().startOf('day')))
  if (Array.isArray(fullAvailable) && fullAvailable.length > 0) {
    const split7Days = fullAvailable.slice(0, 7)
    const totalPrice7Days = split7Days.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price
    }, 0)
    return totalPrice7Days / split7Days.length
  }
  return 0
}

export const firstTimeLoadCalendar = async (hostId: string, pmsPropertyId: string) => {
  const parsed = queryString.parse(window.location.search)
  const checkIn = parsed.check_in ? moment(parsed.check_in as string, DATE_FORMAT) : moment()

  const paramsStartDate = moment(checkIn).startOf('months').format(DATE_FORMAT)
  const paramsEndDate = moment(checkIn).add(3, 'month').endOf('months').format(DATE_FORMAT)
  // call api get calendar availability
  try {
    const res = await getCalendar(hostId, pmsPropertyId, paramsStartDate, paramsEndDate)
    store.dispatch(setIsDisableCalendar(false))
    const keyCurrentMonth = moment(checkIn).format(MONTH_FORMAT)
    const keyAddOneMonth = moment(checkIn).add(1, 'month').format(MONTH_FORMAT)
    const keyAddTwoMonth = moment(checkIn).add(2, 'month').format(MONTH_FORMAT)
    const keyAddThreeMonth = moment(checkIn).add(3, 'month').format(MONTH_FORMAT)
    // disabled dates
    const disabledDatesCurrentMonth: any = new Set<string>()
    const disabledDatesAddOneMonth: any = new Set<string>()
    const disabledDatesAddTwoMonth: any = new Set<string>()
    const disabledDatesAddThreeMonth: any = new Set<string>()
    // all calenar dates
    const calendarDatesCurrentMonth: any[] = []
    const calendarDatesAddOneMonth: any[] = []
    const calendarDatesAddTwoMonth: any[] = []
    const calendarDatesAddThreeMonth: any[] = []

    res.data.forEach((item: PriceAvailability) => {
      // const isBlocked = item.status === 'reserved'
      // const isBlocked = item.closedOnCheckin && item.closedOnCheckout
      const isBlocked = !item.bookable && item.closedOnCheckout
      if (isBlocked) {
        if (item.date.includes(keyCurrentMonth)) {
          disabledDatesCurrentMonth.add(item.date)
        }
        if (item.date.includes(keyAddOneMonth)) {
          disabledDatesAddOneMonth.add(item.date)
        }
        if (item.date.includes(keyAddTwoMonth)) {
          disabledDatesAddTwoMonth.add(item.date)
        }
        if (item.date.includes(keyAddThreeMonth)) {
          disabledDatesAddThreeMonth.add(item.date)
        }
      }
      if (item.date.includes(keyCurrentMonth)) {
        calendarDatesCurrentMonth.push(item)
      }
      if (item.date.includes(keyAddOneMonth)) {
        calendarDatesAddOneMonth.push(item)
      }
      if (item.date.includes(keyAddTwoMonth)) {
        calendarDatesAddTwoMonth.push(item)
      }
      if (item.date.includes(keyAddThreeMonth)) {
        calendarDatesAddThreeMonth.push(item)
      }
    })
    const disabledMap = new Map()
    disabledMap.set(keyCurrentMonth, disabledDatesCurrentMonth)
    disabledMap.set(keyAddOneMonth, disabledDatesAddOneMonth)
    disabledMap.set(keyAddTwoMonth, disabledDatesAddTwoMonth)
    disabledMap.set(keyAddThreeMonth, disabledDatesAddThreeMonth)
    store.dispatch(setDisabledDatesMap(disabledMap))

    const calendardMap = new Map()
    calendardMap.set(keyCurrentMonth, calendarDatesCurrentMonth)
    calendardMap.set(keyAddOneMonth, calendarDatesAddOneMonth)
    calendardMap.set(keyAddTwoMonth, calendarDatesAddTwoMonth)
    calendardMap.set(keyAddThreeMonth, calendarDatesAddThreeMonth)
    store.dispatch(setCalendarDatesMap(calendardMap))
  } catch (err: any) {
    if (err?.status === 401) {
      // expired api key
      store.dispatch(setIsDisableCalendar(true))
    }
  }
}

export const loadCalendarNextAndPrev = async ({
  currentDate,
  type,
  currentCalendardMap,
  currentDisabledMap,
  hostId,
  pmsPropertyId,
}: {
  currentDate: Moment
  type: 'next' | 'prev'
  currentCalendardMap: any
  currentDisabledMap: any
  hostId: string
  pmsPropertyId: string
}) => {
  let start = moment(currentDate).add(0, 'month').startOf('month')
  let end = moment(currentDate).add(3, 'month').endOf('month')
  if (type === 'prev') {
    // click preview month
    start = moment(currentDate).add(-3, 'month').startOf('month')
    end = moment(currentDate).add(0, 'month').endOf('month')
  }
  const paramsStartDate = moment(start).format(DATE_FORMAT)
  const paramsEndDate = moment(end).format(DATE_FORMAT)

  const disabledDates: any = {}
  const calendarDates: any = {}
  const months = type === 'prev' ? [-3, -2, -1, 0] : [0, 1, 2, 3]
  for (let m of months) {
    const key = moment(currentDate).add(m, 'month').format(MONTH_FORMAT)
    disabledDates[key] = new Set()
    calendarDates[key] = []
  }

  // call api get calendar availability
  try {
    const res = await getCalendar(hostId, pmsPropertyId, paramsStartDate, paramsEndDate)
    store.dispatch(setIsDisableCalendar(false))
    res.data.forEach((item: PriceAvailability) => {
      for (let key in calendarDates) {
        if (item.date.includes(key)) {
          calendarDates[key].push(item)
          // const isBlocked = item.closedOnCheckin && item.closedOnCheckout
          const isBlocked = !item.bookable && item.closedOnCheckout
          if (isBlocked) {
            disabledDates[key].add(item.date)
          }
        }
      }
    })
    const cloneDisabledMap = new Map(currentDisabledMap)
    for (let key in disabledDates) {
      cloneDisabledMap.set(key, disabledDates[key])
    }
    store.dispatch(setDisabledDatesMap(cloneDisabledMap))

    const cloneCalendarMap = new Map(currentCalendardMap)
    for (let key in calendarDates) {
      cloneCalendarMap.set(key, calendarDates[key])
    }
    store.dispatch(setCalendarDatesMap(cloneCalendarMap))
  } catch (err: any) {
    if (err?.status === 401) {
      // expired api key
      store.dispatch(setIsDisableCalendar(true))
    }
  }
}

export const convertChainIdToNumber = (hexChainId: string) => {
  const item = PROVIDER_NETWORKS.find((v) => v.hex === hexChainId || v.decimal === hexChainId)
  return Number(item?.decimal || 0)
}
export const numberWithCommas = (x: number | string) => {
  let result = x
    .toString()
    .split('.')
    .map((el: string, idx: number) => (idx === 0 ? el?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : el))
  return result.join('.')
}
export const convertCurrency = (amount: string) => {
  const result = amount.toString().split('.')
  return `${numberWithCommas(Number(result[0]))}.${result[1] || '00'}`
}

export const isScrolledIntoView = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const elemTop = rect.top
  const elemBottom = rect.bottom
  return elemTop >= 0 && elemBottom <= window.innerHeight
}

export const capitalizeFirstLetter = (str: string) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}
export const capitalizeLetter = (str: string) => {
  return (str || '')
    .split(' ')
    .map((v: string) => capitalizeFirstLetter(v))
    .join(' ')
}
export const removeDuplicate = (arr: any[], key?: string) => {
  return [...new Map(arr.map((item) => [item[key || 'id'], item])).values()]
}
export const convertCurrencySymbol = (currency: string) => {
  if (currency && currency.toUpperCase() === 'USD') return '$'
  if (currency && currency.toUpperCase() === 'GBP') return '£'
  if (currency && currency.toUpperCase() === 'EUR') return '€'
  if (currency && currency.toUpperCase() === 'AUD') return 'AU$'
  if (currency && currency.toUpperCase() === 'SGD') return 'S$'
  if (currency && currency.toUpperCase() === 'CAD') return 'CA$'
  if (currency && currency.toUpperCase() === 'HKD') return 'HK$'
  if (currency && currency.toUpperCase() === 'CNY') return '¥'
  if (currency && currency.toUpperCase() === 'NZD') return 'NZ$'
  if (currency && currency.toUpperCase() === 'INR') return '₹'
  if (currency && currency.toUpperCase() === 'VND') return '₫'
  if (currency && currency.toUpperCase() === 'AED') return 'د.إ'
  if (currency && currency.toUpperCase() === 'KRW') return '₩'
  if (currency && currency.toUpperCase() === 'BRL') return 'R$'
  if (currency && currency.toUpperCase() === 'THB') return '฿'
  return currency
}
export const isCryptoCurrency = (currency: string) => {
  const cryptoItem = ['BTC', 'ETH', 'USDT', 'BUSD', 'USDC', 'TRVL', 'USDT6'].find((it: string) => it === currency)
  return Boolean(cryptoItem)
}
export const genDomain = (context: any, settingUrl: SettingUrlProps) => {
  const { ...otherQuery } = context?.query || {}
  delete otherQuery?.hostId
  delete otherQuery?.propertyId
  const paramsSearch = queryString.stringify({ ...otherQuery })
  let domain = process.env.NEXT_PUBLIC_SITE_URL
  if (settingUrl?.customId && settingUrl.type === DOMAIN_TYPE.CUSTOM) {
    domain = process.env.NEXT_PUBLIC_SITE_URL?.replace('http://', `http://${settingUrl?.customId}.`)
      ?.replace('https://', `https://${settingUrl?.customId}.`)
      .replace('.guest.', `.`)
  }
  if (settingUrl?.customId && settingUrl.type === DOMAIN_TYPE.SELF_HOSTED) {
    domain = `https://${settingUrl?.customId}`
  }
  return { domain, paramsSearch }
}
export const genDomainDefault = (context: any) => {
  const { ...otherQuery } = context?.query || {}
  delete otherQuery?.hostId
  delete otherQuery?.propertyId
  const paramsSearch = queryString.stringify({ ...otherQuery })
  let domain = process.env.NEXT_PUBLIC_SITE_URL
  return { domain, paramsSearch }
}
export const isUserId = (id: string) => {
  return id && id.length >= 36
}

export const filterReview = (total: any[]) => {
  const totalReviewHasContent = total.filter((v: any) => !isEmpty(v?.publicReview?.trim()))
  if (totalReviewHasContent?.length >= 10) return totalReviewHasContent
  return total
  // let numberEmpty = 10 - totalReviewHasContent.length
  // let result: any[] = []
  // total.forEach((el: any) => {
  //   if (!isEmpty(el?.publicReview?.trim())) result.push(el)
  //   else if (numberEmpty > 0) {
  //     numberEmpty -= 1
  //     result.push(el)
  //   }
  // })
  // return result
}
export const isBSC = (chainId: string) => {
  return `${chainId}` === '0x38' || `${chainId}` === '56' || `${chainId}` === '0x61' || `${chainId}` === '97'
}
