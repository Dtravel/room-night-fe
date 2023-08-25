import HotelAmenities from '@dtravel/components/property-detail/HotelAmenities'
import HotelArrivalAndDeparture from '@dtravel/components/property-detail/HotelArrivalAndDeparture'
import HotelCancelPolicy from '@dtravel/components/property-detail/HotelCancelPolicy'
import HotelLocation from '@dtravel/components/property-detail/HotelLocation'
import HotelNameAndDescription from '@dtravel/components/property-detail/HotelNameAndDescription'
import HotelRules from '@dtravel/components/property-detail/HotelRules'
import PriceCard from '@dtravel/components/property-detail/PriceCard'
import SpaceDetails from '@dtravel/components/property-detail/SpaceDetails'
import YourHost from '@dtravel/components/property-detail/YourHost'
import { addPageView, getHistoryTransactionBSC, getPriceReservationV2, getPropertyDetail } from '@dtravel/helpers/api/property'
import { PriceReservation, PropertyInfo, ReservationAvailabilityData } from '@dtravel/helpers/interfaces/property'
import { useAppSelector } from '@dtravel/redux/hooks'
import { setLoading, setSelectedCurrency, setToastError } from '@dtravel/redux/slices/common'
import { setCheckIn, setCheckOut } from '@dtravel/redux/slices/property'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import HeroImages from '@dtravel/components/property-detail/HeroImages'
import ShowAllGallery from '@dtravel/components/property-detail/ShowAllGallery'
import BookingSaving from '@dtravel/components/booking/BookingSaving'
import MoreProperties from '@dtravel/components/property-detail/MoreProperties'
import { getMerchantList } from '@dtravel/helpers/api/merchant'
import { useRouter } from 'next/router'
import moment from 'moment'
import { DATE_FORMAT } from '@dtravel/helpers/constants/constants'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import { convertCurrency } from '@dtravel/helpers/api/common'
import axios from 'axios'
import PropertyReview from './PropertyReview'
import { isEmpty } from '@dtravel/utils/common'
import { isBSC } from '@dtravel/helpers/utils/common'
import { getHistoryTransaction } from '@dtravel/helpers/utils/ether'
import BookTransaction from './BookTransaction'

interface Props {
  data: PropertyInfo
  hostId: string
  propertyId: string
}

const PropertyDetail: NextPage<Props> = ({ data, hostId, propertyId }) => {
  const dispatch = useDispatch()
  const cancelToken = useRef<any>(null)
  const router = useRouter()
  const isMounted = useMounted()
  const { selectedCurrency, listCurrency, isSelectedCurrencyByCountry } = useAppSelector((state) => state.common)
  const [pmsPropertyId, setPmsPropertyId] = useState<string>('')
  const [moreProperties, setMoreProperties] = useState<any[]>([])
  const [priceData, setPriceData] = useState<PriceReservation | null>(null)
  const [avgPrice, setAvgPrice] = useState<number>(0)
  const [avgPriceRoot, setAvgPriceRoot] = useState<number>(0)
  const propertyContractData: any = (data?.propertyContracts || []).find((v: any) => !isEmpty(v.propertyContract) && isBSC(v.chainId))

  useEffect(() => {
    setPmsPropertyId(data ? data.id.toString() : '')
  }, [data])

  // set selected currency if user do not select anyone currency before
  useEffect(() => {
    if (data && data.propertyPrice && Array.isArray(listCurrency) && listCurrency.length > 0) {
      const selectedCurrencyByUser = window.localStorage.getItem('currency')
      if (!selectedCurrencyByUser && !isSelectedCurrencyByCountry) {
        const currencyByPropery = data.propertyPrice.currency
        const item = listCurrency.find((curr) => curr.key === currencyByPropery)
        if (item) {
          dispatch(setSelectedCurrency(item))
        }
      }
    }
    // eslint-disable-next-line
  }, [data, listCurrency, isSelectedCurrencyByCountry])

  // update pageView (for tracking)
  useEffect(() => {
    async function fetchPageView() {
      await addPageView({ propertyId, walletId: hostId })
    }
    if (hostId && propertyId) {
      const key = `pageViewSession${propertyId}`
      const pageViewSession = window.sessionStorage.getItem(key)
      if (!pageViewSession) {
        window.sessionStorage.setItem(key, String(+new Date()))
        fetchPageView()
      }
      fetchPropertyDetailToAvgPrice()
    }

    // fetch property detail to get avgPrice
    // fix bug: Price P1&P2 different Price P3 (https://dtravelnetwork.atlassian.net/browse/DTRAV-2265)
    async function fetchPropertyDetailToAvgPrice() {
      const res: any = await getPropertyDetail(hostId, propertyId)
      if (res.success && res.data) {
        const { avgPrice, basePrice } = res.data.propertyPrice
        setAvgPriceRoot(avgPrice || basePrice)
      }
    }
  }, [hostId, propertyId])

  // fetch price every have check_in, check_out date
  useEffect(() => {
    const { check_in, check_out } = router.query
    const checkinDate = check_in && moment(check_in, DATE_FORMAT).isValid() ? String(check_in) : ''
    const checkoutDate = check_out && moment(check_out, DATE_FORMAT).isValid() ? String(check_out) : ''
    const adults = router.query.adults && Number(router.query.adults) ? Number(router.query.adults) : 1
    const children = router.query.children && Number(router.query.children) ? Number(router.query.children) : 0
    const infants = router.query.infants && Number(router.query.infants) ? Number(router.query.infants) : 0
    const pets = router.query.pets && Number(router.query.pets) ? Number(router.query.pets) : 0
    const guestCount: number = adults + children + infants

    if (checkinDate && checkoutDate && guestCount > 0) {
      fetchPrice({
        checkinDate,
        checkoutDate,
        listingId: Number(propertyId),
        guestCount,
        adults,
        children,
        infants,
        pets,
        currency: selectedCurrency.key || 'USD',
      })
    } else {
      setPriceData(null)
    }

    async function fetchPrice(bodyData: ReservationAvailabilityData) {
      dispatch(setLoading(true))
      try {
        const res = await getPriceReservationV2(bodyData)
        setPriceData(res.data)
      } catch (error: any) {
        if (error?.data?.error?.code === 'NIGHTS_INVALID') {
          dispatch(setToastError({ message: error?.data?.error?.message }))
          dispatch(setCheckIn(null))
          dispatch(setCheckOut(null))
        } else {
          dispatch(setToastError({ message: error?.data?.error?.message }))
          setPriceData(null)
        }
      } finally {
        dispatch(setLoading(false))
      }
    }
    // eslint-disable-next-line
  }, [propertyId, selectedCurrency?.key, router.query])

  // fetch listing to section More properties
  useEffect(() => {
    async function fetchListing(hostId: string) {
      try {
        let dataDTO: any = {
          hostAddress: hostId.toLowerCase(),
          pageSize: 4,
          page: 1,
          minPrice: 0,
          maxPrice: 9999,
        }
        const res: any = await getMerchantList(dataDTO).then((res) => res.data)
        if (res.success && Array.isArray(res.data)) {
          setMoreProperties(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (hostId) {
      fetchListing(hostId)
    }
  }, [hostId])

  // get avgPrice,
  // currently, value avgPrice is in property currency, convert it to selected currency
  useEffect(() => {
    async function fetchConvertCurrency(value: number | string, baseCurr: string, targetCurr: string) {
      if (cancelToken.current) {
        cancelToken.current.cancel('request canceled')
      }
      cancelToken.current = axios.CancelToken.source()
      const res = await convertCurrency(value, baseCurr, targetCurr, cancelToken.current)
      if (res.success) {
        setAvgPrice(Math.round(res.data[targetCurr.toUpperCase()]))
      }
    }
    if (avgPriceRoot) {
      const { currency } = data.propertyPrice
      if (selectedCurrency.key && selectedCurrency.key.toUpperCase() !== currency) {
        fetchConvertCurrency(avgPriceRoot, currency, selectedCurrency.key.toLowerCase())
      } else {
        if (cancelToken.current) {
          cancelToken.current.cancel('request canceled')
        }
        setAvgPrice(Math.round(avgPriceRoot))
      }
    }
  }, [avgPriceRoot, data?.propertyPrice?.currency, selectedCurrency.key])

  return (
    <>
      <div id={'photos'}>{isMounted && <HeroImages propertyImages={data.propertyImages} />}</div>
      <ShowAllGallery propertyImages={data.propertyImages} address={data.address} externalName={data.externalName} />

      <div className={'mt-[24px] lg:mt-[32px] lg:flex lg:justify-between '}>
        <div className={'px-[16px] md:px-0 lg:w-8/12 lg:pr-[48px]'}>
          <HotelNameAndDescription {...data} />

          {/* Saving for mobile */}
          <div className={'block lg:hidden mt-[-32px]'}>
            <BookingSaving bookingPrices={priceData} averagePrice7Days={priceData ? null : avgPrice} />
          </div>

          <SpaceDetails {...data} />

          <div id={'location'}>
            <HotelLocation address={data.address} externalName={data?.externalName} userId={data?.userId} />
          </div>

          <HotelArrivalAndDeparture
            // checkInTimeStart={Number(data.defaultCheckInTime)}
            // checkOutTime={Number(data.defaultCheckOutTime)}
            defaultCheckInTime={data.defaultCheckInTime}
            defaultCheckOutTime={data.defaultCheckOutTime}
          />

          <div id={'amenities'}>
            {!isEmpty(data?.amenities) && <HotelAmenities amenities={data?.amenities || []} />}
          </div>

          {data.houseRules && <HotelRules houseRules={data.houseRules} />}

          <div id={'reviews'}>
            <PropertyReview pmsPropertyId={data?.pmsPropertyId} userId={data?.userId} />
          </div>
          <div id={'transactions'}>
            <BookTransaction propertyContract={propertyContractData?.propertyContract || ''} />
          </div>
          <div id={'policies'}>
            <HotelCancelPolicy
              cancelPolicy={data.cancelPolicy}
              cancelPolicies={data.cancelPolicies}
              propertyId={propertyId}
            />
          </div>

          <YourHost {...data.contact} hideBorderBot={moreProperties.length === 0} />

          <MoreProperties pmsPropertyId={pmsPropertyId} properties={moreProperties} contact={data.contact} />

          {/*<RecentActivity />*/}
        </div>

        <div className={'lg:w-4/12 lg:min-w-[4/12] relative'}>
          <PriceCard
            hostId={hostId}
            data={priceData}
            currency={data?.propertyPrice?.currency}
            propertyId={propertyId}
            pmsPropertyId={pmsPropertyId}
            minNights={data.minNights}
            maxNights={data.maxNights}
            maxPet={data.maxPet}
            personCapacity={data?.personCapacity}
            amenities={data.amenities}
            pmsType={data.pmsType}
            isActive={data.isActive}
            propertyStatus={data.status}
            avgPrice={avgPrice}
          />
        </div>
      </div>
    </>
  )
}

export default PropertyDetail
