import React from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import Image from 'next/image'

interface Props {
  data: any
}

const PropertyManagementWhyUs: NextPage<Props> = ({ data }) => {
  const { whyClientsTrustUs } = data

  if (isEmpty(whyClientsTrustUs)) return null
  return (
    <>
      <div className="bg-white w-full pt-[64px] lg:pt-[80px] xl:pt-[112px]" id={'why_us_management'}>
        <div className='w-full lg:max-w-[614px] xl:max-w-[752px] mx-auto'>
          <div className="flex flex-col md:gap-[16px] justify-between  mb-[32px] lg:mb-[48px] xl:mb-[64px]">
            <p className="text-grayscale-800 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em] text-center">
              {whyClientsTrustUs?.header}
            </p>
            <p className="text-grayscale-600 font-inter-400 text-16-24 text-center">
              {whyClientsTrustUs?.subHeader}
            </p>
          </div>
          <div className="flex flex-wrap gap-[16px] w-full">
            {!isEmpty(whyClientsTrustUs?.contents) && whyClientsTrustUs?.contents.map((el: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className="bg-[#F5F5F5] w-full md:w-[calc(50%_-_8px)] h-[120px] flex flex-col items-center justify-center gap-2 rounded-[16px]"
                >
                  <Image src={el.iconUrl} alt={''} width={40} height={40} />
                  <span className='text-16-24 text-grayscale-800 font-inter-400'>{el?.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyManagementWhyUs
