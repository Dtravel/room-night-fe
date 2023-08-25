import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { genDomain } from '@dtravel/helpers/utils/common'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import serverProps from '@dtravel/utils/serverProps'
import Head from 'next/head'
import { checkRedirectActived, renderLocationsMetaData } from '@dtravel/utils/common'
import dynamic from 'next/dynamic'

const NotFound = dynamic(() => import('@dtravel/components/layout/NotFound'), { ssr: false })
const MerchantMapView = dynamic(() => import('@dtravel/components/merchant-map-view/MerchantMapView'), { ssr: false })

interface MerchantPageProps {
  userAgent?: string
  businessInfor: any
  landingSetting: any
  error: any
  userId: string | null
}

const MerchantPage: NextPage<MerchantPageProps> = (props) => {
  const { error, businessInfor, landingSetting, userId } = props
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
  const title = landingSetting?.metaTitle || `Vacation Rentals${siteName ? ` by ${siteName}` : ''} ${renderLocationsMetaData(locations)}`
  const description = landingSetting?.metaDescription || `Book vacation rentals directly ${renderLocationsMetaData(locations)} and save up to 20%.`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
      </Head>
      <MerchantMapView userId={userId} />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const dataServerProps = { ...(await serverProps(context)) }
  let error = dataServerProps?.error
  if (!dataServerProps?.userId) error = { statusCode: 404 }
  const { req } = context

  return {
    props: { ...dataServerProps, error }
  }
}
export default MerchantPage
