import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { capitalizeLetter, genDomain, isMobileDevice } from '@dtravel/helpers/utils/common'
import { useAppDispatch } from '@dtravel/redux/hooks'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import serverProps from '@dtravel/utils/serverProps'
import Head from 'next/head'
import { checkRedirectActived, getPropertyTitleSite } from '@dtravel/utils/common'
import dynamic from 'next/dynamic'
// import PropertyManagement from '@dtravel/components/property-management/PropertyManagement'

const NotFound = dynamic(() => import('@dtravel/components/layout/NotFound'), { ssr: false })
const PropertyManagement = dynamic(() => import('@dtravel/components/property-management/PropertyManagement'), { ssr: false })

interface MerchantPageProps {
  userAgent?: string
  businessInfor: any
  landingSetting: any
  error: any
  userId: string | null
  isMobile: boolean
}

const PropertyManagementPage: NextPage<MerchantPageProps> = (props) => {
  const { error, businessInfor, landingSetting, userId, isMobile } = props
  const dispatch = useAppDispatch()

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
  const title = landingSetting?.metaTitle ||
    getPropertyTitleSite(
      `${capitalizeLetter(businessInfor?.hostName?.toLowerCase()) || capitalizeLetter(businessInfor?.contactName?.toLowerCase()) || 'Host'}'s Listings`,
      userId as string,
      businessInfor?.hostName
    )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
      </Head>
      <PropertyManagement isMobile={isMobile} userId={userId} />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const userAgent = req?.headers['user-agent']
  const isMobile = isMobileDevice(userAgent)
  const dataServerProps = { ...(await serverProps(context)) }
  let error = dataServerProps?.error
  if (!dataServerProps?.userId) error = { statusCode: 404 }
  const hostDomain = req?.headers?.host
  const { settingUrl } = dataServerProps
  if (settingUrl && checkRedirectActived(settingUrl, hostDomain)) {
    // support case change custom domain
    const { domain, paramsSearch } = genDomain(context, settingUrl)
    return {
      redirect: {
        permanent: true,
        destination: `${domain}/property-management${paramsSearch ? `?${paramsSearch}` : ''}`,
      },
    }
  }
  return {
    props: { ...dataServerProps, error, userAgent, isMobile }
  }
}
export default PropertyManagementPage
