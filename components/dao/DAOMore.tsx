/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import ic_arrow_right_black from './images/ic_arrow_right_black.svg'
import { DAO_EXTERNAL_LINK } from './DAO'

const DAOMore = () => {
  const renderCardItem = (logo: any, title: string, description: string, linkUrl: string) => {
    return (
      <div className="w-[280px] min-w-[280px] lg:w-[380px] lg:min-w-[380px] mr-6 bg-white rounded-3xl" style={{ boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.04)" }}>
        <div className="w-[280px] min-w-[280px] lg:w-[380px] lg:min-w-[380px]">
          <img src={logo} alt="" className="rounded-3xl" />
        </div>
        <div className="p-8">
          <p className="mb-2 text-22-28 text-sand-8 font-editorial-new">{title}</p>
          <p className="text-sand-6 text-16-24 mb-6">{description}</p>
          <a href={linkUrl} target="_blank" rel="noreferrer" className="cursor-pointer">
            <div className="flex items-center">
              <span className="mr-2 text-18-24 text-sand-7">Read more</span>
              <Image src={ic_arrow_right_black} alt="arrow" width={24} height={24} />
            </div>
          </a>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="dashboardPress daoPress">
        <div className="dashboardPressContent">
          <p className="titlePress">More from Dtravel</p>
          <div className="cardGroup hidden-scroll-bar">
            {renderCardItem(
              'https://static.dtravel.com/DAO/logo_dao_whitepaper.jpg',
              'DAO Whitepaper',
              'Deep dive on the Dtravel DAO and how it’s structured.',
              DAO_EXTERNAL_LINK.DAO
            )}
            {renderCardItem(
              'https://static.dtravel.com/DAO/logo_trvl_token.jpg',
              'TRVL Token',
              'Learn more about the native token of the Dtravel network.',
              DAO_EXTERNAL_LINK.TRVL
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DAOMore
