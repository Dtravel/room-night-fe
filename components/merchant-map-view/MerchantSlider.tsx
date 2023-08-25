/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import Slider from 'react-slick'
import Image from 'next/image'
import ic_arrow_right from '@dtravel/assets/icons/ic_arrow.svg'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
interface Props {
  images: any[]
  isMap?: boolean
  isMapMobile?: boolean
  isTablet?: boolean
  isLandingPage?: boolean
  isMobileDevice?: boolean
  isLandingPageSpecial?: boolean
}
const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} rounded-full`}
      style={{ ...style, display: 'flex', background: 'white' }}
      onClick={(e) => {
        onClick(e)
        e.stopPropagation()
      }}
    >
      <Image src={ic_arrow_right} alt="" width={24} height={24} />
    </div>
  )
}

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} rounded-full`}
      style={{ ...style, display: 'flex', background: 'white' }}
      onClick={(e) => {
        onClick(e)
        e.stopPropagation()
      }}
    >
      <Image src={ic_arrow_right} alt="" width={24} height={24} style={{ transform: 'rotate(180deg)' }} />
    </div>
  )
}

const MerchantSlider: NextPage<Props> = ({
  images,
  isMap,
  isMapMobile,
  isTablet,
  isLandingPage,
  isMobileDevice,
  isLandingPageSpecial,
}) => {
  const windowDimensions = useWindowDimensions()
  const isMobile = isMobileDevice || windowDimensions.width < 1024
  const settings = {
    dots: true,
    // autoplay: true,
    // autoplaySpeed: 3000,
    arrows: isMapMobile || isMobile ? false : true,
    // adaptiveHeight: true,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  const getClassSlideBox = () => {
    let result = 'merchant-slider-custom'
    if (isTablet) result += ' merchant-slider-map-tablet'
    else if (isMapMobile) result += ' merchant-slider-map-mobile'
    else if (isMap) result += ' merchant-slider-map'
    else if (isLandingPage) result += ' merchant-slider-landing-page'
    else if (isLandingPageSpecial) result += ' merchant-slider-landing-special-page'
    else result += ''
    return result
  }
  const getClassImgBox = () => {
    let result = 'cursor-pointer object-cover'
    if (isTablet) result += ' w-[126px] h-[126px]'
    else if (isMapMobile) result += ' w-[126px] h-[126px]'
    else if (isMap) result += ' w-full rounded-t-xl h-[160px]'
    else if (isLandingPage)
      result += ' w-full rounded-xl h-[358px] sm:h-[358px] md:h-[185px] lg:h-[354px] xl:h-[408px] 2xl:h-[408px]'
    else if (isLandingPageSpecial)
      result += ' w-full rounded-xl h-[358px] sm:h-[358px] md:h-[224px] lg:h-[298px] xl:h-[368px] 2xl:h-[368px]'
    else result += ' w-full rounded-xl h-[337px] sm:h-[337px] md:h-[256px] lg:h-[256px] xl:h-[328px] 2xl:h-[328px]'
    return result
  }

  const loadImage = ({ src }: any) => {
    return `${src}?w=${isMobileDevice ? '480' : '640'}`
  }

  return (
    <Slider {...settings} className={`${getClassSlideBox()}`}>
      {images
        .filter((it: any, idx: number) => idx < 5)
        .map((el: any) => {
          return (
            <div key={el.id} className={`${getClassImgBox()}`}>
              <Image
                loader={loadImage}
                src={`${el?.url}`}
                // src={`${el?.url}_${isMobileDevice ? '480' : '640'}`}
                alt={el.caption || ''}
                width={408}
                height={408}
                className={'object-cover w-full h-full rounded-xl'}
              />
              {/*<img*/}
              {/*  src={`${el?.url}_${isMobileDevice ? '480' : '640'}`}*/}
              {/*  // src={`${el?.url}_${isMobileDevice ? '320' : '640'}`}*/}
              {/*  width={408}*/}
              {/*  height={408}*/}
              {/*  className={'object-cover w-full h-full rounded-xl'}*/}
              {/*  onError={(e: any) => ((e.target.onerror = null), (e.target.src = el?.url))}*/}
              {/*  alt=""*/}
              {/*/>*/}
            </div>
          )
        })}
    </Slider>
  )
}

export default MerchantSlider
