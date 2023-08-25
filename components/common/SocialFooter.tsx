import React from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import Link from 'next/link'
import { SOCIAL_TYPE } from '@dtravel/helpers/constants/constants'
import { IconTwitter, IconTikTok, IconFacebook, IconInstagram } from '@dtravel/components/common/Icons'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {}

const SocialFooter: NextPage<Props> = () => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const getSocialData = () => {
    let result: any[] = []
    if (landingSetting?.facebook) result.push({ url: landingSetting?.facebook, type: SOCIAL_TYPE.FACEBOOK })
    if (landingSetting?.instagram) result.push({ url: landingSetting?.instagram, type: SOCIAL_TYPE.INSTAGRAM })
    if (landingSetting?.tiktok) result.push({ url: landingSetting?.tiktok, type: SOCIAL_TYPE.TIKTOK })
    if (landingSetting?.twitter) result.push({ url: landingSetting?.twitter, type: SOCIAL_TYPE.TWITTER })
    return result
  }
  const renderIcon = (type: string) => {
    if (type === SOCIAL_TYPE.FACEBOOK) {
      return { normal: <IconFacebook />, active: <IconFacebook color={landingSetting?.primaryColor} /> }
    }
    if (type === SOCIAL_TYPE.INSTAGRAM) {
      return { normal: <IconInstagram />, active: <IconInstagram color={landingSetting?.primaryColor} /> }
    }
    if (type === SOCIAL_TYPE.TIKTOK) {
      return { normal: <IconTikTok />, active: <IconTikTok color={landingSetting?.primaryColor} /> }
    }
    if (type === SOCIAL_TYPE.TWITTER) {
      return { normal: <IconTwitter />, active: <IconTwitter color={landingSetting?.primaryColor} /> }
    }
  }
  const social = getSocialData()
  return (
    <>
      {!isEmpty(social) &&
        social.map((el: any, idx: number) => {
          const icons = renderIcon(el.type)
          return (
            <Link href={el?.url} passHref target="_blank" key={idx}>
              <span className="flex custom-hover">
                <span className="normal">{icons?.normal}</span>
                <span className="active">{icons?.active}</span>
              </span>
            </Link>
          )
        })}
    </>
  )
}

export default SocialFooter
