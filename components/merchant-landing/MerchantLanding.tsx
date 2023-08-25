import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@dtravel/redux/hooks'
import { getMerchantLanding, getRateCurrency } from '@dtravel/helpers/api/property'
import { setRate, setRates } from '@dtravel/redux/slices/property'
import { MerchantLandingDataProps, RateData } from '@dtravel/helpers/interfaces/property'
import { getMerchantList } from '@dtravel/helpers/api/merchant'
import { isEmpty } from '@dtravel/utils/common'
import MerchantListItem from '../merchant-map-view/MerchantListItem'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import LandingHeader from '@dtravel/components/merchant-landing/LandingHeader'
import LandingHeroSection from '@dtravel/components/merchant-landing/LandingHeroSection'
import { setIsOpenSelectCurrency } from '@dtravel/redux/slices/common'
import ic_arrow_down from '@dtravel/assets/icons/ic_arrow_down.svg'
import Image from 'next/image'
import Link from 'next/link'
import { DTRAVEL_URL } from '@dtravel/helpers/constants/constants'

interface Props {
  userId?: string | null
  isMobile: boolean
}

const MerchantLanding: NextPage<Props> = (props) => {
  const { userId, isMobile } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const isMounted = useMounted()
  const { hostId } = router.query
  const hostID = (userId || hostId) as string
  const { rates, rate, businessInfor } = useAppSelector((state) => state.property)
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const [landingData, setLandingData] = useState<MerchantLandingDataProps | null>(null)
  const [listingData, setListingData] = useState<any[]>([])
  const [loadingData, setLoadingData] = useState<boolean>(false)

  useEffect(() => {
    async function fetchListing() {
      try {
        let dataDTO: any = {
          hostAddress: (hostID as string).toLowerCase(),
          pageSize: 8,
          page: 1,
          // minPrice: 0,
          // maxPrice: 9999,
        }
        const res: any = await getMerchantList(dataDTO)
        if (res?.data?.success) {
          const newData = (res?.data?.data || []).filter((v: any, idx: number) => idx < 8)
          const lengthData = newData.length
          const result =
            lengthData > 4 && lengthData < 8 ? newData.filter((v: any, idx: number) => idx < 4) : [...newData]
          setListingData(result)
        }
      } catch (error) {
        console.log(error)
      }
    }

    async function fetchLandingData() {
      try {
        setLoadingData(true)
        const res: any = await getMerchantLanding(hostID)
        if (res.data) setLandingData(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingData(false)
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
      await Promise.all([fetchRates(), fetchLandingData(), fetchListing()])
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

  const getUrl = () => {
    if (typeof window === 'undefined') return ''
    return hostId ? `${hostId}/` : `/`
  }

  const hasFeatured = !isEmpty(listingData)
  return (
    <>
      <div className="w-full">
        <LandingHeader url={getUrl()} businessInfor={businessInfor} onChangeViewMode={goToMerchantMap} isEmptyFeatured={!hasFeatured} />
        {isMounted && (
          <LandingHeroSection
            userId={userId}
            isLoading={loadingData}
            landingData={landingData}
            businessInfor={businessInfor}
            onChangeViewMode={goToMerchantMap}
          />
        )}

        {/* List properties */}
        {hasFeatured &&
          <div className="bg-white px-[16px] md:px-[24px] lg:px-[16px] w-full">
            <p className="text-neutral-900 font-inter-400 text-24-32 tracking-[-0.02em] text-center mt-[32px] mb-[24px] md:mt-[40px] md:mb-[40px] xl:mt-[48px] xl:mb-[48px]">
              Featured listings
            </p>
            <div className="flex flex-wrap">
              {!isEmpty(listingData) &&
                (listingData || []).map((el: any, idx: number) => {
                  return <MerchantListItem key={idx} item={el} isLandingPage isMobile={isMobile} />
                })}
            </div>
          </div>
        }
        {!isEmpty(listingData) && (
          <div className={'flex justify-center px-[16px]'}>
            <button
              className={
                'flex items-center justify-center h-[56px] my-[48px] text-neutral-900 font-inter-500 text-16-20 rounded-[12px] border border-neutral-300 px-[24px] ' +
                'w-full md:w-auto'
              }
              onClick={goToMerchantMap}
            >
              Show all listings
            </button>
          </div>
        )}

        <div className="w-full flex items-center justify-between px-[16px] md:px-[32px] lg:px-[24px] py-[34px] text-12-16 font-inter-500 tracking-[-0.02em] text-neutral-8 bg-white">
          <div className="flex flex-col">
            <p className="mb-[2px] text-12-16 font-inter-500 text-neutral-8">
              {businessInfor?.hostName || businessInfor?.contactName}
            </p>
            <Link href={DTRAVEL_URL} passHref target={"_blank"}>
              <span className="font-inter-400 text-10-12 text-neutral-600 hover:text-grayscale-800">Powered by Dtravel</span>
            </Link>
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
              dispatch(setIsOpenSelectCurrency(true))
            }}
          >
            {selectedCurrency.type === 'CRYPTO' ? (
              <span className={'rounded-[100px] px-[4px] py-[2px] text-white'}>
                <Image src={selectedCurrency.icon} alt={selectedCurrency.key} width={16} height={16} />
              </span>
            ) : (
              <span
                className={
                  'mr-[4px] bg-neutral-900 rounded-[100px] px-[4px] py-[2px] text-white font-inter-600 text-10-12 tracking-[0.04em] uppercase'
                }
              >
                {selectedCurrency.symbol}
              </span>
            )}
            <span className={'mr-[4px] tracking-[-0.02em] text-neutral-800 text-12-16 font-inter-500'}>
              &nbsp;{selectedCurrency.key}
            </span>
            <Image src={ic_arrow_down} alt="" width={16} height={16} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MerchantLanding
