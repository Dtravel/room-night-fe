import React, { useState, useRef } from 'react'
import { setIsOpenPopupImages, setIndexImageInGallery } from '@dtravel/redux/slices/common'
import { useDispatch } from 'react-redux'
import { PropertyImage } from '@dtravel/helpers/interfaces'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import ic_arrow_left_lg from '@dtravel/assets/icons/ic_arrow_left_lg.svg'

interface Props {
  propertyImages: PropertyImage[]
}

const HeroImages: React.FC<Props> = ({ propertyImages }) => {
  const galleryBtn = useRef(null)
  const dispatch = useDispatch()
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const openGallery = (index: number) => {
    dispatch(setIndexImageInGallery(index))
    dispatch(setIsOpenPopupImages(true))
  }

  const renderGridItemClass = (position: number, length: number) => {
    if (position === 2) {
      return 'col-span-2'
    }
    return length < 4 ? 'col-span-2' : ''
  }

  const renderRadiusClass = (position: number, length: number) => {
    if (position === 2) {
      return length === 2 ? 'rounded-r-[24px]' : 'rounded-tr-[24px]'
    }
    if (position === 3) {
      return length === 3 ? 'rounded-br-[24px]' : ''
    }
    if (position === 4) {
      return length === 4 ? 'rounded-br-[24px]' : ''
    }
    return ''
  }

  const handleEnterAndLeaveLastImage = (type: 'enter' | 'leave') => {
    if (galleryBtn.current) {
      const element = galleryBtn.current as HTMLButtonElement
      type === 'enter' ? element.classList.remove('hidden') : element.classList.add('hidden')
    }
  }

  const length = propertyImages?.length || 0

  return (
    <>
      <div className={'hidden md:block w-full h-[240px] md:h-[360px] lg:h-[460px] xl:h-[500px] 2xl:h-[540px]'}>
        {/* CASE: No image or only 1 image */}
        {(!Array.isArray(propertyImages) ||
          (Array.isArray(propertyImages) && (propertyImages?.length === 0 || propertyImages?.length === 1))) && (
            <div className={'heroImage rounded-[24px] h-full w-full'}>
              <div
                style={{
                  backgroundImage: `url(${Array.isArray(propertyImages) && propertyImages?.length === 1
                    ? propertyImages[0].url + '?w=1080'
                    : 'https://static.dtravel.com/images/404/default_image.jpg'
                    })`,
                }}
                className={'child lg:rounded-[24px] cursor-pointer'}
                onClick={() => openGallery(0)}
              />
            </div>
          )}

        {/* CASE: >= 2 images */}
        {length >= 2 && (
          <div className={'flex gap-[1px] h-full'}>
            <div className={'w-full md:w-[calc(66.66%-32px)] lg:w-[calc(66.66%-48px)]'}>
              <div className={'heroImage h-full rounded-l-[24px]'}>
                <div
                  style={{
                    backgroundImage: `url(${propertyImages[0].url}?w=1080)`,
                  }}
                  className={'child cursor-pointer'}
                  onClick={() => openGallery(0)}
                />
              </div>
            </div>

            {length < 4 ? (
              <div className={`hidden md:grid flex-auto ${length > 2 ? 'grid-rows-2 grid-cols-2 gap-[1px]' : ''}`}>
                {propertyImages.slice(1, 4).map((item, index) => {
                  return (
                    <div key={item.id} className={`h-auto ${renderGridItemClass(index + 2, length)}`}>
                      <div className={`heroImage h-full ${renderRadiusClass(index + 2, length)}`}>
                        <div
                          style={{
                            backgroundImage: `url(${item.url}?w=1080)`,
                          }}
                          className={'child cursor-pointer'}
                          onClick={() => openGallery(index + 1)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className={'hidden md:flex flex-col flex-auto h-full gap-[1px]'}>
                <div className={'h-full md:h-[210px] lg:h-[287px] xl:h-[289px] 2xl:h-[313px]'}>
                  <div className={'heroImage h-full rounded-tr-[24px]'}>
                    <div
                      style={{
                        backgroundImage: `url(${propertyImages[1].url}?w=1080)`,
                      }}
                      className={'child cursor-pointer'}
                      onClick={() => openGallery(1)}
                    />
                  </div>
                </div>
                <div className={'flex flex-row flex-auto gap-[1px]'}>
                  <div className={'basis-1/2 h-full'}>
                    <div className={'heroImage h-full'}>
                      <div
                        style={{
                          backgroundImage: `url(${propertyImages[2].url}?w=1080)`,
                        }}
                        className={'child cursor-pointer'}
                        onClick={() => openGallery(2)}
                      />
                    </div>
                  </div>
                  <div
                    className={'basis-1/2 relative'}
                    onMouseEnter={() => handleEnterAndLeaveLastImage('enter')}
                    onMouseLeave={() => handleEnterAndLeaveLastImage('leave')}
                  >
                    <div className={'heroImage h-full rounded-br-[24px]'}>
                      <div
                        style={{
                          backgroundImage: `url(${propertyImages[3].url}?w=1080)`,
                        }}
                        className={'child cursor-pointer'}
                        onClick={() => openGallery(3)}
                      />
                    </div>

                    {length > 4 && (
                      <div className={'absolute top-[50%] right-[33%]'}>
                        <button
                          ref={galleryBtn}
                          className={'font-inter-500 text-16-20 text-white gap-[4px] hidden'}
                          onClick={() => openGallery(0)}
                        >
                          <span>Gallery</span>
                          <span>
                            <Image src={ic_arrow_left_lg} alt={'ic_arrow_left_lg'} />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={'md:hidden relative '}>
        <Slider
          // lazyLoad='progressive'
          dots={true}
          infinite={true}
          nextArrow={<></>}
          prevArrow={<></>}
          speed={500}
          className={'px-[16px] h-[240px]'}
          dotsClass={'custom-dots-slider'}
          afterChange={(nextSlide: number) => setCurrentSlide(nextSlide)}
          customPaging={(idx: number) => {
            const isActived = currentSlide === idx
            if (idx > 4 && !isActived && idx !== currentSlide + 1) return <></>
            if (currentSlide >= 4 && currentSlide < length - 1 && idx >= 3 && idx <= currentSlide - 1) return <></>
            if (currentSlide === length - 1 && idx > 3 && idx < currentSlide - 1) return <></>
            return <div className={`dot-item ${isActived ? 'actived' : ''}`} id={`${idx}`} />
          }}
        >
          {(propertyImages || []).map((item: any, index) => {
            return (
              <div key={item.id} className="w-full h-[240px] " onClick={() => openGallery(index)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url + '?w=480'}
                  alt={item.caption}
                  className={'object-cover h-full w-full rounded-[16px]'}
                />
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}

export default HeroImages
