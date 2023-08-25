/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface Props {
  url: string
  hostLogo: string
  hostName?: string
  contactName?: string
  isSpecial?: boolean
}

const LandingLogo: React.FC<Props> = ({ hostLogo, hostName, contactName, isSpecial, url }) => {
  if (hostLogo)
    return (
      <a href={url} className={'w-auto min-w-[40px] h-[40px] flex justify-start'} >
        <img src={`${hostLogo}${isSpecial ? '' : '?h=120'}`} alt={'host-logo'} height={40} className={'object-cover w-auto max-w-[360px]'} />
      </a>
    )
  return <a href={url} className="font-inter-600 text-16-20 text-black line-clamp-2" title={hostName || contactName}>{hostName || contactName}</a>
}

export default LandingLogo
