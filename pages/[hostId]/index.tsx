import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { genDomain, genDomainDefault, isMobileDevice } from '@dtravel/helpers/utils/common'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import serverProps from '@dtravel/utils/serverProps'
import Head from 'next/head'
import MerchantLanding from '@dtravel/components/merchant-landing/MerchantLanding'
// import MerchantLandingSpecial from '@dtravel/components/merchant-landing-special/MerchantLandingSpecial'
import NotFound from '@dtravel/components/layout/NotFound'
import { LANDING_THEME_VERSION } from '@dtravel/helpers/constants/constants'
import dynamic from 'next/dynamic'
import { renderLocationsMetaData } from '@dtravel/utils/common'

const MerchantLandingSpecial = dynamic(() => import('@dtravel/components/merchant-landing-special/MerchantLandingSpecial'), { ssr: false })

interface MerchantPageProps {
  userAgent?: string
  businessInfor: any
  landingSetting: any
  error: any
  userId: string | null
  isMobile: boolean
}

const LandingPage: NextPage<MerchantPageProps> = (props) => {
  const { error, businessInfor, landingSetting, userId, isMobile } = props
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
      {landingSetting.version === LANDING_THEME_VERSION.NORMAL ?
        <MerchantLanding userId={userId} isMobile={isMobile} /> :
        <MerchantLandingSpecial userId={userId} isMobile={isMobile} />
      }
    </>
  )
}

export async function getServerSideProps(context: any) {
  const dataServerProps = { ...(await serverProps(context)) }
  const { req } = context
  const { hostId } = context.query
  const userAgent = req?.headers['user-agent']
  const isMobile = isMobileDevice(userAgent)
  const { settingUrl } = dataServerProps
  let error = dataServerProps?.error
  if (settingUrl?.customId) {
    const { domain, paramsSearch } = genDomain(context, settingUrl)
    return {
      redirect: {
        permanent: true,
        destination: `${domain}/${paramsSearch ? `?${paramsSearch}` : ''}`,
      },
    }
  } else if (dataServerProps?.businessInfor?.userId && dataServerProps?.businessInfor?.userId !== hostId) {
    // support redirect wallet address
    const { domain, paramsSearch } = genDomainDefault(context)
    return {
      redirect: {
        permanent: true,
        destination: `${domain}/${dataServerProps?.businessInfor?.userId}${paramsSearch ? `?${paramsSearch}` : ''}`,
      },
    }
  }
  return {
    props: { ...dataServerProps, error, isMobile },
  }
}
export default LandingPage
