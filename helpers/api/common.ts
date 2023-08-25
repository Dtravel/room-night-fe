import api from './api'

export const getSupportCurrencies = () => {
  return api({
    method: 'get',
    url: '/paygate-service/currency/support',
  }).then((res) => res.data)
}

export const convertCurrency = (value: number | string, base: string, targets: string, source?: any) => {
  return api({
    method: 'get',
    url: '/paygate-service/currency/convert',
    params: { value, base, targets },
    cancelToken: source?.token,
  }).then((res) => res.data)
}

export const getIpInfo = () => {
  return api({
    method: 'get',
    url: '/activity-service/geo-ip/location',
  }).then((res) => res.data)
}
