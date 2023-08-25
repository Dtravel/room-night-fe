import Footer from './Footer'
import Head from 'next/head'
import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import DetailMenu from '@dtravel/components/property-detail/DetailMenu'
import Header from '@dtravel/components/layout/Header'
import Loading from '@dtravel/components/common/Loading'

interface Props {
  title?: string
  image?: string
  description?: string
  children?: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const router = useRouter()
  const isMerchantPage = router.pathname === '/property/[hostId]'
  const isBookingPage = router.pathname.includes('/booking/') || router.pathname.includes('/book/')
  const isSummaryPage = router.pathname.includes('/booking-summary/')
  const isProperty = router.pathname.includes('/property')
  const description =
    props?.description ||
    'Dtravel is a web3 direct vacation rental booking channel that enables guests to pay with crypto or fiat, earn rewards, and pay zero fees.'
  return (
    <>
      <Head>
        <title>{props?.title || 'Dtravel'}</title>
        <meta property="og:title" content={props?.title || 'Dtravel'} />
        <meta property="twitter:title" content={props?.title || 'Dtravel'} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={props.image} />
      </Head>
      {/*<div className="m-auto px-0 lg:px-[32px] 2xl:px-[80px] 2xl:max-w-[1512px]">*/}

      <Header middleContent={isProperty ? <DetailMenu /> : ''} />

      <div
        className={clsx(
          'm-auto',
          'pt-[80px]',
          'px-0',
          'md:px-[24px]',
          'lg:px-[24px]',
          'xl:px-[72px] xl:max-w-[1280px]',
          '2xl:px-[152px] 2xl:max-w-[1536px]',
          `${!isMerchantPage && !isSummaryPage ? 'mb-[24px] md:mb-0 lg:mb-[48px]' : ''}`,
          `${isBookingPage ? 'mb-[24px] md:mb-0 lg:mb-[65px]' : ''}`
        )}
      >
        {props.children}
      </div>
      <Footer />
      <Loading />
    </>
  )
}

export default Layout
