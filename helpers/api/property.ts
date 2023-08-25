import api from './api'
import { ReservationAvailabilityData } from '@dtravel/helpers/interfaces/property'
import { ReviewParamsProps } from '../interfaces'

export const getPropertyDetail = (hostId: string, propertyId: string) => {
  const options: any = {
    method: 'get',
    url: '/listing-service/v2/property/' + hostId + '/' + propertyId,
  }
  return api(options).then((res) => res.data)
}

/**
 * Returns array availability for each day.
 *
 * @param {string} hostAddress The wallet address of host
 * @param {string} listingId The hostaway id
 * @param {string} startDate Date from, format YYYY-MM-DD.
 * @param {string} endDate Date to, format YYYY-MM-DD.
 * @return {Promise} array availability for each day.
 */
export const getCalendar = (hostAddress: string, listingId: string, startDate: string, endDate: string) => {
  return api({
    method: 'get',
    // url: '/integration-service/calendar',
    url: '/listing-service/calendar',
    params: { hostAddress, listingId, startDate, endDate },
  })
    .then((res) => res.data)
    .then((res) => {
      if (!res.success) {
        throw res.error
      }
      return res
    })
}

/**
 * Returns price breakdown.
 *
 * @param {object} bodyData The body data
 * @return {Promise}
 */
export const getPriceReservation = (bodyData: ReservationAvailabilityData) => {
  return api({
    method: 'post',
    // url: '/reservation-service/reservation/availability',
    url: '/listing-service/calendar/price',
    data: bodyData,
  }).then((res) => res.data)
}

//https://api.dataismist.com/listing-service/v2/calendar/price
export const getPriceReservationV2 = (bodyData: ReservationAvailabilityData) => {
  return api({
    method: 'post',
    url: '/listing-service/v2/calendar/price',
    data: bodyData,
  }).then((res) => res.data)
}

export const addPageView = ({ propertyId, walletId }: { propertyId: string; walletId: string }) => {
  return api({
    method: 'get',
    url: '/listing-service/v1/property',
    params: { propertyId, walletId },
  }).then((res) => res.data)
}
export const getConvertCurrency = (value: number | string, base: string, targets = 'usd') => {
  return api({
    method: 'get',
    url: '/paygate-service/currency/convert',
    params: { value, base, targets },
  }).then((res) => res.data)
}
export const getRateCurrency = () => {
  return api({
    method: 'get',
    url: 'paygate-service/currency/rates',
  }).then((res) => res.data)
}
export const getMerchantLanding = (id: string) => {
  return api({
    method: 'get',
    url: `/account-service/v1/user/landing-page/info?id=${id}`,
  }).then((res) => res.data)
}
export const getLocationList = (hostID: string) => {
  return api({
    method: 'get',
    url: `/listing-service/v1/property/locations?host=${hostID}`,
  }).then((res) => res.data)
}
export const getFeatureListing = (hostID: string) => {
  return api({
    method: 'get',
    url: `/listing-service/v2/calendar/get-feature-listing?hostId=${hostID}&order=desc`,
  }).then((res) => res.data)
}
export const getPropertyReview = (pmsListingId: string) => {
  return api({
    method: 'get',
    url: `/integration-service/listings/reviews?pmsListingId=${pmsListingId}`,
  }).then((res) => res.data)
}
export const getHostReview = (userId: string) => {
  return api({
    method: 'get',
    url: `/integration-service/listings/reviewsByRules/${userId}`,
  }).then((res) => res.data)
}
export const getReviews = (params: ReviewParamsProps) => {
  return api({
    method: 'get',
    url: `/integration-service/listings/reviews`,
    params,
  }).then((res) => res.data)
}
export const getCancelPolicy = (propertyId: string | number, currency: string) => {
  return api({
    method: 'get',
    url: `/listing-service/cancellation/policies/${propertyId}`,
    params: { currency },
  }).then((res) => res.data)
}
