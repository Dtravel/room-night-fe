/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import ic_circle_check from '@dtravel/assets/icons/ic_circle_check.svg'
import ic_stop from '@dtravel/assets/icons/ic_stop.svg'
import Image from 'next/image';
import { useAppSelector } from '@dtravel/redux/hooks'
import { useRouter } from 'next/router'
import ic_arrow_right_black from '@dtravel/assets/icons/ic_arrow_right_black.svg'
import BasicButton from '../ui/BasicButton'
import Link from 'next/link'

interface Props { }

const MerchantLandingSpecialListProperty: NextPage<Props> = () => {
  const router = useRouter()
  const { hostId } = router.query
  const { landingSetting } = useAppSelector((state) => state.property)
  const subTitle = landingSetting?.property?.subTitle
  const imageUrl = landingSetting?.property?.imageUrl
  const includedText = landingSetting?.property?.included
  const notIncludedText = landingSetting?.property?.notIncluded
  const isLearnMore = landingSetting?.name === 'hersson' || landingSetting?.name === 'adeel'
  const isRiley = landingSetting?.name === 'riley'

  return (
    <>
      <div className='pt-[64px] xl:pt-[80px]' id={'list_your_property'}>
        <div className="bg-white w-full pt-[64px] xl:pt-[80px] border-t-[0.5px] border-t-[#00000026]">
          <div className="flex flex-col lg:flex-row lg:items-start md:gap-[16px] justify-between mb-[32px] lg:mb-[64px] xl:mb-[80px]">
            <div className='w-full lg:w-1/2 lg:pr-[64px] xl:pr-[96px] mb-[16px] md:mb-0'>
              <p className="text-grayscale-900 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em]">
                List your property
              </p>
            </div>
            <p
              className="text-grayscale-600 font-inter-400 text-20-28 w-full lg:w-1/2"
              dangerouslySetInnerHTML={{ __html: subTitle }}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-[16px] gap-y-[32px] w-full">
            <div className='w-full lg:w-1/2 lg:pr-[64px] xl:pr-[96px]'>
              <img
                src={imageUrl}
                alt=""
                className='rounded-[24px] object-cover w-full h-[358px] md:h-[480px] lg:h-[464px]'
              />
            </div>
            <div className='w-full lg:w-1/2'>
              <p className='font-inter-400 text-16-24 text-grayscale-600 mb-[24px]'>Services included</p>
              <div className='flex flex-wrap'>
                {!isEmpty(includedText) && includedText.map((el: string, idx: number) => {
                  return (
                    <div className='flex items-center mb-[16px] w-full md:w-1/2 lg:w-full' key={idx}>
                      <Image src={ic_circle_check} alt="" width={20} height={20} />
                      <p className='font-inter-400 text-grayscale-600 text-16-24 md:text-20-24 ml-[16px] md:pr-[16px] lg:pr-0' >
                        {el}
                      </p>
                    </div>
                  )
                })}
              </div>
              {!isEmpty(notIncludedText) &&
                <>
                  <p className='font-inter-400 text-16-24 text-grayscale-600 mb-[24px] mt-[32px]'>Not included</p>
                  {notIncludedText.map((el: string, idx: number) => {
                    return (
                      <div className='flex items-center mb-[16px]' key={idx}>
                        <Image src={ic_stop} alt="" width={20} height={20} />
                        <p className='font-inter-400 text-grayscale-600 text-16-24 md:text-20-24 ml-[16px]' >
                          {el}
                        </p>
                      </div>
                    )
                  })}
                </>
              }
              {isLearnMore &&
                <button
                  className={
                    'text-grayscale-800 font-inter-400 text-14-18 h-[48px] mt-8 flex items-center justify-center px-[20px] border border-neutral-300 rounded-[12px] whitespace-nowrap'
                  }
                  onClick={() => {
                    router.push({ pathname: `${hostId ? `/${hostId}` : ''}/property-management` })
                  }}
                >
                  <span className='text-neutrall-900 text-16-20'>Learn more</span>
                  <Image src={ic_arrow_right_black} alt="" width={20} height={20} className="ml-[8px]" />
                </button>
              }
              {isRiley &&
                <div className='w-full mt-5 flex flex-col md:flex-row items-center gap-2'>
                  <Link href={"https://keap.page/hwn640/host-onboarding.html"} passHref target="_blank" className={'w-full lg:w-auto'}>
                    <BasicButton variant={'contained'} size={'xxl'} clases={'w-full lg:w-auto'}>
                      <span>Get started</span>
                    </BasicButton>
                  </Link>
                  <Link href={"https://keap.page/hwn640/host-quiz.html"} passHref target="_blank" className={'w-full lg:w-auto'}>
                    <BasicButton variant={'outlined'} size={'xxl'} clases={'w-full lg:w-auto'}>
                      <span>Learn more</span>
                    </BasicButton>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MerchantLandingSpecialListProperty
