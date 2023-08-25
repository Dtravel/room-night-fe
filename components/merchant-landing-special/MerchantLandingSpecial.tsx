/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@dtravel/redux/hooks'
import { getRateCurrency } from '@dtravel/helpers/api/property'
import { setRate, setRates } from '@dtravel/redux/slices/property'
import { RateData } from '@dtravel/helpers/interfaces/property'
import { getMerchantList } from '@dtravel/helpers/api/merchant'
import { getImageUrlSpecial, isEmpty } from '@dtravel/utils/common'
import MerchantListItem from '../merchant-map-view/MerchantListItem'
import useMounted from '@dtravel/helpers/hooks/useMounted'
// import LandingHeaderSpecial from '@dtravel/components/merchant-landing-special/LandingHeaderSpecial'
import LandingHeroSection from '@dtravel/components/merchant-landing-special/LandingHeroSection'
import MerchantLandingSpecialAboutUs from './MerchantLandingSpecialAboutUs'
import MerchantLandingSpecialWhatSet from './MerchantLandingSpecialWhatSet'
import MerchantLandingSpecialListProperty from './MerchantLandingSpecialListProperty'
import MerchantLandingSpecialReviews from './MerchantLandingSpecialReviews'
import MerchantLandingSpecialFAQ from './MerchantLandingSpecialFAQ'
import LandingFooter from '../layout/LandingFooter'
import dynamic from 'next/dynamic'
import MerchantLandingGetAway from './MerchantLandingGetAway'

const LandingHeaderSpecial = dynamic(
  () => import('@dtravel/components/merchant-landing-special/LandingHeaderSpecial'),
  { ssr: false }
)

interface Props {
  userId?: string | null
  isMobile: boolean
}

