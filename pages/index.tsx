import type { NextPage } from 'next'
import Head from 'next/head'
// import Dashboard from '@dtravel/components/dashboard/Dashboard'
// import MerchantLanding from '@dtravel/components/merchant-landing/MerchantLanding'
import { useEffect } from 'react'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import serverProps from '@dtravel/utils/serverProps'
import { genDomain, isMobileDevice } from '@dtravel/helpers/utils/common'
import NotFound from '@dtravel/components/layout/NotFound'
import dynamic from 'next/dynamic'
import { checkRedirectActived, renderLocationsMetaData } from '@dtravel/utils/common'
import { LANDING_THEME_VERSION } from '@dtravel/helpers/constants/constants'

const MerchantLanding = dynamic(() => import('@dtravel/components/merchant-landing/MerchantLanding'), { ssr: false })
const MerchantLandingSpecial = dynamic(() => import('@dtravel/components/merchant-landing-special/MerchantLandingSpecial'), { ssr: false })
const Dashboard = dynamic(() => import('@dtravel/components/dashboard/Dashboard'), { ssr: true })
interface Props {
  userAgent?: string
  isMobile: boolean
  userId: string | null
  subdomain: string | null
  error: any
  businessInfor?: any
  landingSetting?: any
}

const HomePage: NextPage<Props> = ({ isMobile, userId, error, businessInfor, landingSetting }) => {
  const dispatch = useAppDispatch()
  const { locations } = useAppSelector((state) => state.common)

  useEffect(() => {
    dispatch(setUserID(userId))
    // eslint-disable-next-line
  }, [userId])

  useEffect(() => {
    dispatch(setBusinessInfor(businessInfor))
    // eslint-disable-next-line
  }, [businessInfor])

  useEffect(() => {
    dispatch(setLandingSetting(landingSetting))
    // eslint-disable-next-line
  }, [landingSetting])

  if (error) {
    return <NotFound />
  }
  if (userId) {
    const siteName = businessInfor?.hostName
    const title = landingSetting?.metaTitle || siteName || "Your Airbnb Alternative. Book Vacation Rentals Directly."
    const description =
      landingSetting?.metaDescription || landingSetting?.bio ||
      `Vacation rentals by ${siteName || "owner"}${renderLocationsMetaData(locations) ? ` ${renderLocationsMetaData(locations)}` : ''}. Book direct and save up to 20%.`
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </Head>
        {landingSetting.version === LANDING_THEME_VERSION.NORMAL ?
          <MerchantLanding userId={userId} isMobile={isMobile} /> :
          <MerchantLandingSpecial userId={userId} isMobile={isMobile} />
        }
      </>
    )
  }

  return (
    <>
      <Head>
        {/* Hotjar Tracking Code for https://dtravel.com/   */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
              h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
              h._hjSettings={hjid:3326493,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }} />
      </Head>
      <Dashboard isMobile={isMobile} />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const userAgent = req?.headers['user-agent']
  const isMobile = isMobileDevice(userAgent)
  const dataServerProps = { ...(await serverProps(context)) }
  const hostDomain = req?.headers?.host
  const { settingUrl } = dataServerProps
  if (settingUrl && checkRedirectActived(settingUrl, hostDomain)) {
    // support case change custom domain
    const { domain, paramsSearch } = genDomain(context, settingUrl)
    return {
      redirect: {
        permanent: true,
        destination: `${domain}${paramsSearch ? `?${paramsSearch}` : ''}`,
      },
    }
  }
  return { props: { ...dataServerProps, userAgent, isMobile } }
}

export default HomePage
