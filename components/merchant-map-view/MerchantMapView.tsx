import { NextPage } from 'next'
import axios from 'axios'
import MapsBoxMerchantV2 from '@dtravel/components/maps/MapsBoxMerchantV2'
import MerchantList from './MerchantList'
import React, { useEffect, useState } from 'react'
import { MerchantListProps } from '@dtravel/helpers/interfaces'
import { useRouter } from 'next/router'
import { removeDuplicate, isCryptoCurrency } from '@dtravel/helpers/utils/common'
import { CircularProgress } from '@mui/material'
import moment from 'moment/moment'
import { DATE_FORMAT } from '@dtravel/helpers/constants/constants'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setIsRateLoadDone, setRate, setRates } from '@dtravel/redux/slices/property'
import { RateData } from '@dtravel/helpers/interfaces/property'
import { getRateCurrency } from '@dtravel/helpers/api/property'
import LandingSearchBar from '@dtravel/components/merchant-landing/LandingSearchBar'
import Header from '@dtravel/components/layout/Header'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import { isEmpty } from '@dtravel/utils/common'

interface Props {
  userId?: string | null
}
export interface FilterProps {
  beds?: number | string
  bathrooms?: number | string
  minPrice?: number | string
  maxPrice?: number | string
  locations?: string[]
}

let cancelToken: any
let cacheFilter: FilterProps = {}

const MerchantMapView: NextPage<Props> = ({ userId }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { hostId } = router.query
  const hostID = (userId || hostId) as string
  const { businessInfor, rates, rate } = useAppSelector((state) => state.property)
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const [merchantData, setMerchantData] = useState<any[]>([])
  const [paging, setPaging] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [isShowBasePrice, setIsShowBasePrice] = useState<boolean>(false)
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const isCrypto = isCryptoCurrency(selectedCurrency?.key)
  const priceRoundedMin = isCrypto ? 0.005 : 0.5
  const priceRoundedMax = isCrypto ? 0.0049 : 0.49

  useEffect(() => {
    if (selectedCurrency && !isEmpty(rates)) {
      const newRate = rates.find((v: RateData) => v.key === selectedCurrency.key)
      if (newRate && newRate.key !== rate?.key) dispatch(setRate(newRate))
    }
    // eslint-disable-next-line
  }, [selectedCurrency, rates])

  useEffect(() => {
    async function fetchRates() {
      try {
        const res: any = await getRateCurrency()
        if (res.data) dispatch(setRates(res.data))
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(setIsRateLoadDone(true))
      }
    }
    fetchRates()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchData(1, {})
    // eslint-disable-next-line
  }, [router.query, rate?.key])

  const fetchData = async (newPage?: number, params?: FilterProps) => {
    if (params) cacheFilter = { ...params }
    try {
      let dataDTO: MerchantListProps = {
        hostAddress: (hostID as string).toLowerCase(),
        pageSize: 8,
        page: newPage || 1,
        ...cacheFilter,
        ...params,
      }
      const { check_in, check_out, adults, children, infants, pets, locations, minPrice, maxPrice, beds, bathrooms } =
        router.query
      if (check_in && moment(check_in, DATE_FORMAT).isValid()) {
        dataDTO.checkinDate = String(check_in)
      }
      if (check_out && moment(check_out, DATE_FORMAT).isValid()) {
        dataDTO.checkoutDate = String(check_out)
      }
      if (adults && Number(adults)) {
        dataDTO.adults = Number(adults)
      }
      if (children && Number(children)) {
        dataDTO.children = Number(children)
      }
      if (infants && Number(infants)) {
        dataDTO.infants = Number(infants)
      }
      if (pets && Number(pets)) {
        dataDTO.pets = Number(pets)
      }
      if (locations && typeof locations === 'string') {
        dataDTO.locations = [locations]
      }
      if (locations && Array.isArray(locations)) {
        dataDTO.locations = [...locations]
      }
      if (minPrice) {
        dataDTO.minPrice =
          (Math.round(Number(minPrice)) > priceRoundedMin
            ? Math.round(Number(minPrice)) - priceRoundedMin
            : Math.round(Number(minPrice))) * Number(rate.rate)
      }
      if (maxPrice) {
        dataDTO.maxPrice = (Math.round(Number(maxPrice)) + priceRoundedMax) * Number(rate.rate)
      }
      if (beds) {
        dataDTO.beds = Number(beds)
      }
      if (bathrooms) {
        dataDTO.bathrooms = Number(bathrooms)
      }

      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel('request canceled')
      }
      cancelToken = axios.CancelToken.source()
      setLoading(true)
      setIsShowBasePrice(!!dataDTO.checkinDate && !!dataDTO.checkoutDate)
      const res: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/listing-service/v2/calendar/search`,
        dataDTO,
        { cancelToken: cancelToken.token }
      )
      if (res?.data?.success) {
        if (newPage && newPage !== 1) setMerchantData(removeDuplicate([...merchantData, ...(res?.data?.data || [])]))
        else setMerchantData(res?.data?.data)
        setPaging(res?.data.paging)
      }
      setLoading(false)
    } catch (error: any) {
      if (error?.message !== 'request canceled') setLoading(false)
    }
  }

  return (
    <div className="w-full h-full">
      {loading && (
        <div
          className={
            'md:hidden fixed h-full w-full top-0 left-0 flex items-center justify-center opacity-30 bg-white z-40'
          }
        >
          <CircularProgress size={36} style={{ color: '#5F4013' }} />
        </div>
      )}
      <Header middleContent={<LandingSearchBar isInHeader />} hideContactAndLogo={isMobile} hasBorderBottom />
      <div className="w-screen h-full absolute lg:pt-[76px] flex">
        <MerchantList
          merchantData={merchantData}
          paging={paging}
          loading={loading}
          fetchData={fetchData}
          businessInfor={businessInfor}
          userId={hostID}
          isShowBasePrice={isShowBasePrice}
        />
        <div className="h-full w-full lg:w-[calc(100%_-_617px)] xl:w-[calc(100%_-_768px)] mapCustomContainer relative">
          <MapsBoxMerchantV2
            merchantData={merchantData}
            hiddenMarker={userId === '5cea78c6-2f2c-4230-bc45-f60f4b82886b'}
            isShowBasePrice={isShowBasePrice}
          />
        </div>
      </div>
    </div>
  )
}

export default MerchantMapView
