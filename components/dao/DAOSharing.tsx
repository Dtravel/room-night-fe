import React from 'react'
import Image from 'next/image'
import ic_lower_fees from './images/ic_lower_fees.svg'
import ic_payment_option from './images/ic_payment_option.svg'
import ic_giving_users from './images/ic_giving_users.svg'

const DAOSharing = () => {
  const renderItem = (icon: any, title: string, description: string) => {
    return (
      <div className="sharingItem">
        <div className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] lg:w-[80px] lg:h-[80px] mb-6">
          <Image src={icon} alt="" />
        </div>
        <p className="font-editorial-new text-28-36 mb-6 text-white">{title}</p>
        <p className="text-16-24 text-white">{description}</p>
      </div>
    )
  }
  return (
    <>
      <div className="dashboardSharing daoSharing">
        <div className="dashboardSharingContent">
          <div className="dashboardSharingContentLeft">
            <p className="header-sharing">How it works</p>
            <p className="title-sharing title-sharing-dao">A community for every host and guest</p>
            <p className="text-18-28 md:text-24-36 text-white mb-10 md:mb-20 lg:mb-0">Anyone holding the TRVL token is a member of the Dtravel community. There are many benefits to a community-controlled structure, including:</p>
          </div>
          <div className="dashboardSharingContentRight">
            {renderItem(
              ic_lower_fees,
              'Lower fees',
              'Lower fees for both hosts and guests.'
            )}
            {renderItem(
              ic_payment_option,
              'More payment options',
              'Hosts can accept cryptocurrencies, traditional payments or both, providing more payment options to guests.'
            )}
            {renderItem(
              ic_giving_users,
              'Giving users a voice',
              'The community votes on initiatives, allowing them to guide the growth of the platform.'
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DAOSharing
