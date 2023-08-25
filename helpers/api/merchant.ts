import { DomainInfoProps, MerchantListProps } from '../interfaces'
import api from './api'

export const getMerchantList = (data: MerchantListProps) => {
  return api({
    method: 'post',
    url: `/listing-service/v2/calendar/search`,
    data,
  })
}

export const getBusinessInfor = (hostAddress?: string) => {
  return api({
    method: 'get',
    url: hostAddress
      ? `/integration-service/host/contact/${hostAddress.toLowerCase()}`
      : `/integration-service/host/contact`,
  }).then((res) => res.data)
}
export const getSiteMap = () => {
  return api({
    method: 'get',
    url: process.env.NEXT_PUBLIC_SITE_MAP_URL,
  })
}
export const getSubdomainInfo = (subdomain: string) => {
  return api({
    method: 'get',
    url: `/account-service/v1/user/subdomain?name=${subdomain}`,
  }).then((res) => res.data)
}
export const getSettingUrl = (hostAddress: string) => {
  return api({
    method: 'get',
    url: `/account-service/v1/user/get-setting-url/${hostAddress.toLowerCase()}`,
  }).then((res) => res.data)
}
export const getDomainInfo = (params: DomainInfoProps) => {
  return api({
    method: 'get',
    url: `/account-service/v1/user/info`,
    params,
  }).then((res) => res.data)
}
export const getLandingSetting = (userId: string) => {
  return api({
    method: 'get',
    url: `/account-service/v1/user/landing-page/info`,
    params: { id: userId },
  }).then((res) => res.data)
}
