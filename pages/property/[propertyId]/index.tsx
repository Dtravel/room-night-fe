import Layout from '@dtravel/components/layout/Layout'
import { PropertyInfo } from '@dtravel/helpers/interfaces/property'
import axios from 'axios'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import serverProps from '@dtravel/utils/serverProps'
import PropertyDetail from '@dtravel/components/property-detail/PropertyDetail'
import { useAppDispatch } from '@dtravel/redux/hooks'
import { setBusinessInfor, setLandingSetting } from '@dtravel/redux/slices/property'
import { genDomain, isUserId } from '@dtravel/helpers/utils/common'
import queryString from 'query-string'
import NotFound from '@dtravel/components/layout/NotFound'
import { checkRedirectActived, isEmpty } from '@dtravel/utils/common'

interface Props {
  userAgent?: string
  data: PropertyInfo
  error: any
  hostId: string
  propertyId: string
  businessInfor: any
  landingSetting: any
}

const PropertyDetailPage: NextPage<Props> = ({ error, businessInfor, landingSetting, ...otherProps }) => {
  const { data } = otherProps
  const dispatch = useAppDispatch()

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
  const { address, bedrooms, externalName, propertyTypeName } = data
  const addressDataList = !isEmpty([address.city, address.state]) ? [address.city, address.state] : [address.country]
  const addressData = addressDataList.filter(v => !isEmpty(v))
  const title = landingSetting?.metaTitle ||
    `${bedrooms ?
      `${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''} ${propertyTypeName}` :
      'Studio'
    } in ${addressData.join(', ')}`
  const siteName = businessInfor?.hostName
  const description = landingSetting?.metaDescription || `${externalName}${siteName ? ` by ${siteName}.` : '.'} Book direct and save up to 20%.`
  return (
    <Layout
      title={title}
      description={description}
      image={data.thumbnail + '?w=640'}
    >
      <PropertyDetail {...otherProps} />
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const { propertyId, ...otherQuery } = context.query
  const hostDomain = req?.headers?.host

  const dataServerProps = { ...(await serverProps(context)) }
  const { userId, settingUrl } = dataServerProps

  try {
    const res: any = await axios
      .get(process.env.NEXT_PUBLIC_INTERNAL_LISTING_API_URL + '/v2/property/' + userId + '/' + propertyId, {
        timeout: 5000,
        headers: { 'User-Agent': 'Dtravel-Internal/guest' },
      })
      .then((res) => res.data)
    return {
      props: {
        data: JSON.parse(JSON.stringify(res.data)),
        propertyId,
        hostId: userId?.toLowerCase(),
        ...dataServerProps,
      },
    }
  } catch (err) {
    return {
      props: {
        data: null,
        propertyId,
        hostId: userId?.toLowerCase(),
        ...dataServerProps,
        error: { statusCode: 404 },
      },
    }
  }
}

export default PropertyDetailPage
