import { getSettingUrl, getBusinessInfor, getLandingSetting, getDomainInfo } from '@dtravel/helpers/api/merchant'
import { SettingUrlProps } from '@dtravel/helpers/interfaces'
import axios from 'axios'
import { converHostDomain, isEmpty, isIP } from './common'

export default async function serverProps(context: any) {
  const { req } = context
  const { hostId } = context.query
  const hostDomain = req?.headers?.host
  const publicSiteDomain = process.env.NEXT_PUBLIC_SITE_URL?.replace('http://', '')?.replace('https://', '')
  let userId: string = hostId || ''
  let settingUrl: SettingUrlProps | null = null
  let businessInfor: any = null
  let landingSetting: any = null
  let err: any = null

  if (hostDomain !== publicSiteDomain) {
    if (isIP(hostDomain)) err = { statusCode: 404 }
    else {
      try {
        const domain = converHostDomain(hostDomain)
        // const res: any = await getDomainInfo({ domain })
        const res: any = await axios
          .get(process.env.NEXT_PUBLIC_INTERNAL_ACCOUNT_API_URL + '/v1/user/info', {
            timeout: 5000,
            headers: { 'User-Agent': 'Dtravel-Internal/guest' },
            params: { domain },
          })
          .then((response) => response.data)
        if (res?.data?.id) userId = res?.data?.id
        else err = { statusCode: 404 }
      } catch (error) {
        err = { statusCode: 404 }
      }
    }
  }

  if (userId || hostId) {
    try {
      const [resSettingUrl, resBusinessInfor, resLandingSetting] = await Promise.all([
        getSettingUrl((userId || hostId)?.toLowerCase()),
        getBusinessInfor((userId || hostId)?.toLowerCase()),
        getLandingSetting((userId || hostId)?.toLowerCase()),
      ])
      settingUrl =
        !isEmpty(resSettingUrl.data) && ((resSettingUrl.data || []).find((v: SettingUrlProps) => v.isPrimary) || null)
      businessInfor = resBusinessInfor.data
      landingSetting = resLandingSetting.data
    } catch (error: any) {
      err = { statusCode: 404 }
    }
  }
  return { userId, settingUrl, businessInfor, landingSetting, error: err }
}
