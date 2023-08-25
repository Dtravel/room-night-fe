/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface Props {
  hostLogo: string
  hostName?: string
  contactName?: string
}

const LandingLogo: React.FC<Props> = ({ hostLogo, hostName, contactName }) => {
  if (hostLogo)
    return (
      <div className={'w-full min-w-[40px] h-[40px] flex justify-start'}>
        <img src={`${hostLogo}?h=40`} alt={'host-logo'} height={40} className={'object-cover w-auto max-w-[360px]'} />
      </div>
    )
  return <div className="font-inter-600 text-16-20 text-black line-clamp-2" title={hostName || contactName}>{hostName || contactName}</div>
}

export default LandingLogo
