import React from 'react'
import Image from 'next/image'
import ic_trvl_lab from './images/ic_trvl_lab.svg'
import ic_arrow_right_yellow from './images/ic_arrow_right_yellow.svg'
import { EXTERNAL_LINK } from './Dashboard'

const DashboardNativeToken = () => {
  const renderItem = (title: string, description: string, url?: string) => {
    return (
      <div className={`token-btn flex flex-col p-6 border border-seafoam rounded-2xl mx-0 md:mx-3 mb-6 md:mb-0 h-[240px] md:h-[270px] ${url ? 'opacity-100' : 'opacity-50'}`}>
        <p className='text-16-24 border-b border-seafoam pb-3 mb-6 tracking-[.1em] md:tracking-[.04em] font-maison-neue-medium'>{title}</p>
        <p className='text-22-28 md:text-24-36 tracking-[.1em] md:tracking-[.04em] font-maison-neue'>{description}</p>
        <div className={`flex ${url ? 'flex-row-reverse' : 'flex-row'} items-end h-full `}>
          {url ?
            <a href={url} target="_blank" rel="noreferrer">
              <div className='border border-seafoam rounded-full w-12 h-12 flex items-center justify-center'>
                <Image src={ic_arrow_right_yellow} alt="arrow" width={24} height={24} />
              </div>
            </a> :
            <span className='text-16-24 font-maison-neue-medium'>COMING SOON</span>
          }
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="commonBG dashboardNativeToken">
        <div className="dashboardNativeTokenContent">
          <Image src={ic_trvl_lab} alt="trvl" />
          {/* <p className="header-token">About TRVL</p> */}
          <p className="title-token mt-8">A native token for our global community</p>
          <p className="sub-text-token text-seafoam">
            The TRVL token unlocks unique Dtravel utility, giving you access to a range of benefits. Earn TRVL with every booking, receive discounted rates, and help guide the future direction of the ecosystem.
          </p>
          <div className='flex md:mx-[-12px] flex-wrap'>
            {renderItem('ABOUT', 'Learn more about the TRVL Token', EXTERNAL_LINK.TRVL)}
            {renderItem('EARN', 'Stake TRVL for rewards', EXTERNAL_LINK.EARN)}
            {renderItem('OPEN PASSPORT', 'Build your on-chain travel credentials', EXTERNAL_LINK.PASSPORT)}
            {renderItem('PROTOCOL', 'Open standard booking protocol',)}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardNativeToken