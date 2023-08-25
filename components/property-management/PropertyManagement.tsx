import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useAppSelector } from '@dtravel/redux/hooks'
import { getPropertyManagementInfo } from '@dtravel/helpers/api/property-management'
import { isEmpty } from '@dtravel/utils/common'
import PropertyManagementFAQ from './PropertyManagementFAQ'
import { getMerchantList } from '@dtravel/helpers/api/merchant'
import MerchantListItem from '../merchant-map-view/MerchantListItem'
import ReviewScrollHorizontal from '../common/ReviewScrollHorizontal'
import PropertyManagementHeroSection from './PropertyManagementHeroSection'
import PropertyManagementWhyUs from './PropertyManagementWhyUs'
import PropertyManagementServices from './PropertyManagementServices'
import PropertyManagementUnlock from './PropertyManagementUnlock'
import LandingFooter from '../layout/LandingFooter'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const PropertyManagementHeader = dynamic(() => import('./PropertyManagementHeader'), { ssr: false })

interface Props {
  userId?: string | null
  isMobile: boolean
}

const PropertyManagement: NextPage<Props> = ({ userId, isMobile }) => {
  const router = useRouter()
  const { hostId } = router.query
  const { landingSetting } = useAppSelector((state) => state.property)
  const [data, setData] = useState<any>({})
  const [listingData, setListingData] = useState<any[]>([])
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const isAdeel = landingSetting?.name === 'adeel'

  useEffect(() => {
    async function fetchPropertyManagementInfo() {
      try {
        setLoadingData(true)
        const res: any = await getPropertyManagementInfo(landingSetting?.userId)
        if (res?.data?.success) setData(res?.data?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingData(false)
      }
    }
    async function fetchListing() {
      try {
        let dataDTO: any = {
          hostAddress: landingSetting?.userId,
          // hostAddress: '4362a2bc-fd57-4dd3-9691-607a8d6766dd',
          pageSize: 1000,
          page: 1,
        }
        if (isAdeel && process.env.NEXT_PUBLIC_ADEEL_SPECIAL_PROPERTY_IDS_SHOW) {
          const propertyIdsShow = JSON.parse(process.env.NEXT_PUBLIC_ADEEL_SPECIAL_PROPERTY_IDS_SHOW)
          dataDTO = { ...dataDTO, ids: propertyIdsShow }
        }
        const res: any = await getMerchantList(dataDTO)
        if (res?.data?.success) {
          let propertyList: Array<any> = []
          propertyList = res?.data?.data || []
          setListingData(propertyList)
        }
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchAll() {
      await Promise.all([fetchPropertyManagementInfo(), fetchListing()])
    }
    fetchAll()
    // eslint-disable-next-line
  }, [landingSetting?.userId])

  const getUrl = () => {
    if (typeof window === 'undefined') return ''
    return hostId ? `/${hostId}` : `/`
  }
  const hasFeatured = !isEmpty(listingData)
  if (isEmpty(data)) return <></>
  return (
    <>
      <div className="sticky top-0 z-10 bg-white w-[100vw] flex items-center justify-center h-[80px]">
        <PropertyManagementHeader
          url={getUrl()}
          isEmptyFeatured={!hasFeatured}
          managementData={data}
        />
      </div>
      <PropertyManagementHeroSection hero={data?.hero} isLoading={loadingData} />
      <div className="w-full md:max-w-[834px] lg:max-w-[1280px] xl:max-w-[1232px] m-auto px-[16px] md:px-[32px] lg:px-[48px]">
        <PropertyManagementServices data={data} />
        {hasFeatured && (
          <div className="pt-[64px] lg:pt-[112px]" id={'featured_management'}>
            <div className="bg-white w-full">
              <div className="flex flex-col items-center gap-[16px] mb-[32px] lg:mb-[48px] xl:mb-[64px]">
                <p className="text-grayscale-800 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em] text-center">
                  Featured properties
                </p>
                <p className="text-grayscale-600 font-inter-400 text-16-24 text-center">
                  A look at some of the properties we manage
                </p>
              </div>
              {hasFeatured &&
                <ReviewScrollHorizontal total={listingData.length}>
                  {(listingData || []).map((el: any, idx: number) => {
                    const isMultiple = listingData.length > 1
                    return <MerchantListItem key={idx} item={el} isMobile={isMobile} isLandingPageSpecial hiddenPrice isMultiple={isMultiple} />
                  })}
                </ReviewScrollHorizontal>
              }
            </div>
          </div>
        )}
        <PropertyManagementWhyUs data={data} />
        <PropertyManagementUnlock bookACall={data?.bookACall} isLoading={loadingData} />
        <PropertyManagementFAQ data={data} />
      </div>
      <div className="flex justify-between items-center w-full m-auto px-[16px] md:px-[32px] lg:px-[48px]">
        <LandingFooter hiddenCurrency />
      </div>
    </>
  )
}

export default PropertyManagement
