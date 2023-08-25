import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { useStripe } from '@stripe/react-stripe-js'
import StripeBooking from '@dtravel/components/stripeBooking/StripeBooking'
import { useAppSelector, useAppDispatch } from '@dtravel/redux/hooks'
import BookingCrypto from './BookingCrypto'
import { GoogleApplePayEnableProps, PriceReservation, PropertyInfo } from '@dtravel/helpers/interfaces/property'
import ConnectWallet from '@dtravel/components/connectWallet/ConnectWallet'
import { setCryptoPayment, setTypePayment } from '@dtravel/redux/slices/common'
import { isEmpty } from '@dtravel/utils/common'
import credit_card_payment from '@dtravel/assets/icons/credit_card_payment.svg'
import ic_apple_pay from '@dtravel/assets/icons/ic_apple_pay.svg'
import ic_google_pay from '@dtravel/assets/icons/ic_google_pay.svg'
import ic_affirm from '@dtravel/assets/icons/ic_affirm.svg'
import ic_afterPay from '@dtravel/assets/icons/ic_afterPay.svg'
import ic_klarna from '@dtravel/assets/icons/ic_klarna.svg'
import DtravelPrice from '../common/DtravelPrice'
import { TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'
import { StripeInfoProps, TypePayment } from '@dtravel/helpers/interfaces'

interface Props {
  paymentMethods: Array<any>
  bookingPrices: PriceReservation
  propertyDetail: PropertyInfo | null
  stripeInfo: StripeInfoProps | null
  isReservationDraft?: boolean // used for case preview in host
}

const BookingCollapse: React.FC<Props> = ({
  paymentMethods,
  bookingPrices,
  propertyDetail,
  stripeInfo,
  isReservationDraft,
}) => {
  const { accounts, typePayment, selectedCurrency } = useAppSelector((state) => state.common)
  const stripe = useStripe()
  const dispatch = useAppDispatch()
  const [paymentRequest, setPaymentRequest] = useState<GoogleApplePayEnableProps>({})
  const [firstCheckPayment, setFirstCheckPayment] = useState<any>({ affirm: false, after: false, klarna: false })

  const isStripePayment = paymentMethods.find((v) => v.type === 'STRIPE')
  const paymentMethodCrypto: Array<any> = paymentMethods.filter((v) => v.type === 'CRYPTO')
  const isWalletConnected = accounts && accounts.length > 0
  const isPaymentCrypto = typePayment === TYPE_PAYMENT.CRYPTO
  const isPaymentCreditCard = typePayment === TYPE_PAYMENT.CREDIT_CARD
  const isPaymentApplePay = typePayment === TYPE_PAYMENT.APPLE_PAY
  const isPaymentGooglePay = typePayment === TYPE_PAYMENT.GOOGLE_PAY
  const isPaymentAffirmPay = typePayment === TYPE_PAYMENT.AFFIRM_PAY
  const isPaymentAfterPay = typePayment === TYPE_PAYMENT.AFTER_PAY
  const isPaymentKlarnaPay = typePayment === TYPE_PAYMENT.KLARNA_PAY
  const affirmPayCurrencyEnable = Boolean(
    (stripeInfo?.capabilities?.affirm_payments || []).find((v: any) => v?.currency?.includes(selectedCurrency?.key))
  )
  const afterPayCurrencyEnable = Boolean(
    (stripeInfo?.capabilities?.afterpay_clearpay_payments || []).find((v: any) =>
      v?.currency?.includes(selectedCurrency?.key)
    )
  )
  const klarnaPayCurrencyEnable = Boolean(
    (stripeInfo?.capabilities?.klarna_payments || []).find((v: any) => v?.currency?.includes(selectedCurrency?.key))
  )

  useEffect(() => {
    const hasPaymentCrypto = paymentMethods.some((item) => item.type === 'CRYPTO')
    if (hasPaymentCrypto && propertyDetail?.cryptoPaymentEnabled) dispatch(setTypePayment(TYPE_PAYMENT.CRYPTO))
    // else if (isStripePayment && propertyDetail?.fiatPaymentEnabled) dispatch(setTypePayment(TYPE_PAYMENT.CREDIT_CARD))
    else dispatch(setTypePayment(''))
    // eslint-disable-next-line
  }, [paymentMethods])

  useEffect(() => {
    if (selectedCurrency?.key) {
      let result: any = { ...firstCheckPayment }
      if (!result.affirm && affirmPayCurrencyEnable) result = { ...result, affirm: affirmPayCurrencyEnable }
      if (!result.after && afterPayCurrencyEnable) result = { ...result, after: afterPayCurrencyEnable }
      if (!result.klarna && klarnaPayCurrencyEnable) result = { ...result, klarna: klarnaPayCurrencyEnable }
      setFirstCheckPayment(result)
      if (
        (!affirmPayCurrencyEnable && isPaymentAffirmPay) ||
        (!afterPayCurrencyEnable && isPaymentAfterPay) ||
        (!klarnaPayCurrencyEnable && isPaymentKlarnaPay)
      ) {
        if (propertyDetail?.cryptoPaymentEnabled) dispatch(setTypePayment(TYPE_PAYMENT.CRYPTO))
        else dispatch(setTypePayment(''))
      }
    }
    // eslint-disable-next-line
  }, [selectedCurrency?.key])

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
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) setPaymentRequest(result)
      })
    }
  }, [stripe])
  const renderImageIcon = (icon: any) => {
    return (
      <span className="flex items-center">
        <Image src={icon} alt="" width={24} height={24} />
      </span>
    )
  }

  const renderRadio = (typeCard: TypePayment) => {
    const isChecked = typePayment === typeCard
    return (
      <div
        className={`w-[24px] h-[24px] rounded-[50%] cursor-pointer ${isChecked ? 'border-[8px] border-neutral-900' : 'border-[2px] border-neutral-400'
          }`}
      />
    )
  }
  const renderWarningLimit = (msg: string) => {
    return (
      <div className="bg-sun-50 p-6 rounded-[16px] mt-6">
        <span className="text-14-18 text-sun-700 font-inter-500">{msg}</span>
      </div>
    )
  }
  const renderCreditCardFees = (inText?: string) => {
    return (
      <>
        +&nbsp;
        <DtravelPrice price={Number(bookingPrices?.platformFee?.[currencyDisplay] || 0)} currency={currencyDisplay} />
        &nbsp;{inText || 'in fees'}
      </>
    )
  }
  // const isWrongNetwork = chainId !== process.env.NEXT_PUBLIC_SUPPORT_BSC_CHAIN_ID
  const currencyDisplay = selectedCurrency?.key || 'USD'
  const showPayment = propertyDetail?.fiatPaymentEnabled || isReservationDraft
  const finalPriceCurrency = Number(bookingPrices?.finalPrice?.[currencyDisplay])

  const paymentShowData: Array<any> = [
    // fiat payment
    {
      type: TYPE_PAYMENT.CREDIT_CARD,
      icon: <Image src={credit_card_payment} alt="" width={173} height={20} />,
      isShow: isStripePayment && propertyDetail?.fiatPaymentEnabled,
      isActived: isPaymentCreditCard,
      title: 'Credit/Debit card',
      subTitle: renderCreditCardFees('in credit/debit card fees'),
    },
    // crypto payment
    {
      type: TYPE_PAYMENT.CRYPTO,
      icon: (
        <div className="flex items-center gap-[8px]">
          {(paymentMethodCrypto || []).map((el: any) => (
            <React.Fragment key={el.key}>{renderImageIcon(el.icon)}</React.Fragment>
          ))}
        </div>
      ),
      isShow: !isEmpty(paymentMethodCrypto) && propertyDetail?.cryptoPaymentEnabled,
      isActived: isPaymentCrypto,
      title: 'Crypto',
      subTitle: 'No fees',
    },
    // apple pay
    {
      type: TYPE_PAYMENT.APPLE_PAY,
      icon: <Image src={ic_apple_pay} alt="" width={20} height={20} />,
      isShow: paymentRequest?.applePay,
      isActived: isPaymentApplePay,
      title: 'Apple Pay',
      subTitle: renderCreditCardFees(),
    },
    // google pay
    {
      type: TYPE_PAYMENT.GOOGLE_PAY,
      icon: <Image src={ic_google_pay} alt="" width={20} height={20} />,
      isShow: paymentRequest?.googlePay,
      isActived: isPaymentGooglePay,
      title: 'Google Pay',
      subTitle: renderCreditCardFees(),
    },
    // affirm pay
    {
      type: TYPE_PAYMENT.AFFIRM_PAY,
      icon: <Image src={ic_affirm} alt="" width={20} height={20} />,
      isShow: firstCheckPayment.affirm,
      isCurrencyDisabled: !affirmPayCurrencyEnable,
      isMinDisabled: affirmPayCurrencyEnable && finalPriceCurrency < 50,
      isMaxDisabled: affirmPayCurrencyEnable && finalPriceCurrency > 30000,
      isActived: isPaymentAffirmPay,
      title: 'Affirm',
      subTitle: 'As Low As 0% APR',
    },
    // after pay
    {
      type: TYPE_PAYMENT.AFTER_PAY,
      icon: <Image src={ic_afterPay} alt="" width={20} height={20} />,
      isShow: firstCheckPayment.after,
      isCurrencyDisabled: !afterPayCurrencyEnable,
      isMinDisabled: afterPayCurrencyEnable && finalPriceCurrency < 1,
      isMaxDisabled:
        afterPayCurrencyEnable &&
        finalPriceCurrency > (selectedCurrency?.key === 'GBP' || selectedCurrency?.key === 'EUR' ? 1000 : 2000),
      isActived: isPaymentAfterPay,
      title: 'Afterpay/Clearpay',
      subTitle: '0% interest up to 6 months',
    },
    // klarna pay
    {
      type: TYPE_PAYMENT.KLARNA_PAY,
      icon: <Image src={ic_klarna} alt="" width={20} height={20} />,
      isShow: firstCheckPayment.klarna,
      isCurrencyDisabled: !klarnaPayCurrencyEnable,
      isActived: isPaymentKlarnaPay,
      title: 'Klarna',
      subTitle: 'No interest',
    },
  ]
  const paymentShowDisabledMin = paymentShowData.filter((it: any) => it.isMinDisabled && it.isShow)
  const paymentShowDisabledMax = paymentShowData.filter((it: any) => it.isMaxDisabled && it.isShow)
  const paymentShowDisabledCurrency = paymentShowData.filter((it: any) => it.isCurrencyDisabled && it.isShow)

  return (
    <>
      {/* payment */}
      {showPayment && (
        <>
          <div className="w-full flex flex-col lg:flex-row gap-[16px] flex-wrap">
            {paymentShowData.map((el: any) => {
              if (!el.isShow) return null
              const disabled = el?.isCurrencyDisabled || el?.isMinDisabled || el?.isMaxDisabled
              return (
                <div
                  key={el.type}
                  className={`w-full lg:w-[calc(50%_-_8px)] rounded-2xl p-[24px] flex justify-between items-center 
                  ${el?.isActived ? 'border-grayscale-900 border-[2px]' : 'border-[0.5px] border-[#00000026]'}
                  ${disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'opacity-[1] cursor-pointer hover:border-grayscale-900 hover:border-[2px]'
                    }
                `}
                  onClick={() => {
                    if (disabled) return
                    dispatch(setTypePayment(el?.type))
                    if (el?.type !== TYPE_PAYMENT.CRYPTO) dispatch(setCryptoPayment(''))
                  }}
                >
                  <div>
                    {el?.icon}
                    <p className="text-grayscale-900 font-inter-500 text-16-20 mb-[4px] mt-[12px]">{el?.title}</p>
                    <p className="text-grayscale-600 font-inter-400 text-14-18">{el?.subTitle}</p>
                  </div>
                  {renderRadio(el?.type)}
                </div>
              )
            })}
          </div>
          {!isEmpty(paymentShowDisabledMin) &&
            paymentShowDisabledMin.map((v: any, i: number) => {
              const minPay: number = v?.type === TYPE_PAYMENT.AFFIRM_PAY ? 50 : 1
              return (
                <Fragment key={i}>
                  {renderWarningLimit(`${v?.title} payments require a minimum of ${minPay} ${currencyDisplay}.`)}
                </Fragment>
              )
            })}
          {!isEmpty(paymentShowDisabledMax) &&
            paymentShowDisabledMax.map((v: any, i: number) => {
              const maxPay: number =
                v?.type === TYPE_PAYMENT.AFFIRM_PAY
                  ? 30000
                  : currencyDisplay === 'GBP' || currencyDisplay === 'EUR'
                    ? 1000
                    : 2000
              return (
                <Fragment key={i}>
                  {renderWarningLimit(`${v?.title} does not support payments over ${maxPay} ${currencyDisplay}.`)}
                </Fragment>
              )
            })}
          {!isEmpty(paymentShowDisabledCurrency) && (
            <>
              {renderWarningLimit(
                `This listing does not support payment in ${selectedCurrency?.key} through ${paymentShowDisabledCurrency
                  .map((v: any) => v.title)
                  .join(', ')}.`
              )}
            </>
          )}
        </>
      )}

      {/* pay with */}
      {!isReservationDraft && (
        <>
          {(isPaymentCrypto || isPaymentCreditCard) && (
            <>
              <div
                className={`${showPayment
                  ? 'border-t-[12px] md:border-t-[0.5px] border-t-neutral-100 md:border-[#00000026] pt-[24px] md:pt-[48px] mt-[48px]'
                  : ''
                  } mx-[-16px] md:mx-0 px-[16px] md:px-0`}
              >
                <div className="flex justify-between items-center font-inter-500">
                  <span className="text-grayscale-900 text-20-24">
                    Pay with {isPaymentCrypto ? 'crypto' : 'Credit/Debit card'}
                  </span>
                  {isPaymentCrypto && !isWalletConnected && (
                    <div
                      className={`text-14-18 underline flex items-center cursor-pointer text-grayscale-600`}
                      onClick={() => {
                        if (window) window?.open('https://metamask.io/download/', '_blank')
                      }}
                    >
                      {'I don’t have a wallet'}
                    </div>
                  )}
                  {isPaymentCreditCard && <Image src={credit_card_payment} alt="" width={173} height={20} />}
                </div>
                {isPaymentCreditCard && <StripeBooking />}
                {isPaymentCrypto && propertyDetail?.cryptoPaymentEnabled && (
                  <>
                    {isWalletConnected ? (
                      <BookingCrypto paymentMethods={paymentMethods} bookingPrices={bookingPrices} propertyDetail={propertyDetail} />
                    ) : (
                      <>
                        <div className="flex items-start mt-[16px]">
                          <ConnectWallet type="booking" />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
export default BookingCollapse
