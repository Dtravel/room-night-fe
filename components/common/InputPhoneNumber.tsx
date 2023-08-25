import { CountryCode } from 'libphonenumber-js/types'
import React, { useEffect, useState } from 'react'
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input'
import { getIpInfo } from '@dtravel/helpers/api/common'

interface Props {
  phone: string
  onChange: any
  handleFocus?: any
  handleBlur?: any
}

const InputPhoneNumber: React.FC<Props> = ({ phone, onChange, handleBlur, handleFocus }) => {
  const [isFocus, setFocus] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<CountryCode>('US')

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await getIpInfo().then((res) => res.data)
        if (res.countryCode) setCountryCode(res.countryCode)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCountry()
  }, [])

  return (
    <div className="relative">
      <span className="text-12-16 text-grayscale-600 absolute top-[14px] left-[92px] font-inter-400">Phone number</span>
      {countryCode && (
        <span className="text-16-20 text-grayscale-900 font-inter-500 absolute top-[34px] left-[92px]">
          (+{getCountryCallingCode(countryCode)})
        </span>
      )}
      <PhoneInput
        countrySelectProps={{
          onFocus: () => {
            setFocus(true)
          },
          onBlur: () => {
            setFocus(false)
          },
        }}
        defaultCountry={countryCode}
        onCountryChange={(countryValue: CountryCode) => {
          setCountryCode(countryValue)
        }}
        placeholder=""
        value={phone}
        onChange={onChange}
        onFocus={(inputFocusProps: any) => {
          setFocus(true)
          if (handleFocus) handleFocus(inputFocusProps)
        }}
        onBlur={(inputBlurProps: any) => {
          setFocus(false)
          if (handleBlur) handleBlur(inputBlurProps)
        }}
        className={`h-[68px] min-h-[68px] border-[0.5px] border-[#00000026] rounded-2xl hover:border-grayscale-900 focus:border-grayscale-900 pr-6 font-inter-500 ${
          isFocus ? 'border-grayscale-900' : ''
        }`}
        addInternationalOption={false}
      />
    </div>
  )
}
export default InputPhoneNumber
