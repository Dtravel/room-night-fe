import React, { useEffect, useState } from 'react'
import { isEmpty } from '@dtravel/utils/common'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import { IconArroRight } from '../common/Icons'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {
  bookACall: any
  isLoading: boolean
}

const PropertyManagementUnlock: React.FC<Props> = ({ bookACall, isLoading }) => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const heroImage = bookACall?.imageUrl || 'https://static.dtravel.com/guest/hero-image.webp'
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const isShowGallery = !isEmpty(heroImage)
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  console.log('bookACall', bookACall)
  const checkImageLoaded = () => {
    if (heroImage) {
      const heroImageLading = document?.getElementById('unlock_img_management')
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
  }, [bookACall?.imageUrl])

  return (
    <div className="w-full pt-[64px] lg:pt-[80px] xl:pt-[112px]" id={'unlock_management'}>
      <div
        className={`h-[480px] xl:h-[600px] w-full min-h-[480px] bg-white rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] ${isShowGallery && !isLoaded ? 'opacity-[0]' : 'opacity-[1]'
          }`}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center rounded-[24px] lg:rounded-[32px] xl:rounded-[40px]"
          style={
            isShowGallery
              ? {
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }
              : {}
          }
          id="unlock_img_management"
        >
          <div className="flex flex-col items-center justify-center w-full md:w-[572px] lg:w-[840px]">
            {!isLoading && (
              <>
                <p
                  className={`${isShowGallery ? 'text-white' : 'text-neutral-900'
                    } font-inter-600 text-40-40 mb-[16px] text-center px-[24px] md:px-0 tracking-[-0.02em]`}
                  style={isShowGallery ? { textShadow: '0px 32px 64px rgba(0, 0, 0, 0.14)' } : {}}
                >
                  {bookACall?.header}
                </p>
                <p
                  className={`${isShowGallery ? 'text-grayscale-300' : 'text-grayscale-600'
                    } font-inter-400 text-16-24 mb-[40px] text-center px-[24px] md:px-0`}
                >
                  {bookACall?.subHeader}
                </p>
                <div className='h-[64px] bg-white flex items-center justify-center gap-3 cursor-pointer px-[28px] rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                  onClick={() => {
                    window.open(bookACall?.url, '_blank')
                  }}
                >
                  <span className='text-20-24' style={{ color: landingSetting?.primaryColor || "#0F0F0F" }}>{bookACall?.button}</span>
                  <IconArroRight color={landingSetting?.primaryColor} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyManagementUnlock
