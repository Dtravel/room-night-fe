import React, { useEffect, useState } from 'react'
import { isEmpty } from '@dtravel/utils/common'
import { MerchantLandingDataProps } from '@dtravel/helpers/interfaces/property'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import LandingSearchBar from '@dtravel/components/merchant-landing/LandingSearchBar'
import BusinessContact from '@dtravel/components/merchant-map-view/BusinessContact'

interface Props {
  userId?: string | null
  landingData: MerchantLandingDataProps | null
  isLoading?: boolean
  businessInfor: any
  onChangeViewMode: () => void
}

const LandingHeroSection: React.FC<Props> = ({ landingData, isLoading, businessInfor, onChangeViewMode }) => {
  const heroImage = landingData?.gallery || 'https://static.dtravel.com/guest/hero-image.webp'
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const isShowGallery = !isEmpty(heroImage)
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768

  const checkImageLoaded = () => {

    if (heroImage) {
      const heroImageLading = document?.getElementById('hero_img_landing')
      let preloaderImg: HTMLImageElement | null = document.createElement('img')
      const imageUrl = `${heroImage}${isMobile ? '?w=640' : '?w=1080'}`
      preloaderImg.src = imageUrl
      if (preloaderImg && heroImageLading) {
        preloaderImg.addEventListener(
          'load',
          function () {
            heroImageLading.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`
            preloaderImg = null
            setLoaded(true)
          },
          false
        )
        preloaderImg.addEventListener(
          'error',
          function () {
            let preloaderImgOriginal: HTMLImageElement | null = document.createElement('img')
            preloaderImgOriginal.src = heroImage
            preloaderImgOriginal.addEventListener(
              'load',
              function () {
                heroImageLading.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`
                preloaderImgOriginal = null
                setLoaded(true)
              },
              false
            )
          },
          false
        )
      }
    }
  }

  useEffect(() => {
    checkImageLoaded()
    // eslint-disable-next-line
  }, [landingData?.gallery])
  const siteName = businessInfor?.hostName || businessInfor?.contactName
  return (
    <div
      className={`h-[70vh] min-h-[424px] px-[16px] md:px-[32px] lg:px-[24px] bg-white my-[8px] ${isShowGallery && !isLoaded ? 'opacity-[0]' : 'opacity-[1]'
        }`}
    >
      <div
        className="w-full h-full rounded-[24px] flex flex-col items-center justify-center"
        style={
          isShowGallery
            ? {
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }
            : {}
        }
        id="hero_img_landing"
      >
        <div className="flex flex-col items-center justify-center w-full md:w-[570px] xl:w-[720px]">
          {isLoading && (
            <>
              <p
                className={`${isShowGallery ? 'text-white' : 'text-neutral-900'
                  } font-inter-600 text-40-40 md:text-64-64 xl:text-88-88 mb-[24px] text-center px-[24px] md:px-0 tracking-[-0.02em] md:tracking-[-0.03em] lg:tracking-[-0.035em]`}
                style={isShowGallery ? { textShadow: '0px 32px 64px rgba(0, 0, 0, 0.14)' } : {}}
              >
                {landingData?.headline || 'Book direct, travel more'}
              </p>
              <p
                className={`${isShowGallery ? 'text-neutral-300' : 'text-neutral-600'
                  } font-inter-400 text-20-28 md:text-24-36 mb-[32px] md:mb-[48px] text-center px-[24px] md:px-0`}
                style={isShowGallery ? { textShadow: '0px 32px 64px rgba(0, 0, 0, 0.14)' } : {}}
              >
                {landingData?.subHeadline ||
                  `Save up to 20% when you book directly ${siteName ? `with ${siteName}` : ', powered by Dtravel'}`}
              </p>
            </>
          )}
        </div>

        {isLoading && <LandingSearchBar />}

        {/*---MOBILE BOOK NOW---*/}
        <div className="flex md:hidden flex-col md:flex-row items-center w-full md:w-auto px-[24px] md:px-0">
          <div
            className={`${isShowGallery ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
              } font-inter-500 text-16-20 px-[24px] py-[20px] rounded-[16px] cursor-pointer w-full md:w-auto mb-[12px] md:mb-0 text-center`}
            onClick={onChangeViewMode}
          >
            Book now
          </div>
          <div
            className={`${isShowGallery ? 'text-white contact-us-backdrop-filter' : 'text-neutral-900'
              } font-inter-500 text-16-20 px-[24px] py-[20px] rounded-[16px] cursor-pointer md:ml-[12px] w-full md:w-auto text-center`}
            style={{ background: isShowGallery ? 'rgba(255, 255, 255, 0.1)' : '#F0F0EE' }}
          >
            <BusinessContact>Contact</BusinessContact>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingHeroSection
