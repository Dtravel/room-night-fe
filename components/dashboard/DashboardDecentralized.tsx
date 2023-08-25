/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import ic_blog from './images/ic_blog.jpg'
import { EXTERNAL_LINK } from './Dashboard'

const DashboardDecentralized = () => {
  return (
    <>
      <div className="commonBG dashboardDecentralized">
        <img src="https://static.dtravel.com/images/bg_decentralized.webp" alt="" className="bgDecentralized" />
        <div className="dashboardDecentralizedContent">
          <p className="topTitle font-maison-neue-medium text-12-16 md:text-16-18 lg:text-16-18 uppercase">built for and owned by hosts</p>
          <p className="textTitle text-sand-8">A Community Treasury for Future Innovation</p>
          <p className="textDescription">
            Fees earned from every booking are held in a community treasury. Proposals for product improvements (“Dtrips”) are submitted and voted on by the community to determine the future direction of Dtravel.
          </p>
          <a href={EXTERNAL_LINK.BLOG} target="_blank" rel="noreferrer">
            <div className="flex items-start">
              <div className='flex p-4 bg-white rounded-3xl w-full md:w-[329px] lg:w-[392px]' style={{ boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.04)" }}>
                <Image src={ic_blog} alt="" width={88} height={88} className="rounded-[12px]" />
                <div className='flex flex-col pl-4 justify-center'>
                  <span className='mb-2 text-12-16 font-maison-neue-medium uppercase text-sand-8 tracking-[.04em]'>DTRAVEL BLOG</span>
                  <p className='w-[194px] m-0 text-18-24 text-sand-8 font-maison-neue-medium'>Evolution of our DAO Structure</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default DashboardDecentralized