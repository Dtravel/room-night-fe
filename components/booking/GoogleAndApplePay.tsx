import React, { useEffect, useState } from 'react'
import { PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js'
import { PriceReservation } from '@dtravel/helpers/interfaces/property'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { PAYMENT_METHOD, TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'
import { BookingDataProps, GuestInfoProps, ManualBookingDataProps, SuperhogInfoProps } from '@dtravel/helpers/interfaces'
import { useRouter } from 'next/router'
import { createBookingOrder, stripePaymentBooking, updateManualBookingOrder } from '@dtravel/helpers/api/booking'
import { setToast } from '@dtravel/redux/slices/common'
import CircularProgress from '@mui/material/CircularProgress'
import { convertSubPaymentMethod, isEmpty } from '@dtravel/utils/common'
import { countries } from '@dtravel/helpers/constants/country'
import { getCountryCallingCode } from 'react-phone-number-input'
import { CountryCode } from 'libphonenumber-js/types'

interface Props {
  stripeInfo: any
  bookingPrices: PriceReservation
  disabled: boolean
  dateOfBirth?: string
  superhogStatus?: string
  // eslint-disable-next-line no-unused-vars
  goToBookingSummary: (reservationId: string) => void
}

const GoogleAndApplePay: React.FC<Props> = ({ bookingPrices, stripeInfo, disabled, dateOfBirth, superhogStatus, goToBookingSummary }) => {
  const isSuperhogEnabled = superhogStatus === 'kyg' || superhogStatus === 'kyg_damage'
  // const paymentRequest = useRef<any>(null)
  const router = useRouter()
  const { reservationId } = router.query
  const isManualReservation = Boolean(reservationId)
  const dispatch = useAppDispatch()
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { selectedCurrency, typePayment, promoCode } = useAppSelector((state) => state.common)

  const getCurrency = (_selectedCurrency: any) => {
    return _selectedCurrency?.type === 'FIAT' ? _selectedCurrency?.key || 'USD' : 'USD'
  }

  const getAmount = (_bookingPrices: PriceReservation, _currency: string) => {
    const amountStr = _bookingPrices.finalPrice[_currency]
    let amount = Number(amountStr).toFixed(0)
    if (!['VND', 'KRW'].includes(_currency.toUpperCase())) {
      amount = (Number(amountStr) * 100).toFixed(0)
    }
    return Number(amount) || 0
  }

  const createReservation = async (
    _query: any,
    _bookingPrices: PriceReservation,
    _guestInfo: GuestInfoProps & SuperhogInfoProps,
    _selectedCurrency: any
  ) => {
    const { check_in, check_out, propertyId, adults, children, infants, pets } = _query
    let manualDataDTO: ManualBookingDataProps = {
      guestInfo: { ..._guestInfo },
      currency: getCurrency(_selectedCurrency),
      paymentMethod: PAYMENT_METHOD.FIAT,
      addons: bookingPrices?.priceDetail?.addons || [],
      subPaymentMethod: convertSubPaymentMethod(typePayment),
    }
    if (!isEmpty(promoCode)) manualDataDTO = { ...manualDataDTO, promoCode }
    let bodyData: BookingDataProps = {
      ...manualDataDTO,
      checkinDate: check_in as string,
      checkoutDate: check_out as string,
      guestCount: Number(adults || 1) + Number(children || 0) + Number(infants || 0),
      adults: Number(adults || 1),
      children: Number(children || 0),
      infants: Number(infants || 0),
      pets: Number(pets || 0),
      listingId: Number(propertyId),
      finalPrice: Number(
        _bookingPrices?.finalPrice?.[_selectedCurrency?.type === 'CRYPTO' ? 'USD' : _selectedCurrency.key || 'USD'] || 0
      ),
    }
    // const { data } = await createBookingOrder(bodyData)
    let data: any = {}
    if (isManualReservation) {
      const res = await updateManualBookingOrder(reservationId as string, manualDataDTO)
      data = res?.data
    } else {
      const res = await createBookingOrder(bodyData)
      data = res?.data
    }
    return data.data.reservationId
  }

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: { label: 'Total', amount: 0 },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      })
      console.log('pr', pr)
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr)
        }
      })
    }
  }, [stripe])

  useEffect(() => {
    if (stripe && paymentRequest) {
      let doB = dateOfBirth
      if (paymentRequest.hasRegisteredListener('paymentmethod')) {
        paymentRequest.off('paymentmethod')
      }
      paymentRequest.on('paymentmethod', async (ev: any) => {
        console.log('--------on paymentmethod------------', ev)
        setIsLoading(true)
        try {
          const payerName: Array<string> = ev.payerName?.split(' ') || []
          let guestInfoPay: GuestInfoProps & SuperhogInfoProps = {
            name: ev.payerName,
            firstName: payerName[0],
            lastName: payerName[payerName.length - 1],
            phone: ev?.payerPhone,
            email: ev?.payerEmail,
          }
          if (isSuperhogEnabled) {
            if (!isEmpty(doB)) guestInfoPay = { ...guestInfoPay, dateOfBirth: doB }
            if (ev?.paymentMethod?.billing_details?.address) {
              const billingAddress = ev?.paymentMethod?.billing_details?.address
              const countryCode = billingAddress?.country
              const countrySelected = countries.find(v => v.iso === countryCode)
              guestInfoPay = {
                ...guestInfoPay,
                telephoneType: 1,
                telephoneCode: countryCode ? `+${getCountryCallingCode(countryCode as CountryCode)}` : '',
                address: {
                  addressLine1: billingAddress?.line1,
                  town: billingAddress?.city,
                  county: countrySelected?.name,
                  countryIso: countryCode,
                  postcode: billingAddress?.postal_code
                }
              }
            }
          }
          console.log('dateOfBirth', dateOfBirth, guestInfoPay, doB)
          const reservationId = await createReservation(router.query, bookingPrices, guestInfoPay, selectedCurrency)
          const resStripe = await stripePaymentBooking(reservationId)
          const clientSecret = resStripe.data.data.paymentIntent?.client_secret
          const { paymentIntent, error: confirmError }: any = await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          )
          if (confirmError) {
            ev.complete('fail')
          } else {
            ev.complete('success')
            if (paymentIntent.status === 'requires_action') {
              const { error } = await stripe.confirmCardPayment(clientSecret)
              if (!error) {
                goToBookingSummary(reservationId)
              }
            } else {
              goToBookingSummary(reservationId)
            }
          }
        } catch (error: any) {
          dispatch(
            setToast({
              show: true,
              message:
                error && (error?.data?.message || error?.data?.error?.message)
                  ? error?.data?.message || error?.data?.error?.message
                  : 'Please wait while we’re processing your payment of another transaction.',
            })
          )
          ev.complete('fail')
          throw error
        } finally {
          setIsLoading(false)
        }
      })
    }
    // eslint-disable-next-line
  }, [stripe, paymentRequest, bookingPrices, selectedCurrency?.key, router.query, dateOfBirth, isSuperhogEnabled])

  const hanldeClickPaymentRequestButton = async (event: any) => {
    event.preventDefault()
    if (!paymentRequest.isShowing()) {
      const currency = getCurrency(selectedCurrency)
      paymentRequest.update({
        country: stripeInfo && stripeInfo.country ? stripeInfo.country.toUpperCase() : 'US',
        currency: currency.toLowerCase(),
        total: {
          label: 'Total',
          amount: getAmount(bookingPrices, currency),
        },
      })
    }
    paymentRequest.show()
  }

  if (paymentRequest && (typePayment === TYPE_PAYMENT.APPLE_PAY || typePayment === TYPE_PAYMENT.GOOGLE_PAY)) {
    return (
      <div className="">
        <div
          className={`relative w-full md:w-[120px] apple-goole-pay-custom ${isLoading || disabled ? 'opacity-50' : ''}`}
        >
          <PaymentRequestButtonElement
            options={{
              paymentRequest: paymentRequest,
              style: { paymentRequestButton: { type: 'default', height: '64px' } },
            }}
            onClick={hanldeClickPaymentRequestButton}
          />
          {(isLoading || disabled) && (
            <div
              className={
                'absolute w-full h-[64px] z-50 bg-none top-0 right-0 cursor-not-allowed flex items-center justify-end px-[16px]'
              }
            >
              {isLoading && <CircularProgress size={20} style={{ color: '#0F0F0E' }} />}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Use a traditional checkout form.
  return <></>
}

export default GoogleAndApplePay
