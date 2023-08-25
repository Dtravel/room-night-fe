import BasePriceDetail from '@dtravel/components/common/BasePriceDetail'
import DtravelPrice from '@dtravel/components/common/DtravelPrice'
import TooltipClick from '@dtravel/components/common/TooltipClick'
import { PAYMENT_METHOD, TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'
import { Fee } from '@dtravel/helpers/interfaces'
import { PriceReservation } from '@dtravel/helpers/interfaces/property'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { isEmpty } from '@dtravel/utils/common'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import BaseTaxesAndFeesDetail from './BaseTaxesAndFeesDetail'
import Image from 'next/image'
import ic_promotion from '@dtravel/assets/icons/ic_promotion.svg'
import ic_close_md from '@dtravel/assets/icons/ic_close_md.svg'
import BasicButton from '../ui/BasicButton'
import { setPromoCode } from '@dtravel/redux/slices/common'

interface Props {
  data: PriceReservation
  nights: number
  hasBorder?: boolean
  title?: string | React.ReactNode
  notes?: string | React.ReactNode
  propertyDetail?: any
  isReservationDraft?: boolean
}

const PriceBreakDown: React.FC<Props> = ({
  data,
  nights,
  hasBorder,
  title,
  notes,
  propertyDetail = {},
  isReservationDraft,
}) => {
  const { cryptoPayment, typePayment, isLoadingPrice, selectedCurrency, promoCode } = useAppSelector((state) => state.common)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { reservationId } = router.query // manual reservation
  const isBookingPage = router.pathname.includes('/booking/') || router.pathname.includes('/book/')
  const isSummaryPage = router.pathname.includes('/booking-summary/')
  const isDetailPropertyPage = router.pathname.includes('/property/')
  const isCryptoPayment =
    (isBookingPage && typePayment === TYPE_PAYMENT.CRYPTO) ||
    (isSummaryPage && propertyDetail?.paymentMethod === PAYMENT_METHOD.CRYPTO)
  const isCrypto =
    (isBookingPage && typePayment === TYPE_PAYMENT.CRYPTO && !isEmpty(cryptoPayment)) ||
    (isSummaryPage && propertyDetail?.paymentMethod === PAYMENT_METHOD.CRYPTO) ||
    (isDetailPropertyPage && selectedCurrency.type === 'CRYPTO')
  let currencyPayment = isDetailPropertyPage
    ? selectedCurrency?.key || 'USD'
    : isCrypto
      ? cryptoPayment || propertyDetail?.currency || 'USD'
      : isSummaryPage
        ? propertyDetail?.currency || selectedCurrency?.key || 'USD'
        : selectedCurrency?.key || 'USD'

  // for preview from host: https://dtravelnetwork.atlassian.net/browse/DTRAV-2502
  if (typePayment === TYPE_PAYMENT.CRYPTO && isReservationDraft) {
    currencyPayment = 'USDT' // if host select type crypto => set currency = USDT
  }
  const currencyDisplay = isSummaryPage
    ? propertyDetail?.currency || selectedCurrency?.key || 'USD'
    : selectedCurrency?.key || 'USD'

  const { exchangeRate } = data
  const rate = exchangeRate && exchangeRate.rates ? exchangeRate.rates[currencyDisplay] : 1
  // const ratePayment = exchangeRate && exchangeRate.rates ? exchangeRate.rates[currencyPayment || currencyDisplay] : 1

  const [inputPromoCode, setInputPromoCode] = useState<string>('')

  if (isEmpty(data)) return null

  const discountData: Array<any> = !isCryptoPayment
    ? (Array.isArray(data?.priceDetail?.discount) &&
      data.priceDetail.discount.filter(
        (discount) => discount.isIncludedInTotalPrice && discount.name !== 'creditCardProcessingFee'
      )) ||
    []
    : (Array.isArray(data?.priceDetail?.discount) &&
      data.priceDetail.discount.filter(
        (discount) =>
          discount.isIncludedInTotalPrice &&
          discount.name !== 'creditCardProcessingFee' &&
          discount.name !== 'creditCardFeesAbsorbedByHost'
      )) ||
    []

  const discountCreditCardProcessingFee: any =
    Array.isArray(data?.priceDetail?.discount) &&
    data.priceDetail.discount.find((discount) => discount.name === 'creditCardProcessingFee')
  const feeData: Array<Fee> =
    (Array.isArray(data?.priceDetail?.fee) && data.priceDetail.fee.filter((fee) => fee.isIncludedInTotalPrice)) || []
  const taxData: Array<any> =
    (Array.isArray(data?.priceDetail?.tax) && data.priceDetail.tax.filter((tax) => tax.isIncludedInTotalPrice)) || []
  const addonsData: Array<Fee> =
    (Array.isArray(data?.priceDetail?.addons) && data.priceDetail.addons.filter((fee) => fee.isIncludedInTotalPrice)) ||
    []
  const totalFee = feeData.reduce((accum, item: any) => accum + Number(item.total || item.value), 0)
  const totalTax = taxData.reduce((accum, item) => accum + Number(item.total || item.value), 0)
  const priceCreditCardProcessingFeeWaived = discountCreditCardProcessingFee
    ? discountCreditCardProcessingFee
      ? Number(discountCreditCardProcessingFee.value * rate)
      : 0
    : Number(data?.platformFee?.[currencyDisplay] || 0)
  return (
    <div
      className={clsx({
        ['bg-trasparient text-grayscale-600']: true,
        ['px-4 py-[24px] rounded-[16px] bg-neutral-200 ']: hasBorder,
        ['mt-4']: isDetailPropertyPage,
      })}
    >
      {title && <p className="font-inter-500 text-18-24 text-grayscale-900 mb-2">{title}</p>}

      {notes && <p className="font-inter-400 text-14-20 text-grayscale-600 mb-[16px]">{notes}</p>}

      {/* PRICE */}
      <div className={'flex justify-between mb-[8px]'}>
        <TooltipClick
          title={<BasePriceDetail priceInfo={data} currencyDisplay={currencyDisplay} />}
          header="Base Price Details"
          type="basePrice"
        >
          <p className="text-14-18 font-inter-400">
            <DtravelPrice
              price={data.basePricePerNight ? Number(data.basePricePerNight * rate) : 0}
              currency={currencyDisplay}
            />{' '}
            x {nights || 0} {nights > 1 ? 'nights' : 'night'}
          </p>
        </TooltipClick>
        <span className="text-14-18 text-grayscale-900 font-inter-500">
          <DtravelPrice price={Number(data.price * rate)} currency={currencyDisplay} />
        </span>
      </div>

      {/* ---DISCOUNT--- */}
      {!isEmpty(discountData) && (
        <div className={'flex justify-between mb-[8px]'}>
          <TooltipClick
            title={
              <BaseTaxesAndFeesDetail priceInfo={data} currencyDisplay={currencyDisplay} discountData={discountData} />
            }
            header="Discounts"
            type="discounts"
          >
            <p className="text-14-18 font-inter-400">Discounts</p>
          </TooltipClick>

          <span className="text-14-18 text-forest-700 font-inter-500">
            <DtravelPrice
              price={Number(data.priceDetail.totalDiscount.value * rate)}
              currency={currencyDisplay}
              isDiscount
            />
          </span>
        </div>
      )}

      {/* ---FEE--- */}
      {!isEmpty(feeData) && (
        <div className={'flex justify-between mb-[8px]'}>
          <TooltipClick
            title={
              <BaseTaxesAndFeesDetail
                priceInfo={data}
                currencyDisplay={currencyDisplay}
                feeData={feeData}
                total={totalFee}
              />
            }
            header="Fees Details"
            type="fees"
          >
            <p className="text-14-18 font-inter-400">Fees</p>
          </TooltipClick>
          <span className="text-14-18 text-grayscale-900 font-inter-500">
            <DtravelPrice price={Number(totalFee || 0) * rate} currency={currencyDisplay} />
            {/* <DtravelPrice price={Number(data.priceDetail.taxAndFee.value || 0) * rate} currency={currencyDisplay} /> */}
          </span>
        </div>
      )}

      {/* ---Add-ons--- */}
      {!isEmpty(addonsData) && (
        <div className={'flex justify-between mb-[8px]'}>
          <TooltipClick
            title={
              <BaseTaxesAndFeesDetail priceInfo={data} currencyDisplay={currencyDisplay} addonsData={addonsData} />
            }
            header="Additional Services"
            type="additionalServices"
          >
            <p className="text-14-18 font-inter-400">Additional Services</p>
          </TooltipClick>
          <span className="text-14-18 text-neutral-900 font-inter-500">
            <DtravelPrice
              // price={Number(data?.priceDetail?.totalAddOns?.convertedValue?.[currencyDisplay] || 0)}
              price={Number(data?.priceDetail?.totalAddOns?.value || 0) * rate}
              currency={currencyDisplay}
            />
          </span>
        </div>
      )}

      {/* ---Taxes--- */}
      {!isEmpty(taxData) && (
        <div className={'flex justify-between mb-[8px]'}>
          <TooltipClick
            title={
              <BaseTaxesAndFeesDetail
                priceInfo={data}
                currencyDisplay={currencyDisplay}
                taxData={taxData}
                total={totalTax}
              />
            }
            header="Taxes Details"
            type="taxes"
          >
            <p className="text-14-18 font-inter-400">Taxes</p>
          </TooltipClick>
          <span className="text-14-18 text-grayscale-900 font-inter-500">
            <DtravelPrice price={Number(totalTax || 0) * rate} currency={currencyDisplay} />
            {/* <DtravelPrice price={Number(data.priceDetail.taxAndFee.value || 0) * rate} currency={currencyDisplay} /> */}
          </span>
        </div>
      )}

      {/* ---Card processing fee waived--- */}
      {(discountCreditCardProcessingFee || isCryptoPayment) && priceCreditCardProcessingFeeWaived !== 0 && (
        <div
          className={`flex justify-between mb-2 text-14-18 text-grayscale-900 font-inter-400 ${isCryptoPayment || (isDetailPropertyPage && selectedCurrency.type === 'CRYPTO') ? '' : 'hidden'
            }`}
        >
          <div className="flex items-start font-inter-400 text-14-18 text-grayscale-600">
            Card processing fee waived
            <TooltipClick
              placement="top"
              title={
                <span className="font-inter-400 text-12-16 text-grayscale-4">
                  This fee is discounted when you book with crypto.
                </span>
              }
              arrow
              type="feeDiscounted"
            >
              <HelpOutlineIcon style={{ width: 16, fontSize: 14, marginRight: 16, marginLeft: 2, marginTop: 2 }} />
            </TooltipClick>
          </div>
          <span className="text-forest-700 text-14-18 font-inter-500">
            <DtravelPrice
              price={priceCreditCardProcessingFeeWaived}
              currency={currencyDisplay}
              isDiscount
            />
          </span>
        </div>
      )}

      {/* Promotion code */}
      <>
        {!isEmpty(data?.priceDetail?.promotionDiscount) &&
          <>
            {data?.priceDetail?.promotionDiscount?.map((el: any, idx: number) => {
              return (
                <div
                  className={`flex items-center justify-between mb-6 text-14-18 text-grayscale-900 font-inter-400`}
                  key={idx}
                >
                  <div className="flex items-center gap-2">
                    <span className='font-inter-400 text-14-18 text-grayscale-600'>Promo code</span>
                    <div className='flex items-center gap-2 bg-forest-50 rounded-[8px] p-2'>
                      <Image src={ic_promotion} alt="" width={16} height={16} />
                      <span className='text-14-18 font-inter-500 text-forest-700'>{el?.name}</span>
                    </div>
                    {!isSummaryPage &&
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setInputPromoCode('')
                          dispatch(setPromoCode(''))
                        }}
                      >
                        <Image src={ic_close_md} alt="" width={16} height={16} />
                      </div>
                    }
                  </div>
                  <span className="text-forest-700 text-14-18 font-inter-500">
                    <DtravelPrice price={el?.value * rate} currency={currencyDisplay} isDiscount />
                  </span>
                </div>
              )
            })}
          </>
        }
        {isBookingPage && isEmpty(reservationId) &&
          <div className='bg-grayscale-50 rounded-[24px] p-6 lg:p-8 mb-6'>
            <p className='mb-2 lg:mb-4 text-16-20 font-inter-500 text-grayscale-900'>Promo Code</p>
            <div className='flex items-center gap-2'>
              <input
                type="text"
                placeholder="Enter promo code here"
                value={inputPromoCode}
                onChange={(e: any) => setInputPromoCode(e?.target?.value?.trim())}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter" && !isLoadingPrice && !isEmpty(inputPromoCode)) dispatch(setPromoCode(inputPromoCode))
                }}
                className="bg-white w-full px-4 py-[10px] border border-neutral-300 rounded-[12px] text-14-18 text-grayscale-900 font-inter-400"
              />
              <BasicButton
                size={'lg'}
                variant={'contained'}
                onClick={() => {
                  if (!isLoadingPrice && !isEmpty(inputPromoCode)) dispatch(setPromoCode(inputPromoCode))
                }}
                // loading={isLoadingPrice}
                disabled={isLoadingPrice || isEmpty(inputPromoCode) || inputPromoCode === promoCode}
              >
                <span className="text-white font-inter-500 text-16-20 mr-[4px] whitespace-nowrap">{!isEmpty(promoCode) && inputPromoCode === promoCode ? 'Applied' : 'Apply'}</span>
              </BasicButton>
            </div>
          </div>
        }
      </>

      <div className={'h-[0.5px] bg-[#00000026] my-[16px]'} />
      <div className={'flex justify-between text-16-20'}>
        <span className="font-inter-500 text-grayscale-900">Total</span>
        {!isLoadingPrice && (
          <span className={'flex flex-col items-end'}>
            <span className="font-inter-500 text-grayscale-900">
              {isDetailPropertyPage ? (
                <DtravelPrice
                  price={Number(data?.finalPrice?.[selectedCurrency.key])}
                  isDynamic={isCrypto}
                  currency={selectedCurrency.key}
                />
              ) : (
                <DtravelPrice
                  price={
                    // !isCryptoPayment
                    Number(
                      data?.finalPrice?.[
                      !isSummaryPage && selectedCurrency?.type === 'CRYPTO'
                        ? 'USD'
                        : currencyPayment
                      ]
                    ) || 0
                    // : Number(data.totalPrice * ratePayment) || 0
                  }
                  isDynamic={isCrypto || (typePayment === TYPE_PAYMENT.CRYPTO && isReservationDraft)}
                  currency={
                    !isCryptoPayment && !isSummaryPage && selectedCurrency?.type === 'CRYPTO'
                      ? 'USD'
                      : currencyPayment
                  }
                />
              )}
            </span>
            {isBookingPage && (
              <span className={'text-14-20 text-grayscale-600 font-inter-400'}>
                (
                <DtravelPrice
                  price={
                    // !isCryptoPayment
                    Number(data?.finalPrice?.[currencyDisplay]) || 0
                    // : Number(data.totalPrice * rate) || 0
                  }
                />
                )
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default PriceBreakDown