const MerchantLandingSpecial: NextPage<Props> = (props) => {
  const { userId, isMobile } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const isMounted = useMounted()
  const { hostId } = router.query
  const hostID = (userId || hostId) as string
  const { rates, rate, landingSetting } = useAppSelector((state) => state.property)
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const [listingData, setListingData] = useState<any[]>([])
  const isRiley = landingSetting?.name === 'riley'
  const isAdeel = landingSetting?.name === 'adeel'

  useEffect(() => {
    async function fetchListing() {
      try {
        let dataDTO: any = {
          hostAddress: (hostID as string).toLowerCase(),
          pageSize: 1000,
          page: 1,
          // minPrice: 0,
          // maxPrice: 9999,
        }
        if (isRiley && process.env.NEXT_PUBLIC_SPECIAL_PROPERTY_IDS_SHOW) {
          const propertyIdsShow = JSON.parse(process.env.NEXT_PUBLIC_SPECIAL_PROPERTY_IDS_SHOW)
          dataDTO = { ...dataDTO, ids: propertyIdsShow }
        }
        const res: any = await getMerchantList(dataDTO)
        if (res?.data?.success) {
          let propertyList: Array<any> = []
          propertyList = res?.data?.data || []
          if (isRiley && process.env.NEXT_PUBLIC_SPECIAL_PROPERTY_IDS_SHOW) {
            const propertyIdsShow = JSON.parse(process.env.NEXT_PUBLIC_SPECIAL_PROPERTY_IDS_SHOW)
            if (propertyIdsShow) {
              propertyList = propertyIdsShow
                .map((id: number) => (res?.data?.data || []).find((v: any) => v.id === id))
                .filter((v: any) => v)
            }
          }
          setListingData(propertyList)
        }
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchRates() {
      try {
        const res: any = await getRateCurrency()
        if (res.data) dispatch(setRates(res.data))
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchAll() {
      if (!isAdeel) await Promise.all([fetchRates(), fetchListing()])
      else await Promise.all([fetchRates()])
    }
    fetchAll()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (selectedCurrency) {
      const newRate = rates.find((v: RateData) => v.key === selectedCurrency.key)
      if (newRate && newRate.key !== rate?.key) dispatch(setRate(newRate))
    }
    // eslint-disable-next-line
  }, [selectedCurrency, rates])

  const goToMerchantMap = () => {
    if (typeof window !== 'undefined') {
      // window.open(hostId ? `/${hostId}/property` : `/property`, '_blank')
      router.push({ pathname: hostId ? `/${hostId}/property` : `/property` })
    }
  }
  const goToAdeelMerchantMap = (el: any) => {
    router.push({
      pathname: hostId ? `/${hostId}/property` : `/property`,
      query: { locations: el?.location },
    })
  }

  const getUrl = () => {
    if (typeof window === 'undefined') return ''
    return hostId ? `${hostId}` : `/`
  }
  const adeelFeatureDara = [
    {
      name: 'Toronto',
      location: 'Toronto, Canada',
      image: getImageUrlSpecial('InstantSuites/Toronto.webp', true),
    },
    {
      name: 'Canmore',
      location: 'Canmore, Canada',
      image: getImageUrlSpecial('InstantSuites/image.webp', true),
    },
    {
      name: 'Mont Tremblant',
      location: 'Mont-Tremblant, Canada',
      image: getImageUrlSpecial('InstantSuites/mont tremblant.webp', true),
    },
  ]
  const hasFeatured = (!isEmpty(listingData) && !isAdeel) || isAdeel

  return (
    <>
      <div className="sticky top-0 z-10 bg-white w-[100vw] flex items-center justify-center h-[80px]">
        <LandingHeaderSpecial url={getUrl()} onChangeViewMode={goToMerchantMap} isEmptyFeatured={!hasFeatured} />
      </div>
      <div className="w-full md:max-w-[834px] lg:max-w-[1280px] xl:max-w-[1232px] m-auto px-[16px] md:px-[32px] lg:px-[48px]">
        {isMounted && <LandingHeroSection />}

        {/* List properties */}
        {hasFeatured && (
          <div className="pt-[64px] lg:pt-[112px]" id={'featured'}>
            <div className="bg-white w-full">
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-[16px] justify-between mb-[32px] lg:mb-[64px] xl:mb-[80px] ">
                <div className="w-full lg:w-1/2 lg:pr-[64px] xl:pr-[96px] mb-[16px] lg:mb-0">
                  <p className="text-grayscale-900 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em]">
                    {isAdeel ? 'Locations' : 'Featured'}
                  </p>
                </div>
                <p className="text-grayscale-600 font-inter-400 text-20-28 lg:w-1/2">
                  {landingSetting?.featured?.title ||
                    'Discover the extraordinary. Your dream stay awaits in our featured properties.'}
                </p>
              </div>
              <div
                className={`flex flex-col md:flex-row w-full ${isRiley ? 'gap-[16px]' : 'gap-[32px] md:gap-[16px]'}`}
              >
                {(listingData || []).map((el: any, idx: number) => {
                  if (idx >= 3) return null
                  return <MerchantListItem key={idx} item={el} isMobile={isMobile} isLandingPageSpecial />
                })}
                {isAdeel &&
                  adeelFeatureDara.map((el: any, idx: number) => {
                    return (
                      <div key={idx} className="w-full md:w-[calc(100%/3_-_10.67px)]">
                        <div
                          className={`cursor-pointer object-cover w-full rounded-xl h-[358px] sm:h-[358px] md:h-[224px] lg:h-[298px] xl:h-[368px] 2xl:h-[368px]`}
                          onClick={() => goToAdeelMerchantMap(el)}
                        >
                          <img
                            src={el.image}
                            alt=""
                            width={408}
                            height={408}
                            className={'object-cover w-full h-full rounded-xl'}
                          />
                        </div>
                        <div
                          className={`cursor-pointer w-full flex justify-between items-center mt-6`}
                          onClick={() => goToAdeelMerchantMap(el)}
                        >
                          <p
                            className={`line-clamp-1 tracking-[-0.02em] text-ellipsis font-inter-500 text-neutral-800 text-24-32`}
                          >
                            {el?.name}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        )}
        {landingSetting && <MerchantLandingGetAway />}
        {/* Reviews */}
        {landingSetting && <MerchantLandingSpecialReviews />}
        {/* About us */}
        {landingSetting && <MerchantLandingSpecialAboutUs />}
        {/* What sets us apart */}
        {landingSetting?.whatSet && <MerchantLandingSpecialWhatSet />}
        {/* List your property with us */}
        {landingSetting?.property && <MerchantLandingSpecialListProperty />}
        {/* FAQ */}
        {landingSetting?.faq && <MerchantLandingSpecialFAQ />}

        {/* Merchant Landing Footer */}
        <LandingFooter />
      </div>
    </>
  )
}

export default MerchantLandingSpecial
