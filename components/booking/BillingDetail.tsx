import { stripePaymentBooking } from '@dtravel/helpers/api/booking'
import { StripeInfoProps } from '@dtravel/helpers/interfaces'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setToast, setToastError } from '@dtravel/redux/slices/common'
import { Elements, AddressElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import BasicButton from '../ui/BasicButton'
import BasicDialog from '../ui/BasicDialog'
import { isEmpty } from '@dtravel/utils/common'
import { TYPE_PAYMENT } from '@dtravel/helpers/constants/constants'

interface Props {
  stripeInfo: StripeInfoProps | null
  reservationID: string
  email: string
  handleClose: any
}

const BillingDetail: React.FC<Props> = ({ stripeInfo, reservationID, email, handleClose }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { typePayment } = useAppSelector((state) => state.common)
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [billingDetail, setBillingDetail] = useState<any>(null)

  const onOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
    handleClose()
  }
  const goToBookingSummary = (reservationID: string) => {
    router.push({ pathname: `/booking-summary/${reservationID}` })
  }
  const onSubmit = async (stripe: any) => {
    try {
      setLoading(true)
      const { data } = await stripePaymentBooking(reservationID, { ...billingDetail, email, paymentMethod: typePayment })
      if (data.success) {
        if (data?.data?.paymentIntent?.status === 'succeeded') {
          // manual reservation 0đ
          goToBookingSummary(reservationID)
          onClose()
        } else {
          const origin = typeof window !== 'undefined' ? window.location.origin : '';
          const options: any = {
            payment_method: { billing_details: { ...billingDetail, email } },
            return_url: `${origin}/booking-summary/${reservationID}`
          }
          let result: any = null
          if (typePayment === TYPE_PAYMENT.AFFIRM_PAY) {
            result = await stripe.confirmAffirmPayment(data.data.paymentIntent?.client_secret, options)
          } else if (typePayment === TYPE_PAYMENT.AFTER_PAY) {
            result = await stripe.confirmAfterpayClearpayPayment(data.data.paymentIntent?.client_secret, options)
          } else if (typePayment === TYPE_PAYMENT.KLARNA_PAY) {
            result = await stripe.confirmKlarnaPayment(data.data.paymentIntent?.client_secret, options)
          }
          console.log('result stripe BNPL:', result)
          if (result.error) {
            dispatch(setToastError({ message: result?.error?.payment_intent?.last_payment_error?.message || result?.error?.message || result?.data?.message }))
          } else {
            goToBookingSummary(reservationID)
          }
          onClose()
          setLoading(false)
        }
      }
    } catch (error: any) {
      onClose()
      setLoading(false)
      dispatch(setToast({ show: true, message: error?.data?.message }))
    }
  }

  return (
    <>
      <div
        id="billing-detail"
        className='none'
        onClick={(e: any) => {
          onOpen()
          e.stopPropagation()
        }}
      />
      <BasicDialog title="Billing Detail" isOpen={open} onClose={onClose}>
        <Elements
          stripe={loadStripe(stripeInfo?.stripePublishableKey || '', {
            locale: 'en',
            stripeAccount: stripeInfo?.stripeAccount,
          })}
        >
          <ElementsConsumer>
            {({ stripe }) => (
              <>
                <form>
                  <AddressElement
                    options={{ mode: 'billing' }}
                    onChange={(event: any) => {
                      // console.log('event', event)
                      if (event.complete) setBillingDetail(event.value)
                    }}
                  />
                </form>
                <BasicButton
                  size={'xxl'}
                  variant={'contained'}
                  onClick={(e) => {
                    if (!loading) onSubmit(stripe)
                    e.stopPropagation()
                  }}
                  loading={loading}
                  disabled={loading || isEmpty(billingDetail)}
                  style={{ width: '100%', marginTop: 24 }}
                >
                  <span className="text-white font-inter-500 text-16-20 mr-[4px]">Submit</span>
                </BasicButton>
              </>
            )}
          </ElementsConsumer>
        </Elements>
      </BasicDialog>
    </>
  )
}

export default BillingDetail
