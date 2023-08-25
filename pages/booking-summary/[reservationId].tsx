import BookingSummary from '@dtravel/components/booking/BookingSummary'
import Layout from '@dtravel/components/layout/Layout'
import NotFound from '@dtravel/components/layout/NotFound'
import { getDetailBooking } from '@dtravel/helpers/api/booking'
import { getBusinessInfor, getSettingUrl } from '@dtravel/helpers/api/merchant'
import { SettingUrlProps } from '@dtravel/helpers/interfaces'
import { PropertyInfo } from '@dtravel/helpers/interfaces/property'
import { genDomain } from '@dtravel/helpers/utils/common'
import { useAppDispatch } from '@dtravel/redux/hooks'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import { checkRedirectActived, getPropertyTitleSite, isEmpty } from '@dtravel/utils/common'
import serverProps from '@dtravel/utils/serverProps'
import { NextPage } from 'next'
import { useEffect } from 'react'

interface BookingProps {
  propertyDetail: PropertyInfo | null
  error?: any
  userId: string | null
  settingUrl: SettingUrlProps | null
  businessInfor: any
  landingSetting: any
}

const BookingSummaryPage: NextPage<BookingProps> = (props) => {
  const { error, userId, businessInfor, landingSetting } = props
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
  return (
    <>
      <Layout title={`${getPropertyTitleSite(props?.propertyDetail?.listingInfo?.externalName as string, userId as string, businessInfor?.hostName)}`}>
        <BookingSummary {...props} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const hostDomain = req?.headers?.host
  const publicSiteDomain = process.env.NEXT_PUBLIC_SITE_URL?.replace('http://', '')?.replace('https://', '')
  const { reservationId } = context.query
  const dataServerProps = { ...(await serverProps(context)) }
  let settingUrl: SettingUrlProps | null = null
  let resultProps: BookingProps = {
    error: null,
    propertyDetail: null,
    userId: dataServerProps?.userId,
    settingUrl,
    businessInfor: null,
    landingSetting: null
  }
  try {
    const res: any = await getDetailBooking(reservationId)
    if (res?.data?.success) {
      resultProps = { ...resultProps, ...dataServerProps, propertyDetail: res?.data?.data }
    }
  } catch (err: any) {
    resultProps = { ...resultProps, ...dataServerProps, error: err.data.error }
  }
  const hostID = resultProps?.propertyDetail?.hostId
  const { payment_intent_client_secret, payment_intent } = context.query
  if (payment_intent_client_secret || payment_intent) {
    // redirect from stripe
    return {
      redirect: {
        permanent: true,
        destination: `https://${hostDomain}/booking-summary/${reservationId}`,
      },
    }
  }
  if (hostID) {
    const resBusinessInfor: any = await getBusinessInfor(hostID?.toLowerCase())

    resultProps = { ...resultProps, businessInfor: resBusinessInfor.data }
    const resSettingUrl: any = await getSettingUrl(hostID)
    settingUrl = !isEmpty(resSettingUrl.data) && (resSettingUrl.data || []).find((v: SettingUrlProps) => v.isPrimary)
    if (settingUrl && checkRedirectActived(settingUrl, hostDomain)) {
      // support case change custom domain
      const { domain } = genDomain(context, settingUrl)
      return {
        redirect: {
          permanent: true,
          destination: `${domain}/booking-summary/${reservationId}`,
        },
      }
    }
    if (!settingUrl?.customId && hostDomain !== publicSiteDomain) {
      // support case remove custom domain, redirect to default url
      return {
        redirect: {
          permanent: true,
          destination: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-summary/${reservationId}`,
        },
      }
    }
  }

  return { props: { ...resultProps, settingUrl } }
}

export default BookingSummaryPage
