/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'
interface Props { }

const MerchantLandingSpecialWhatSet: NextPage<Props> = () => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const isFourPerRow = landingSetting?.whatSet?.content?.length <= 4
  const data = landingSetting?.whatSet?.content
  return (
    <>
      <div className="bg-white w-full mt-[64px] xl:mt-[80px] pt-[64px] xl:pt-[80px] border-t-[0.5px] border-t-[#00000026]" id={'reviews'}>
        <div className="flex flex-col lg:flex-row lg:items-center md:gap-[16px] justify-between mb-[32px] lg:mb-[48px]">
          <div className='w-full'>
            <p className="text-grayscale-900 font-inter-500 text-24-32 lg:text-24-32 tracking-[-0.03em] lg:tracking-[-0.02em]">
              What sets us apart
            </p>
            <p className='text-grayscale-600 font-inter-400 text-16-24 mt-[8px]'>
              {landingSetting?.whatSet?.title}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[16px] gap-y-[32px] w-full">
          {!isEmpty(data) && data.map((el: any, idx: number) => {
            return (
              <div className={`flex flex-col w-[calc(50%_-_8px)] ${!isFourPerRow ? 'md:w-[calc(25%_-_12px)] lg:w-[calc(100%_/_6_-_13.33333px)] ' : 'md:w-[calc(25%_-_12px)]'}`} key={idx}>
                <img src={el.imageURL} alt="" className={`rounded-[12px] object-cover w-full h-[171px] md:h-[164px] ${!isFourPerRow ? 'lg:h-[141px] xxl:h-[176px]' : 'lg:h-[272px] xxl:h-[272px]'}`} />
                <p className='font-inter-400 text-grayscale-900 text-16-20 mt-[16px] min-h-[20px]'>
                  {el.title}
                </p>
                {!isEmpty(el.content) &&
                  <p className='font-inter-400 text-grayscale-600 text-14-20 mt-[8px]'>
                    {el.content}
                  </p>
                }
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MerchantLandingSpecialWhatSet
