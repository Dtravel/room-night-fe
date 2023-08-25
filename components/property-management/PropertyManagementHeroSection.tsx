import React, { useEffect, useState } from 'react'
import { isEmpty } from '@dtravel/utils/common'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import { useAppSelector } from '@dtravel/redux/hooks'
import { IconArroRight } from '../common/Icons'

interface Props {
  hero: any
  isLoading: boolean
}

const PropertyManagementHeroSection: React.FC<Props> = ({ hero, isLoading }) => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const heroImage = hero?.imageUrl || 'https://static.dtravel.com/guest/hero-image.webp'
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const isShowGallery = !isEmpty(heroImage)
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768

  const checkImageLoaded = () => {
    if (heroImage) {
      const heroImageLading = document?.getElementById('hero_img_management')
      let preloaderImg: HTMLImageElement | null = document.createElement('img')
      const imageUrl = `${heroImage}${isMobile ? '?w=640' : '?w=1080'}`
      preloaderImg.src = imageUrl
      if (preloaderImg && heroImageLading) {
        preloaderImg.addEventListener(
          'load',
          function () {
            heroImageLading.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.64)), url(${imageUrl})`
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
                heroImageLading.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.64)), url(${heroImage})`
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
  }, [hero?.imageUrl])

  return (
    <div
      className={`h-[480px] md:h-[480px] lg:h-[640px] xl:h-[720px] w-full min-h-[424px] bg-white ${isShowGallery && !isLoaded ? 'opacity-[0]' : 'opacity-[1]'
        }`}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={
          isShowGallery
            ? {
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }
            : {}
        }
        id="hero_img_management"
      >
        <div className="flex flex-col items-center justify-center w-full md:w-[572px] lg:w-[840px]">
          {!isLoading && (
            <>
              <p
                className={`${isShowGallery ? 'text-white' : 'text-neutral-900'
                  } font-inter-600 text-40-40 lg:text-64-64 mb-[24px] text-center px-[24px] md:px-0 tracking-[-0.02em] md:tracking-[-0.03em] lg:tracking-[-0.035em]`}
                style={isShowGallery ? { textShadow: '0px 32px 64px rgba(0, 0, 0, 0.14)' } : {}}
              >
                {hero?.header}
              </p>
              <p
                className={`${isShowGallery ? 'text-grayscale-300' : 'text-grayscale-600'
                  } font-inter-400 text-20-28 mb-[40px] text-center px-[24px] md:px-0`}
                style={isShowGallery ? { textShadow: '0px 32px 64px rgba(0, 0, 0, 0.14)' } : {}}
              >
                {hero?.subHeader}
              </p>
              <div className='h-[48px] md:h-[64px] bg-white flex items-center justify-center gap-3 cursor-pointer px-[28px] rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                onClick={() => {
                  window.open(hero?.url, '_blank')
                }}
              >
                <span className='text-20-24' style={{ color: landingSetting?.primaryColor || "#0F0F0F" }}>{hero?.button}</span>
                <IconArroRight color={landingSetting?.primaryColor} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyManagementHeroSection
