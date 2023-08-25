import axios from 'axios'
import BookingComplete from './BookingComplete'
import BookingContactInformation from './BookingContactInformation'
import BookingHotelInfomation from './BookingHotelInfomation'
import BookingPaymentOption from './BookingPaymentOption'
import BookingTripInformation from './BookingTripInformation'
import {
  createBookingOrder,
  getDetailBooking,
  getPricesBooking,
  getPricesManualBooking,
  getStripeInfo,
  getTokenContract,
  stripePaymentBooking,
  updateManualBookingOrder,
} from '@dtravel/helpers/api/booking'
import {
  PAYMENT_METHOD,
  PROVIDER_NETWORKS,
  RESERVATION_STATUS,
  TYPE_PAYMENT,
} from '@dtravel/helpers/constants/constants'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import {
  BookingDataProps,
  BookingPricesProps,
  GuestInfoProps,
  ManualBookingDataProps,
  ManualPriceBookingProps,
  SettingUrlProps,
  StripeInfoProps,
  SuperhogInfoProps,
  TokenAddressProps,
} from '@dtravel/helpers/interfaces'
import { PropertyInfo } from '@dtravel/helpers/interfaces/property'
import { convertChainIdToNumber } from '@dtravel/helpers/utils/common'
import { handleBookCrypto, startApp } from '@dtravel/helpers/utils/ether'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setToast, setToastError, setLoadingPrice, setPromoCode } from '@dtravel/redux/slices/common'
import detectEthereumProvider from '@metamask/detect-provider'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BookingSaving from './BookingSaving'
import GoogleAndApplePay from '@dtravel/components/booking/GoogleAndApplePay'
import BookingAddOn from './BookingAddOn'
import BillingDetail from './BillingDetail'
import { convertSubPaymentMethod, isEmpty } from '@dtravel/utils/common'
import { getRateCurrency } from '@dtravel/helpers/api/property'
import { setRates } from '@dtravel/redux/slices/property'
import moment from 'moment'
import BookingTitle from './BookingTitle'

interface Props {
  propertyDetail: PropertyInfo | null
  settingUrl: SettingUrlProps | null
}

let cancelToken: any
let addons: Array<string> = []

const Booking: React.FC<Props> = (props) => {
  const { propertyDetail, settingUrl } = props
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { stripeComplete, selectedCurrency, accounts, chainId, cryptoPayment, typePayment, isLoadingPrice, promoCode } =
    useAppSelector((state) => state.common)
  const { userID } = useAppSelector((state) => state.property)
  const { check_in, check_out, hostId, propertyId, adults, children, infants, pets, reservationId } = router.query
  const hostID = userID || hostId
  const propertyID = propertyId
  const isManualReservation = Boolean(reservationId)
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const [stripeInfo, setStripeInfo] = useState<StripeInfoProps | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [firstLoading, setFirstLoading] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [bookingPrices, setBookingPrices] = useState<any>({})
  const [tokenAddress, setTokenAddress] = useState<TokenAddressProps[]>([])
  const [guestInfo, setGuestInfo] = useState<GuestInfoProps & SuperhogInfoProps>({})
  const [manualReservationData, setManualReservationData] = useState<any>(null)
  const [loadingAddons, setLoadingAddOns] = useState<number>(-1)
  const [reservationID, setReservationID] = useState<string>('')

  const isSuperhogEnabled = propertyDetail?.superhogStatus === 'kyg' || propertyDetail?.superhogStatus === 'kyg_damage'
  console.log('propertyDetail', propertyDetail)
  useEffect(() => {
    async function fetchRates() {
      try {
        const res: any = await getRateCurrency()
        if (res.data) dispatch(setRates(res.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchRates()
    return () => {
      addons = []
    } // eslint-disable-next-line
  }, []) // clear add-ons

  const showError = (errMessage: string) => {
    if (errMessage) dispatch(setToastError({ message: errMessage }))
  }
  const handleUpdateGuestInfo = (newGuestInfo: GuestInfoProps & SuperhogInfoProps) => {
    setGuestInfo((prevState) => ({ ...prevState, ...newGuestInfo }))
  }
  const goToBookingSummary = (reservationID: string) => {
    router.push({ pathname: `/booking-summary/${reservationID}` })
  }
  const handlePaymentStripe = async (reservationID: string, stripe: any, elements: any) => {
    try {
      const { data } = await stripePaymentBooking(reservationID)
      if (data.success) {
        if (data?.data?.paymentIntent?.status === 'succeeded') {
          // manual reservation 0đ
          goToBookingSummary(reservationID)
        } else {
          const cardElement = elements.getElement(CardElement)
          let result: any = null
          if (typePayment === TYPE_PAYMENT.CREDIT_CARD) {
            result = await stripe.confirmCardPayment(data.data.paymentIntent?.client_secret, {
              payment_method: { card: cardElement },
            })
          }
          if (result.error) {
            showError(
              result?.error?.payment_intent?.last_payment_error?.message ||
              result?.error?.message ||
              result?.data?.message
            )
          } else {
            goToBookingSummary(reservationID)
          }
          setLoading(false)
        }
      }
    } catch (error: any) {
      setLoading(false)
      dispatch(setToast({ show: true, message: error?.data?.message }))
    }
  }
  const handleSubmit = async (stripe: any, elements: any) => {
    const isCryptoPayment = typePayment === TYPE_PAYMENT.CRYPTO
    const finalPriceDTO: number = Number(
      bookingPrices?.finalPrice?.[isCryptoPayment ? cryptoPayment : selectedCurrency?.type === 'CRYPTO' ? 'USD' : selectedCurrency?.key || 'USD'] || 0
    )
    try {
      setLoading(true)
      let guestInfoDTO = {
        ...guestInfo,
        name: `${guestInfo.firstName} ${guestInfo.lastName}`
      }
      if (isSuperhogEnabled) {
        guestInfoDTO = { ...guestInfoDTO, dateOfBirth: moment(guestInfo.dateOfBirth, 'MM/DD/YYYY')?.format('YYYY-MM-DD') }
      }
      let manualDataDTO: ManualBookingDataProps = {
        guestInfo: guestInfoDTO,
        currency: isCryptoPayment
          ? cryptoPayment
          : selectedCurrency?.type === 'CRYPTO'
            ? 'USD'
            : selectedCurrency?.key || 'USD',
        paymentMethod: isCryptoPayment ? PAYMENT_METHOD.CRYPTO : PAYMENT_METHOD.FIAT,
        addons: bookingPrices?.priceDetail?.addons || [],
        subPaymentMethod: convertSubPaymentMethod(typePayment),
      }
      if (!isEmpty(promoCode)) manualDataDTO = { ...manualDataDTO, promoCode }
      let dataDTO: BookingDataProps = {
        ...manualDataDTO,
        checkinDate: check_in as string,
        checkoutDate: check_out as string,
        guestCount: Number(adults || 1) + Number(children || 0) + Number(infants || 0),
        adults: Number(adults || 1),
        children: Number(children || 0),
        infants: Number(infants || 0),
        pets: Number(pets || 0),
        listingId: Number(propertyID),
        finalPrice: finalPriceDTO,
      }
      if (isCryptoPayment) {
        const tokenContract = tokenAddress.find((v) => v.symbol === cryptoPayment)
        manualDataDTO = {
          ...manualDataDTO,
          guestWallet: accounts[0],
          chainId: convertChainIdToNumber(chainId),
          currencyAddress: tokenContract?.address || '',
        }
        dataDTO = { ...dataDTO, ...manualDataDTO }
      } else {
        dataDTO = { ...dataDTO, hostWallet: hostID as string }
      }
      let data: any = {}
      if (isManualReservation) {
        const res = await updateManualBookingOrder(reservationId as string, manualDataDTO)
        data = res?.data
      } else {
        const res = await createBookingOrder(dataDTO)
        data = res?.data
      }
      if (!isCryptoPayment && stripe) {
        if (
          typePayment === TYPE_PAYMENT.AFFIRM_PAY ||
          typePayment === TYPE_PAYMENT.AFTER_PAY ||
          typePayment === TYPE_PAYMENT.KLARNA_PAY
        ) {
          setReservationID(data?.data?.reservationId)
          const billingEl = document.getElementById('billing-detail')
          if (billingEl) billingEl.click()
        } else handlePaymentStripe(data?.data?.reservationId, stripe, elements)
      }
      if (isCryptoPayment) {
        const tokenContract = tokenAddress.find((v) => v.symbol === cryptoPayment)
        if (finalPriceDTO > 0) handleBookCrypto(data?.data, tokenContract?.address || '', setLoading, goToBookingSummary)
        else goToBookingSummary(data?.data?.reservationId)
      }
    } catch (error: any) {
      setLoading(false)
      showError(
        error ? error?.data?.error?.message : 'Please wait while we’re processing your payment of another transaction.'
      )
    }
  }
  const fetchStripeInfo = async () => {
    if (hostID) {
      try {
        setFirstLoading(true)
        const { data } = await getStripeInfo(hostID)
        if (data.success) setStripeInfo(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setFirstLoading(false)
      }
    }
  }
  const checkConnectMetamask = async () => {
    const provider = await detectEthereumProvider()
    if (provider) startApp(provider)
  }
  useEffect(() => {
    fetchStripeInfo()
    checkConnectMetamask()
    // eslint-disable-next-line
  }, [hostID])
  const getCurrency = () => {
    if (cryptoPayment) return cryptoPayment
    if (typePayment === TYPE_PAYMENT.CRYPTO) return 'USDT'
    return selectedCurrency?.type === 'CRYPTO' ? 'USD' : selectedCurrency?.key || 'USD'
  }

  const fetchPricesBooking = async () => {
    if (check_in && check_out) {
      try {
        dispatch(setLoadingPrice(true))
        if (typeof cancelToken != typeof undefined) cancelToken.cancel('request canceled')
        cancelToken = axios.CancelToken.source()
        let dataDTO: BookingPricesProps = {
          checkinDate: check_in as string,
          checkoutDate: check_out as string,
          adults: Number(adults || 1),
          children: Number(children || 0),
          infants: Number(infants || 0),
          pets: Number(pets || 0),
          listingId: Number(propertyID),
          currency: getCurrency(),
        }
        if (!isEmpty(promoCode)) dataDTO = { ...dataDTO, promoCode }
        const { data } = await getPricesBooking(
          dataDTO,
          { cancelToken: cancelToken.token }
        )
        if (data.success) setBookingPrices(data.data)
      } catch (error: any) {
        if (error?.message !== 'request canceled' && error) {
          if (error?.status === 429) {
            showError("We've detected unusual activity on your account. For security, the checkout process is temporarily unavailable. Please try again after few minutes or contact us for assistance.")
          }
          else {
            showError(error?.data?.error?.response?.message || error?.data?.error?.message)
          }
          if (!isEmpty(promoCode)) dispatch(setPromoCode(''))
        }
      } finally {
        dispatch(setLoadingPrice(false))
      }
    } else {
      showError(`The minimum night requirement is ${propertyDetail?.minNights} night${Number(propertyDetail?.minNights || 0) > 1 ? 's' : ''}.`
      )
    }
  }
  useEffect(() => {
    if (!reservationId) fetchPricesBooking()
    // eslint-disable-next-line
  }, [check_in, check_out, propertyID, adults, children, infants, pets, cryptoPayment, selectedCurrency, typePayment, promoCode])

  const fetchTokenContract = async () => {
    const networkItem = PROVIDER_NETWORKS.find((v) => v.hex === chainId)
    if (networkItem) {
      try {
        const res: any = await getTokenContract(networkItem?.decimal)
        if (res?.success) setTokenAddress(res?.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    fetchTokenContract()
    // eslint-disable-next-line
  }, [chainId])

  const fetchPricesManualBooking = async (addOns?: Array<string>, idx?: number) => {
    if (addOns !== undefined) {
      addons = [...addOns]
      if (idx) setLoadingAddOns(idx)
    }
    if (reservationId) {
      try {
        dispatch(setLoadingPrice(true))
        const currency = getCurrency()
        if (typeof cancelToken != typeof undefined) cancelToken.cancel('request canceled')
        cancelToken = axios.CancelToken.source()
        let dataDTO: ManualPriceBookingProps = { currency, addons }
        // if (!isEmpty(promoCode)) dataDTO = { ...dataDTO, promoCode }
        const { data } = await getPricesManualBooking(
          reservationId as string,
          dataDTO,
          { cancelToken: cancelToken.token }
        )
        if (data.success) setBookingPrices(data.data)
      } catch (error: any) {
        if (error?.message !== 'request canceled' && error)
          showError(error?.data?.error?.response?.message || error?.data?.error?.message)
      } finally {
        dispatch(setLoadingPrice(false))
        setLoadingAddOns(-1)
      }
    }
  }
  useEffect(() => {
    if (reservationId) fetchPricesManualBooking()
    // eslint-disable-next-line
  }, [cryptoPayment, selectedCurrency, typePayment])
  const fetchManualReservation = async () => {
    if (reservationId) {
      try {
        const res: any = await getDetailBooking(reservationId as string)
        if (res?.data?.success) setManualReservationData(res?.data?.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
  useEffect(() => {
    if (reservationId) {
      fetchManualReservation()
      fetchPricesManualBooking()
    }
    // eslint-disable-next-line
  }, [reservationId])

  const isExpiredOrCancelledManualReservation =
    isManualReservation &&
    (manualReservationData?.status === RESERVATION_STATUS.EXPIRED ||
      manualReservationData?.status === RESERVATION_STATUS.MANUAL_CANCELLED)
  const renderInformation = () => {
    return (
      <>
        <BookingTripInformation
          propertyDetail={propertyDetail}
          bookingPrices={bookingPrices}
          loading={loading}
          isManualReservation={isManualReservation}
          manualReservationData={manualReservationData}
          fetchManualReservation={fetchManualReservation}
        />
        <BookingAddOn
          isManualReservation={isManualReservation}
          manualReservationData={manualReservationData}
          bookingPrices={bookingPrices}
          loadingAddons={loadingAddons}
          fetchPricesManualBooking={fetchPricesManualBooking}
        />
      </>
    )
  }
  if (firstLoading) {
    return <></>
  }
  const disableManualAndAvail =
    (!bookingPrices?.isAvail && !(isManualReservation && manualReservationData?.isBlockCalendar)) ||
    manualReservationData?.status === RESERVATION_STATUS.EXPIRED ||
    manualReservationData?.status === RESERVATION_STATUS.MANUAL_CANCELLED ||
    manualReservationData?.status === RESERVATION_STATUS.DRAFT
  const isPaymentAffirmPay = typePayment === TYPE_PAYMENT.AFFIRM_PAY
  const isPaymentAfterPay = typePayment === TYPE_PAYMENT.AFTER_PAY
  const finalPriceCurrency = Number(bookingPrices?.finalPrice?.[selectedCurrency?.key])
  const minPay: number = isPaymentAffirmPay ? 50 : 1
  const maxPay: number = isPaymentAffirmPay
    ? 30000
    : selectedCurrency?.key === 'GBP' || selectedCurrency?.key === 'EUR'
      ? 1000
      : 2000
  const isBNPLDisabled =
    (isPaymentAffirmPay || isPaymentAfterPay) && (finalPriceCurrency < minPay || finalPriceCurrency > maxPay)
  const wrongNetwork = chainId !== process.env.NEXT_PUBLIC_SUPPORT_BSC_CHAIN_ID && chainId !== process.env.NEXT_PUBLIC_SUPPORT_ETH_CHAIN_ID
  return (
    <>
      <Elements
        stripe={loadStripe(stripeInfo?.stripePublishableKey || '', {
          locale: 'en',
          stripeAccount: stripeInfo?.stripeAccount,
        })}
      >
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <div className="pt-[24px] pb-0 md:pb-12 flex items-start flex-col md:flex-row">
              {/*---Left side---*/}
              <div className="flex flex-col w-full md:w-7/12 md:px-0 md:pr-[48px]">
                <BookingTitle manualReservationData={manualReservationData} />
                {isMobile ? (
                  <BookingHotelInfomation
                    propertyDetail={propertyDetail}
                    bookingPrices={bookingPrices}
                    settingUrl={settingUrl}
                    isReservationDraft={manualReservationData?.status === RESERVATION_STATUS.DRAFT}
                  >
                    {renderInformation()}
                  </BookingHotelInfomation>
                ) : (
                  <>{renderInformation()}</>
                )}

                <BookingPaymentOption
                  bookingPrices={bookingPrices}
                  propertyDetail={propertyDetail}
                  stripeInfo={stripeInfo}
                  isReservationDraft={manualReservationData?.status === RESERVATION_STATUS.DRAFT}
                />

                {!isExpiredOrCancelledManualReservation && (
                  <>
                    {manualReservationData?.status !== RESERVATION_STATUS.DRAFT && (
                      <>
                        {/* {typePayment !== TYPE_PAYMENT.APPLE_PAY && typePayment !== TYPE_PAYMENT.GOOGLE_PAY && ( */}
                        <BookingContactInformation
                          handleUpdateGuestInfo={handleUpdateGuestInfo}
                          setDisabled={setDisabled}
                          loading={loading}
                          guestInfo={guestInfo}
                          superhogStatus={propertyDetail?.superhogStatus}
                        />
                        {/* )} */}
                      </>
                    )}
                    <div className="px-4 md:px-0">
                      <p className="mb-[12px] text-grayscale-900 font-inter-500 text-20-24">Complete booking</p>
                      <p className="mb-[24px] md:mb-[48px] text-grayscale-600 font-inter-400 text-16-20">
                        By completing this booking, you agree to the&nbsp;
                        <a className="underline" href={'/terms-and-conditions'} target={'_blank'} rel="noreferrer">
                          Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a className="underline" href={'/privacy-policy'} target={'_blank'} rel="noreferrer">
                          Privacy Policy
                        </a>
                        .
                      </p>

                      {typePayment === TYPE_PAYMENT.APPLE_PAY || typePayment === TYPE_PAYMENT.GOOGLE_PAY ? (
                        <GoogleAndApplePay
                          stripeInfo={stripeInfo}
                          bookingPrices={bookingPrices}
                          goToBookingSummary={goToBookingSummary}
                          dateOfBirth={guestInfo.dateOfBirth ? moment(guestInfo.dateOfBirth, 'MM/DD/YYYY')?.format('YYYY-MM-DD') : ''}
                          disabled={disabled || disableManualAndAvail}
                          superhogStatus={propertyDetail?.superhogStatus}
                        />
                      ) : (
                        <div className="flex w-full md:w-auto">
                          <BookingComplete
                            handleSubmit={() => handleSubmit(stripe, elements)}
                            loading={loading}
                            isLoadingPrice={isLoadingPrice}
                            disabled={
                              disabled ||
                              (typePayment === TYPE_PAYMENT.CREDIT_CARD && !stripeComplete) ||
                              (typePayment === TYPE_PAYMENT.CRYPTO && (!cryptoPayment || wrongNetwork)) ||
                              isBNPLDisabled ||
                              disableManualAndAvail ||
                              isEmpty(typePayment)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/*---Right side---*/}
              <div className="hidden md:flex md:flex-col w-full md:w-5/12 sticky top-[96px]">
                <div className="bg-white px-[32px] py-[24px] rounded-[24px] border-[0.5px] border-[#00000026]">
                  <BookingHotelInfomation
                    propertyDetail={propertyDetail}
                    bookingPrices={bookingPrices}
                    settingUrl={settingUrl}
                    isReservationDraft={manualReservationData?.status === RESERVATION_STATUS.DRAFT}
                  />
                </div>
                <BookingSaving bookingPrices={bookingPrices} propertyDetail={propertyDetail} />
              </div>
            </div>
          )}
        </ElementsConsumer>
      </Elements>
      <BillingDetail
        stripeInfo={stripeInfo}
        email={guestInfo?.email || ''}
        reservationID={reservationID}
        handleClose={() => {
          setLoading(false)
        }}
      />
    </>
  )
}

export default Booking
