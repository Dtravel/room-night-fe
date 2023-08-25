import React from 'react'
import Head from 'next/head'
import BasicToast from '@dtravel/components/ui/BasicToast'
import LocaleProvider from '@dtravel/helpers/locale-provider/LocaleProvider'
import { Provider } from 'react-redux'
import { store } from '@dtravel/redux/store'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '@dtravel/styles/globals.scss'
import '@dtravel/styles/react_dates_overrides.scss'
import '@dtravel/styles/react_phone_number_input_overwrite.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import SelectCurrency from '@dtravel/components/common/SelectCurrency'
import PrivacyAndCookiePolicy from '@dtravel/components/privacy-and-cookie-policy/PrivacyAndCookiePolicy'
import { ThemeProvider } from '@dtravel/helpers/context/ThemeContext'
import MetaData from '@dtravel/components/common/MetaData'
import { useRouter } from 'next/router'
// import Script from 'next/script'

const App = ({ Component, pageProps }: AppProps) => {
  const { landingSetting, propertyDetail, businessInfor } = pageProps
  // const { userId, landingSetting } = pageProps
  const router = useRouter()
  const { pathname } = router
  // const isRiley = landingSetting?.name === 'riley'
  // const isAdeel = landingSetting?.name === 'adeel'
  // const isBookingSummary = pathname.includes('/booking-summary')
  // purchase event for gtag
  // const eventPurchase = {
  //   transaction_id: propertyDetail?.reservationId,
  //   currency: propertyDetail?.currency,
  //   value: propertyDetail?.finalPrice,
  //   items: [{ item_id: propertyDetail?.pmsListingId, item_name: propertyDetail?.listingInfo?.externalName }]
  // }

  // purchase event for GTM
  // const eventPurchase = {
  //   currencyCode: propertyDetail?.currency,
  //   purchase: {
  //     actionField: {
  //       id: propertyDetail?.reservationId,
  //       revenue: propertyDetail?.finalPrice,
  //     },
  //     products: [{
  //       id: propertyDetail?.pmsListingId,
  //       name: propertyDetail?.listingInfo?.externalName,
  //       price: propertyDetail?.finalPrice,
  //       quantity: 1
  //     }]
  //   }
  // }
  // const gtagID = landingSetting?.gTag || DTRAVEL_GTAG

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <MetaData pathname={pathname} landingSetting={landingSetting} businessInfor={businessInfor} />
      </Head>

      {/* {isRiley &&
        <>
          <Script
            id='google-tag-manager'
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5N6MZZG');`
            }}
          />
          {isBookingSummary &&
            <Script
              id='google-tag-manager-purchase'
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({ecommerce: null});
                dataLayer.push({event:'purchase',ecommerce:${JSON.stringify(eventPurchase)}})
              `,
              }}
            />
          }
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5N6MZZG"
              height="0" width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      } */}

      {/* {isAdeel &&
        <>
          <Script
            strategy="afterInteractive"
            id="BookingInsights-v3"
            src="https://app.directbookingtools.com/dtravel.js"
          />
          <link rel="stylesheet" href="https://app.directbookingtools.com/12w.css" type="text/css" />
        </>
      } */}
      <Provider store={store}>
        <ThemeProvider>
          <LocaleProvider {...pageProps}>
            <Component {...pageProps} />
            <SelectCurrency />
            <BasicToast />
            <PrivacyAndCookiePolicy />
          </LocaleProvider>
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
