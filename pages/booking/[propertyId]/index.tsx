import { NextPage } from 'next'
import { PropertyInfo } from '@dtravel/helpers/interfaces/property'
import api from '@dtravel/helpers/api/api'
import Booking from '@dtravel/components/booking/Booking'
import Layout from '@dtravel/components/layout/Layout'
import serverProps from '@dtravel/utils/serverProps'
import { genDomain } from '@dtravel/helpers/utils/common'
import { SettingUrlProps } from '@dtravel/helpers/interfaces'
import { useAppDispatch } from '@dtravel/redux/hooks'
import { useEffect } from 'react'
import { setBusinessInfor, setLandingSetting, setUserID } from '@dtravel/redux/slices/property'
import { RESERVATION_STATUS } from '@dtravel/helpers/constants/constants'
import NotFound from '@dtravel/components/layout/NotFound'
import { getDetailBooking } from '@dtravel/helpers/api/booking'
import { checkRedirectActived, getPropertyTitleSite } from '@dtravel/utils/common'
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
  const { propertyId, reservationId } = context.query
  const dataServerProps = { ...(await serverProps(context)) }
  const { userId, settingUrl } = dataServerProps
  const { req } = context
  const hostDomain = req?.headers?.host

  let resultProps: BookingProps = { ...dataServerProps, propertyDetail: null }
  try {
    const res: any = await api({
      method: 'get',
      url: `/listing-service/v2/property/${(userId as string).toLowerCase()}/${propertyId}`,
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
