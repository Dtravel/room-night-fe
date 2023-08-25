/* eslint-disable @next/next/no-img-element */
import React from 'react'
import LandingSearchBarSpecial from './LandingSearchBarSpecial'
import clsx from 'clsx'
import { isEmpty } from '@dtravel/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props { }

const LandingHeroSection: React.FC<Props> = () => {
  const { landingSetting, businessInfor } = useAppSelector((state) => state.property)
  const headline = landingSetting?.headline || 'Book direct, travel more'
  const siteName = businessInfor?.hostName || businessInfor?.contactName
  const subHeadline = landingSetting?.subHeadline ||
    `Save up to 20% when you book directly ${siteName ? `with ${siteName}` : ', powered by Dtravel'}`
  const heroImage = landingSetting?.gallery || 'https://static.dtravel.com/guest/hero-image.webp'
  return (
    <>
      <div className={`w-full bg-white flex md:items-center flex-col-reverse md:flex-row md:gap-[16px] md:mt-[64px] lg:mt-[80px]`}>
        <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-1/2 lg:pr-[64px] xl:pr-[96px]" id="headline">

          <>
            <p className={`text-grayscale-900 font-inter-600 text-40-48 lg:text-64-76 tracking-[-0.02em] lg:tracking-[-0.04em] mb-[16px] break-words line-clamp-2`}
              title={headline}
            >
              {headline}
            </p>
            <p className={`text-grayscale-600 font-inter-400 text-20-28 mb-[24px] md:mb-[40px] break-words line-clamp-2`}
              title={subHeadline}>
              {subHeadline}
            </p>
            <LandingSearchBarSpecial />
          </>
        </div>
        <div className={clsx(
          'w-full md:w-[50vw] lg:w-[50vw] xl:w-[50vw] overflow-hidden',
          'h-[238px] md:h-[600px] lg:h-[600px] xl:h-[600px] xxl:h-[600px]',
          'mb-[24px] md:mb-0',
          'md:mr-[-100%] md:translate-x-[-16px] md:pl-[16px]'
        )}>
          {!isEmpty(heroImage) &&
            <img
              src={heroImage}
              className={clsx(
                'rounded-[24px] h-full object-cover',
                'w-full md:w-[456px] lg:w-[817px] xl:w-[817px] xxl:w-[817px]',
                'md:min-w-[456px] lg:min-w-[817px] xl:min-w-[817px] xxl:min-w-[817px]',
                'md:max-w-[456px] lg:max-w-[817px] xl:max-w-[817px] xxl:max-w-[817px]'
              )}
              alt=""
            />
          }
        </div>
      </div>
    </>
  )
}

export default LandingHeroSection
