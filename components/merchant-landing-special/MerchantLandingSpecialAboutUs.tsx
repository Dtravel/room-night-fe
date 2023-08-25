/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props { }

const MerchantLandingSpecialAboutUs: NextPage<Props> = () => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const aboutUsText = landingSetting?.bio?.split('\n')
  if (isEmpty(aboutUsText)) return null
  return (
    <>
      {/* About us */}
      <div className='pt-[64px] xl:pt-[80px]' id={'about'}>
        <div className="bg-white w-full pt-[64px] xl:pt-[80px] border-t-[0.5px] border-t-[#00000026]">
          <div className="flex flex-col lg:flex-row lg:items-center md:gap-[16px] justify-between mb-[32px] lg:mb-[64px] xl:mb-[80px]">
            <div className='w-full md:w-1/2 lg:w-1/2 lg:pr-[64px] xl:pr-[96px]'>
              <p className="text-grayscale-900 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em]">
                About us
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-[16px] w-full">
            <div className='w-full lg:w-1/2 lg:pr-[64px] xl:pr-[96px]'>
              {!isEmpty(aboutUsText) && aboutUsText.map((el: string, idx: number) => {
                const isLast = idx === aboutUsText.length - 1
                return (
                  <Fragment key={idx}>
                    <p className='font-inter-400 text-grayscale-600 text-16-24 md:text-20-28 break-words' dangerouslySetInnerHTML={{ __html: el }} />
                    {!isLast && <br />}
                  </Fragment>
                )
              })}

            </div>
            <div className='w-full lg:w-1/2 mt-[16px] md:mt-[32px] lg:mt-0'>
              {!isEmpty(landingSetting?.aboutUsImage) &&
                <img
                  src={landingSetting?.aboutUsImage}
                  className='rounded-[24px] object-cover w-full h-[358px] md:h-[480px] lg:h-[560px]'
                  alt=""
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MerchantLandingSpecialAboutUs
