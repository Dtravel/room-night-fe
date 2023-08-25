import { useAppDispatch } from '@dtravel/redux/hooks';
import { setStripeComplete } from '@dtravel/redux/slices/common';
import { CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CARD_OPTIONS: any = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#32302D',
      color: '#32302D',
      fontWeight: 400,
      fontFamily: 'Inter Regular',
      fontSize: '16px',
      lineHeight: '20px',
      fontSmoothing: 'antialiased',
      border: '1px solid #32302D',
      ':-webkit-autofill': {
        color: '#32302D',
      },
      '::placeholder': {
        color: '#6F6B69',
      },
    },
    invalid: {
      iconColor: '#32302D',
      color: '#32302D',
    },
  },
};
const StripeBooking = () => {
  const [stripeError, setStripeError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="w-full md-text px-4 rounded-[16px] py-[21px] text-neutral-900 border-[0.5px] border-[#00000026] hover:border-grayscale-900 bg-white mt-[16px] max-h-[64px]">
        <CardElement
          options={CARD_OPTIONS}
          onChange={e => {
            setStripeError(e?.error?.message || '');
            dispatch(setStripeComplete(e.complete));
          }}
        />
      </div>
      {stripeError && <span className="text-red">{stripeError}</span>}
    </>
  );
};
export default StripeBooking;
