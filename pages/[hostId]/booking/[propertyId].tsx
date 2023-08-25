import { NextPage } from 'next'
import { PropertyInfo } from '@dtravel/helpers/interfaces/property'
import api from '@dtravel/helpers/api/api'
import Booking from '@dtravel/components/booking/Booking'
import Layout from '@dtravel/components/layout/Layout'
import serverProps from '@dtravel/utils/serverProps'
import { genDomain, genDomainDefault } from '@dtravel/helpers/utils/common'
import { SettingUrlProps } from '@dtravel/helpers/interfaces'
import { useAppDispatch } from '@dtravel/redux/hooks'
import { useEffect } from 'react'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import NotFound from '@dtravel/components/layout/NotFound'
import { getDetailBooking } from '@dtravel/helpers/api/booking'
import { RESERVATION_STATUS } from '@dtravel/helpers/constants/constants'
import { getPropertyTitleSite } from '@dtravel/utils/common'

interface BookingProps {
  propertyDetail: PropertyInfo | null
  error?: any
  settingUrl: SettingUrlProps | null
  businessInfor: any
  landingSetting: any
  userId: string | null
}

const BookingPage: NextPage<BookingProps> = (props) => {
  const dispatch = useAppDispatch()
  const { error, propertyDetail, settingUrl, businessInfor, landingSetting, userId } = props

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
    <Layout title={`${getPropertyTitleSite(props?.propertyDetail?.externalName as string, userId as string, businessInfor?.hostName)}`}>
      <Booking propertyDetail={propertyDetail} settingUrl={settingUrl} />
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const { hostId, propertyId, reservationId } = context.query
  const { req } = context
  const hostDomain = req?.headers?.host
  const dataServerProps = { ...(await serverProps(context)) }
  const { settingUrl, businessInfor } = dataServerProps
  if (reservationId) {
    try {
      const res: any = await getDetailBooking(reservationId as string)
      if (res?.data?.success) {
        const manualData = res?.data?.data
        if (
          !(
            manualData?.status === RESERVATION_STATUS.EXPIRED ||
            manualData?.status === RESERVATION_STATUS.INQUIRY ||
            manualData?.status === RESERVATION_STATUS.MANUAL_CANCELLED ||
            manualData?.status === RESERVATION_STATUS.DRAFT
          )
        ) {
          return {
            redirect: {
              permanent: true,
              destination: `https://${hostDomain}/booking-summary/${reservationId}`,
            },
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  if (settingUrl?.customId) {
    const { domain, paramsSearch } = genDomain(context, settingUrl)
    return {
      redirect: {
        permanent: true,
        destination: `${domain}/booking/${propertyId}${paramsSearch ? `?${paramsSearch}` : ''}`,
      },
    }
  } else if (businessInfor?.userId && businessInfor?.userId !== hostId) {
    // support redirect wallet address
    const { domain, paramsSearch } = genDomainDefault(context)
    return {
      redirect: {
        permanent: true,
        destination: `${domain}/${businessInfor?.userId}/booking/${propertyId}${paramsSearch ? `?${paramsSearch}` : ''}`,
      },
    }
  }
  let resultProps: BookingProps = { ...dataServerProps, propertyDetail: null }
  try {
    const res: any = await api({
      method: 'get',
      url: `/listing-service/v2/property/${(hostId as string).toLowerCase()}/${propertyId}`,
    })
    if (res?.data?.success) {
      resultProps = { ...resultProps, propertyDetail: res?.data?.data, error: null }
    }
  } catch (err: any) {
    resultProps = { ...resultProps, error: { statusCode: 404 } }
  }
  return { props: { ...resultProps, ...dataServerProps } }
}

export default BookingPage
