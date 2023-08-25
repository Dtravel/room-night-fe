/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/next-script-for-ga */
import React from 'react'

interface Props {
  pathname: string
  landingSetting: any
  businessInfor: any
}

const DTRAVEL_GTAG = 'G-CPM0WYJ3JC'
const MetaData = ({ pathname, landingSetting, businessInfor }: Props) => {
  const isRiley = landingSetting?.name === 'riley'
  // const isAdeel = specialData?.name === 'adeel'
  // const isGio = specialData?.name === 'gio'
  // const isJeremy = specialData?.name === 'jeremy'
  const isBooking = pathname.includes('/booking/')
  const isBookingSummary = pathname.includes('/booking-summary')
  const isPropertyDetail = pathname.includes('/property/')
  const gtag = landingSetting?.gTag || DTRAVEL_GTAG
  const description =
    landingSetting?.metaDescription ||
    'Dtravel is a web3 direct vacation rental booking channel that enables guests to pay with crypto or fiat, earn rewards, and pay zero fees.'
  const siteName = businessInfor?.hostName || 'Dtravel.com'
  const siteUrl = landingSetting?.ogUrl || 'https://dtravel.com/'
  const heroImage = landingSetting?.gallery || 'https://static.dtravel.com/guest/hero-image.webp'
  return (
    <>
      <meta property="og:site_name" content={siteName} />
      {(isBooking || isBookingSummary) &&
        <>
          <meta property="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      }
      {/*{landingSetting?.favicon && <link rel="icon" href={landingSetting?.favicon} />}*/}
      <link
        rel="icon"
        href={(landingSetting?.favicon ? landingSetting?.favicon : 'data:;base64,iVBORw0KGgo=') + '?v=' + +new Date()}
      />
      {!isPropertyDetail && <meta property="og:image" content={heroImage + '?w=640'}></meta>}
      {/*<meta property="og:image" content={heroImage + '?version=' + new Date().getTime()}></meta>*/}
      {/*<meta property="og:image:width" content={'1280'}></meta>*/}
      {/*<meta property="og:image:height" content={'720'}></meta>*/}
      <meta property="og:url" content={siteUrl} />
      {/* <meta property="og:site_name" content="Dtravel.com" /> */}
      {/* <link rel="icon" href="/dtravel.png" /> */}

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${gtag});`,
        }}
      ></script>
      {/* 415303580417047 pixel for riley */}
      {landingSetting?.pixel && (
        <>
          {/* <!-- Meta Pixel Code --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)

          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?

          n.callMethod.apply(n,arguments):n.queue.push(arguments)};

          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';

          n.queue=[];t=b.createElement(e);t.async=!0;

          t.src=v;s=b.getElementsByTagName(e)[0];

          s.parentNode.insertBefore(t,s)}(window, document,'script',

          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', ${landingSetting?.pixel});

          fbq('track', 'PageView');

          ${isBookingSummary && isRiley ? `fbq('track', 'Purchase');` : ''}`,
            }}
          ></script>

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${landingSetting?.pixel}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
          {/* <!-- End Meta Pixel Code --> */}
        </>
      )}
    </>
  )
}

export default MetaData
