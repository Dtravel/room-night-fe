import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import serverProps from '@dtravel/utils/serverProps'
import { genDomain, isMobileDevice } from '@dtravel/helpers/utils/common'
import NotFound from '@dtravel/components/layout/NotFound'
import dynamic from 'next/dynamic'
import { checkRedirectActived, renderLocationsMetaData } from '@dtravel/utils/common'

const MerchantLandingSpecial = dynamic(() => import('@dtravel/components/merchant-landing-special/MerchantLandingSpecial'), { ssr: false })
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
      <MerchantLandingSpecial userId={userId} isMobile={isMobile} />
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
  return { props: { ...dataServerProps, userAgent, isMobile } }
}

export default HomePage
