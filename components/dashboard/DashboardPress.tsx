import React, { useState } from 'react'
import Image from 'next/image'
import ic_arrow_left_black from './images/ic_arrow_left_black.svg'
import ic_arrow_right_black from './images/ic_arrow_right_black.svg'
import logo_skift from './images/logo_skift.svg'
import logo_short_term_rentalz from './images/logo_short_term_rentalz.svg'
import logo_coinDesk from './images/logo_coinDesk.svg'
import logo_yahoo from './images/logo_yahoo.svg'
import logo_blockworks from './images/logo_blockworks.svg'
import logo_coin_speaker from './images/logo_coin_speaker.svg'
import logo_TETRACYCLINED7K from './images/logo_TETRACYCLINED7K.svg'
import logo_crypto_news_btc from './images/logo_crypto_news_btc.svg'
import logo_phocus_wire from './images/logo_phocus_wire.svg'
import logo_crypto_times from './images/logo_crypto_times.svg'
import logo_bitcoinist from './images/logo_bitcoinist.svg'
import logo_CNBC from './images/logo_CNBC.svg'
import logo_crypto_slate from './images/logo_crypto_slate.svg'
import logo_travel_daily_news from './images/logo_travel_daily_news.svg'

const DashboardPress = () => {
  const [isLeftActive, setLeftActive] = useState<boolean>(false)
  const [isRightActive, setRightActive] = useState<boolean>(true)
  const checkScroll = () => {
    if (typeof window === 'undefined') return
    const el = document.getElementById('card_group')
    if (el) {
      if (el.scrollLeft <= 0) {
        if (isLeftActive) setLeftActive(false)
        if (!isRightActive) setRightActive(true)
      } else if (el.scrollLeft + el.offsetWidth >= el.scrollWidth) {
        if (!isLeftActive) setLeftActive(true)
        if (isRightActive) setRightActive(false)
      } else {
        if (!isLeftActive) setLeftActive(true)
        if (!isRightActive) setRightActive(true)
      }
    }
  }
  const handleScrollLeft = () => {
    const el = document.getElementById('card_group')
    if (el) {
      el.scrollLeft -= 416
      // checkScroll(el.scrollLeft - 364)
    }
  }
  const handleScrollRight = () => {
    const el = document.getElementById('card_group')
    if (el) {
      el.scrollLeft += 416
      // checkScroll(el.scrollLeft + 364)
    }
  }
  const renderCardItem = (
    logo: any,
    bgColor: string,
    title: string,
    description: string,
    linkUrl: string,
    isLast?: boolean
  ) => {
    return (
      <a href={linkUrl} target="_blank" rel="noreferrer" className="cursor-pointer">
        <div className={`cardItem ${isLast ? 'lastItem' : ''}`}>
          <div className="logoBox" style={{ background: bgColor }}>
            <Image src={logo} alt="" />
          </div>
          <div className="cardInfo">
            <p className="cardTitle text-sand-6 text-14-16 font-maison-neue-medium">{title}</p>
            <p className="cardDescription text-22-28 font-editorial-new">{description}</p>
          </div>
        </div>
      </a>
    )
  }
  return (
    <>
      <div className="dashboardPress commonBG">
        <div className="dashboardPressContent">
          <p className="titlePress">Recent press</p>
          <div className="cardGroup hidden-scroll-bar" id="card_group" onScroll={() => checkScroll()}>
            {renderCardItem(
              logo_short_term_rentalz,
              '#000000',
              'SHORT-TERM RENTALZ',
              'Uplisting Teams Up With Dtravel For Direct Bookings',
              'https://shorttermrentalz.com/news/uplisting-dtravel-direct-bookings-cryptocurrency/'
            )}
            {renderCardItem(
              logo_travel_daily_news,
              '#DFDFDF',
              'Travel daily news',
              'Uplisting Teams Up With Dtravel To Offer Direct Bookings For Crypto Payment',
              'https://www.traveldailynews.com/post/uplisting-teams-up-with-dtravel-to-offer-direct-bookings-for-crypto-payment'
            )}
            {renderCardItem(
              logo_coinDesk,
              '#172036',
              'Coindesk',
              'Dtravel Completes First Smart-Contract Vacation Rental Booking',
              'https://www.coindesk.com/business/2022/08/04/dtravel-completes-first-smart-contract-vacation-rental-booking/'
            )}
            {renderCardItem(
              logo_skift,
              '#FFF200',
              'Skift',
              'Dtravel Claims First Short-Term Rental Booking Using Blockchain and Smart Contracts',
              'https://skift.com/blog/dtravel-claims-first-short-term-rental-booking-using-blockchain-and-smart-contracts/'
            )}
            {renderCardItem(
              logo_yahoo,
              '#F1F1F5',
              'Yahoo',
              'Dtravel Completes First Smart-Contract Vacation Rental Booking',
              'https://ca.finance.yahoo.com/news/dtravel-completes-first-smart-contract-130000862.html'
            )}
            {renderCardItem(
              logo_short_term_rentalz,
              '#000000',
              'SHORT-TERM RENTALZ',
              'Dtravel Processes First Travel Booking On The Blockchain',
              'https://shorttermrentalz.com/news/dtravel-first-travel-booking-blockchain/'
            )}
            {renderCardItem(
              logo_blockworks,
              '#5637CD',
              'Blockworks',
              'Blockchain Startup Hopes to Disrupt Short-term Rental Market',
              'https://blockworks.co/blockchain-startup-hopes-to-disrupt-short-term-rental-market/'
            )}
            {renderCardItem(
              logo_coin_speaker,
              '#FBFAFA',
              'COINSPEAKER',
              'Dtravel Makes Its First Booking via Smart Contracts',
              'https://www.coinspeaker.com/dtravel-booking-smart-contracts/'
            )}
            {renderCardItem(
              logo_TETRACYCLINED7K,
              '#F2F2F2',
              'TETRACYCLINED7K',
              'Dtravel Processes First Travel Booking On The Blockchain',
              'https://tetracyclined7k.com/dtravel-processes-first-travel-booking-on-the-blockchain/'
            )}
            {renderCardItem(
              logo_crypto_news_btc,
              '#191818',
              'Crypto News BTC',
              'Blockchain Startup Hopes to Disrupt Short-term Rental Market',
              'https://cryptonewsbtc.org/2022/08/08/blockchain-startup-hopes-to-disrupt-short-term-rental-market/'
            )}
            {renderCardItem(
              logo_crypto_times,
              '#1C1C1C',
              'The Crypto Times',
              'Web3 Vacation Platform Dtravel Completes First Smart-contract Booking',
              'https://www.cryptotimes.io/web3-vacation-platform-dtravel-completes-first-smart-contract-booking/'
            )}
            {renderCardItem(
              logo_skift,
              '#FFF200',
              'Skift',
              'Community-Based Home Sharing Brand Dtravel Gets Backing',
              'https://skift.com/2021/06/25/community-based-homesharing-brand-dtravel-gets-backing-travel-startup-funding-this-week'
            )}
            {renderCardItem(
              logo_phocus_wire,
              '#0C2F4D',
              'Phocuswire',
              'New Booking Systems Signal Next Step for Blockchain',
              'https://www.phocuswire.com/new-booking-systems-from-winding-tree-dtravel-signal-next-step-for-blockchain-distribution'
            )}
            {renderCardItem(
              logo_bitcoinist,
              '#0099FD',
              'Bitcoinist',
              'Dtravel Home-Sharing Platform Arrives on MEXC Global & Bybit Launchpad',
              'https://bitcoinist.com/dtravel-home-sharing-platform-arrives-on-mexc-global-bybit-launchpad/'
            )}
            {renderCardItem(
              logo_CNBC,
              '#071D39',
              'CNBC',
              'Cryptocurrency is Taking Off As a Way to Pay for Those Vacation Getaways',
              'https://www.cnbc.com/2021/07/31/cryptocurrency-is-taking-off-as-a-way-to-pay-for-vacation-getaways.html'
            )}
            {renderCardItem(
              logo_short_term_rentalz,
              '#000000',
              'SHORT-TERM RENTALZ',
              'Decentralised Home-sharing Platform Dtravel Goes Live',
              'https://shorttermrentalz.com/news/dtravel-home-sharing-live/'
            )}
            {renderCardItem(
              logo_crypto_slate,
              '#0F0F1B',
              'Cryptoslate',
              'Decentralized Travel Website Dtravel Facilitates Crypto Bookings For Over 250K Destinations',
              'https://cryptoslate.com/decentralized-travel-website-dtravel-facilitates-crypto-bookings-for-over-250k-destinations/'
            )}
          </div>

          <div className="actionGroup">
            <div
              className={`actionItem leftItem cursor-pointer ${isLeftActive ? 'activeItem' : 'disabledItem'}`}
              role="presentation"
              onClick={handleScrollLeft}
            >
              <Image src={ic_arrow_left_black} width={24} height={24} alt="dtravel" className="text-logo" />
            </div>
            <div
              className={`actionItem cursor-pointer ${isRightActive ? 'activeItem' : 'disabledItem'}`}
              role="presentation"
              onClick={handleScrollRight}
            >
              <Image src={ic_arrow_right_black} width={24} height={24} alt="dtravel" className="text-logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPress