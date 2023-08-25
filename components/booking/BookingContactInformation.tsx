import InputPhoneNumber from '@dtravel/components/common/InputPhoneNumber';
import BasicInput from '@dtravel/components/ui/BasicInput';
import { countries } from '@dtravel/helpers/constants/country';
import { GuestInfoProps, SuperhogInfoProps } from '@dtravel/helpers/interfaces';
import { isEmailValid, isOnlyLetters, isPostalCode } from '@dtravel/utils/common';
import React, { useEffect, useState } from 'react';
import { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import { CountryCode } from 'libphonenumber-js/types'
import BasicSelect from '../ui/BasicSelect';
import Image from 'next/image'
import ic_circle_warning from '@dtravel/assets/icons/ic_circle_warning.svg'
import moment from 'moment';
import TooltipClick from '../common/TooltipClick';
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions';
import { useAppSelector } from '@dtravel/redux/hooks';
import { TYPE_PAYMENT } from '@dtravel/helpers/constants/constants';

interface Props {
  handleUpdateGuestInfo: any;
  setDisabled: any;
  loading?: boolean;
  guestInfo: GuestInfoProps & SuperhogInfoProps
  superhogStatus?: string
}

const BookingContactInformation: React.FC<Props> = ({
  handleUpdateGuestInfo,
  setDisabled,
  loading,
  guestInfo,
  superhogStatus
}) => {
  const { typePayment } = useAppSelector((state) => state.common)
  const isSuperhogEnabled = superhogStatus === 'kyg' || superhogStatus === 'kyg_damage'
  const isGoogleApplePay = typePayment === TYPE_PAYMENT.APPLE_PAY || typePayment === TYPE_PAYMENT.GOOGLE_PAY
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const [firstName, setFirstName] = useState<string>(guestInfo?.firstName || '');
  const [lastName, setLastName] = useState<string>(guestInfo?.lastName || '');
  const [email, setEmail] = useState<string>(guestInfo?.email || '');
  const [phone, setPhone] = useState<string>(guestInfo?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState<string>(guestInfo?.dateOfBirth || '')
  const [address, setAddress] = useState<string>(guestInfo?.address?.addressLine1 || '')
  const [city, setCity] = useState<string>(guestInfo?.address?.town || '')
  const [country, setCountry] = useState<string>(guestInfo?.address?.countryIso || '')
  const [postcode, setPostcode] = useState<string>(guestInfo?.address?.postcode || '')
  const [errorMsg, setErrorMsg] = useState({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', postcode: '' });

  useEffect(() => {
    setDisabled(
      (!isGoogleApplePay && (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !isOnlyLetters(firstName) ||
        !isOnlyLetters(lastName) ||
        !isEmailValid(email) ||
        !isValidPhoneNumber(phone)
      )) ||
      (isSuperhogEnabled && (
        !dateOfBirth ||
        !moment(dateOfBirth, 'MM/DD/YYYY', true).isValid() ||
        moment(dateOfBirth, 'MM/DD/YYYY', true).isAfter(moment()) ||
        (!isGoogleApplePay && (
          !address ||
          !city ||
          !country ||
          !postcode ||
          !isPostalCode(postcode)
        ))
      )),
    );
    let dataGuestInfo: GuestInfoProps & SuperhogInfoProps = {}
    if (!isGoogleApplePay) dataGuestInfo = { firstName, lastName, email, phone }
    if (isSuperhogEnabled) {
      dataGuestInfo = { ...dataGuestInfo, dateOfBirth }
      if (!isGoogleApplePay) {
        let countrySelected = countries.find(v => v.iso === country)
        dataGuestInfo = {
          ...dataGuestInfo,
          telephoneType: 1,
          telephoneCode: country ? `+${getCountryCallingCode(country as CountryCode)}` : '',
          address: {
            ...guestInfo?.address,
            addressLine1: address,
            town: city,
            county: countrySelected?.name,
            countryIso: country,
            postcode
          }
        }
      }
    }
    handleUpdateGuestInfo(dataGuestInfo);
    // eslint-disable-next-line
  }, [firstName, lastName, email, phone, dateOfBirth, address, city, country, postcode, typePayment]);

  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    setErrorMsg(prevState => ({ ...prevState, firstName: '' }));
  };
  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setErrorMsg(prevState => ({ ...prevState, lastName: '' }));
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorMsg(prevState => ({ ...prevState, email: '' }));
  };

  const onBlurFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOnlyLetters(event.target.value)) {
      setErrorMsg(prevState => ({
        ...prevState,
        firstName: 'Please enter letters only.',
      }));
    }
  };
  const onBlurLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOnlyLetters(event.target.value)) {
      setErrorMsg(prevState => ({
        ...prevState,
        lastName: 'Please enter letters only.',
      }));
    }
  };

  const onBlurEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEmailValid(event.target.value)) {
      setErrorMsg(prevState => ({
        ...prevState,
        email: 'Please enter a valid email.',
      }));
    }
  };
  const onBlurPhone = () => {
    if (!isValidPhoneNumber(phone || '')) {
      setErrorMsg(prevState => ({
        ...prevState,
        phone: 'Please enter a valid phone number.',
      }));
    }
  };
  const renderErrorMessage = (msg: string) => {
    return <span className={'font-inter-400 text-red mt-2 ml-2 text-12-16'}>{msg}</span>
  }
  if (!isSuperhogEnabled && isGoogleApplePay) return null
  return (
    <>
      <div className="mb-[24px] md:mb-[48px] pb-[24px] md:pb-[48px] border-b-[12px] md:border-b-[0.5px] border-b-solid border-b-neutral-100 md:border-b-[#00000026] px-4 md:px-0">
        <p className="mb-[24px] text-grayscale-900 font-inter-500 text-20-24">
          Contact information
        </p>
        {!isGoogleApplePay &&
          <>
            <div className="flex w-full flex-col md:flex-row">
              <div className={`mb-[16px] md:w-1/2 md:pr-[8px] ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                <BasicInput
                  label={'First name'}
                  value={firstName}
                  onChange={onChangeFirstName}
                  handleBlur={onBlurFirstName}
                  maxLength={25}
                  readOnly={loading}
                />
                {errorMsg.firstName && renderErrorMessage(errorMsg.firstName)}
              </div>

              <div className={`mb-[16px] md:w-1/2 md:pl-[8px] ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                <BasicInput
                  label={'Last name'}
                  value={lastName}
                  onChange={onChangeLastName}
                  handleBlur={onBlurLastName}
                  maxLength={25}
                  readOnly={loading}
                />
                {errorMsg.lastName && renderErrorMessage(errorMsg.lastName)}
              </div>
            </div>
            <div className={`mb-[16px] ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
              <InputPhoneNumber
                phone={phone}
                onChange={(phoneValue: any) => {
                  setPhone(phoneValue);
                  setErrorMsg(prevState => ({ ...prevState, phone: '' }));
                }}
                handleBlur={onBlurPhone}
              />
              {errorMsg.phone && renderErrorMessage(errorMsg.phone)}
            </div>
            <div className={`mb-3 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
              <BasicInput
                label={'Email address'}
                value={email}
                onChange={onChangeEmail}
                handleBlur={onBlurEmail}
                readOnly={loading}
              />
              {errorMsg.email && renderErrorMessage(errorMsg.email)}
            </div>
            <p className="text-grayscale-600 font-inter-400 text-14-18">
              The booking confirmation will be sent to this email address.
            </p>
          </>
        }
        {isSuperhogEnabled &&
          <>
            <div className={`my-3 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
              <BasicInput
                label={'Date of birth'}
                placeholder="mm/dd/yyyy"
                value={dateOfBirth}
                onChange={(event: any) => {
                  const value = event.target.value;
                  let formattedValue = value;
                  // Remove non-digit characters
                  const removeValue = dateOfBirth.length > formattedValue.length
                  // Format as mm/dd/yyyy
                  if (!removeValue) {
                    formattedValue = formattedValue.replace(/\D/g, '');
                    if (formattedValue.length > 1) {
                      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
                    }
                    if (formattedValue.length > 4) {
                      formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5, 9)}`
                    }
                  }
                  setDateOfBirth(formattedValue);
                  setErrorMsg(prevState => ({ ...prevState, dateOfBirth: '' }));
                }}
                handleBlur={() => {
                  const date = moment(dateOfBirth, 'MM/DD/YYYY', true)
                  if (!date.isValid() || date.isAfter(moment())) {
                    setErrorMsg(prevState => ({
                      ...prevState,
                      dateOfBirth: 'Please enter a valid Date of birth.',
                    }));
                  }
                }}
                readOnly={loading}
                endAdornment={
                  <TooltipClick
                    placement={isMobile ? "right" : "bottom"}
                    type='dateOfBirth'
                    title={
                      <p className='text-white text-12-16 font-maison-neue-medium whitespace-pre-wrap'
                        dangerouslySetInnerHTML={{
                          __html: `We are committed to protecting our properties.\nYour DOB helps us verify your identity by our\nindependent verification services.`
                        }}>
                      </p>
                    }
                    sx={{ fontSize: 12, lineHeight: '16px' }}
                    arrow
                  >
                    <span>
                      <Image src={ic_circle_warning} alt="" width={24} height={24} />
                    </span>
                  </TooltipClick>
                }
              />
              {errorMsg.dateOfBirth && renderErrorMessage(errorMsg.dateOfBirth)}
            </div>
            {!isGoogleApplePay &&
              <>
                <div className={`mb-3 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                  <BasicInput
                    label={'Address'}
                    value={address}
                    onChange={(event: any) => setAddress(event.target.value)}
                    readOnly={loading}
                  />
                </div>
                <div className={`mb-3 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                  <BasicInput
                    label={'City'}
                    value={city}
                    maxLength={100}
                    onChange={(event: any) => setCity(event.target.value)}
                    readOnly={loading}
                  />
                </div>
                <div className='flex flex-col md:flex-row md:gap-3'>
                  <div className={`w-full md:w-1/2 mb-3 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                    <BasicSelect
                      label={'Country'}
                      placeholder="Country"
                      options={countries.map((v: any) => ({ ...v, label: v.name, value: v.iso }))}
                      value={country}
                      onChange={(e: any) => {
                        setCountry(e?.target?.value)
                      }}
                    />
                  </div>
                  <div className={`w-full md:w-1/2 mb-3 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                    <BasicInput
                      label={'Postal code'}
                      value={postcode}
                      onChange={(event: any) => {
                        setPostcode(event.target.value)
                        setErrorMsg(prevState => ({ ...prevState, postcode: '' }));
                      }}
                      handleBlur={() => {
                        if (!isPostalCode(postcode)) {
                          setErrorMsg(prevState => ({
                            ...prevState,
                            postcode: 'Please enter a valid Postal code.',
                          }));
                        }
                      }}
                      readOnly={loading}
                    />
                    {errorMsg.postcode && renderErrorMessage(errorMsg.postcode)}
                  </div>
                </div>
              </>
            }
          </>
        }
      </div>
    </>
  );
};

export default BookingContactInformation;
