/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import DtravelPrice from '@dtravel/components/common/DtravelPrice'
import { useRouter } from 'next/router'
import MerchantSlider from './MerchantSlider'
import { convertCurrencyAmount, isEmpty, showLocation } from '@dtravel/utils/common'
import { setHoverProperty } from '@dtravel/redux/slices/property'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@dtravel/redux/hooks'
import { InView } from 'react-intersection-observer'
import { isCryptoCurrency } from '@dtravel/helpers/utils/common'
import queryString from 'query-string'
import Image from 'next/image'

interface Props {
  isMap?: boolean
  isMapMobile?: boolean
  isTablet?: boolean
  isLandingPage?: boolean
  item?: any
  handleLoadMore?: any
  lastId?: string
  isMobile?: boolean
  isLandingPageSpecial?: boolean
  hiddenPrice?: boolean
  isMultiple?: boolean // has scroll horizontal on mobile property management page
  isShowBasePrice?: boolean
}

const MerchantListItem: NextPage<Props> = (props) => {
  const {
    isMap,
    isMapMobile,
    item,
    isTablet,
    isLandingPage,
    lastId,
    isMobile,
    handleLoadMore,
    isLandingPageSpecial,
    hiddenPrice,
    isMultiple,
    isShowBasePrice,
  } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const { hostId } = router.query
  const { propertyHover, userID, rate, rates } = useAppSelector((state) => state.property)
  const hostID = userID || hostId
  const currencyDisplay = rate?.key || item?.propertyPrice?.currency
  const propertyCurrency = item?.propertyPrice?.currency
  const isCrypto = isCryptoCurrency(currencyDisplay)
  const basePricePerNight = item?.priceInfo?.basePricePerNight
  const basePriceOrAvgPrice =
    isShowBasePrice && typeof basePricePerNight !== 'undefined'
      ? basePricePerNight
      : item?.propertyPrice?.avgPrice || item?.propertyPrice?.basePrice
  const basePriceConverted = convertCurrencyAmount(basePriceOrAvgPrice, propertyCurrency, currencyDisplay, rates)
  const basePriceConvertedDisplay = isCrypto
    ? Number(basePriceConverted || 0).toFixed(2)
    : Math.round(Number(basePriceConverted || 0))

  const handleMouseOver = () => {
    if (propertyHover !== item.id) dispatch(setHoverProperty(item.id))
  }
  const handleMouseLeave = () => {
    if (propertyHover === item.id) dispatch(setHoverProperty(null))
  }
  const gotoDetail = () => {
    if (typeof window !== 'undefined' && hostID) {
      const { check_in, check_out, adults, children, infants, pets } = router.query
      const paramsSearch = queryString.stringify({ check_in, check_out, adults, children, infants, pets })
      // return
      if (isLandingPage) {
        window.open(
          hostId
            ? `/${hostID}/property/${item?.propertyPrice?.propertyId}`
            : `/property/${item?.propertyPrice?.propertyId}`,
          '_blank'
        )
      } else {
        window.open(
          hostId
            ? `/${hostID}/property/${item?.propertyPrice?.propertyId}${paramsSearch ? `?${paramsSearch}` : ''}`
            : `/property/${item?.propertyPrice?.propertyId}${paramsSearch ? `?${paramsSearch}` : ''}`,
          '_blank'
        )
      }
    }
  }
  const renderAddress = () => {
    if (item) {
      const { city, state, country } = item?.address as any
      if (city || state || country) {
        return `${item?.propertyTypeName ? `${item?.propertyTypeName} in ` : ''}${showLocation(city, state, country) || ''}`
      }
      return '-'
    }
    return ''
  }

  const getClassBox = () => {
    if (isTablet) return 'flex w-[50vw] min-w-[50vw] px-[6px] h-full'
    if (isMapMobile) return 'flex'
    if (isMap) return 'w-[324px] md:w-full bg-white rounded-xl'
    if (isLandingPage) return 'w-full md:w-1/4 md:px-[8px] py-[8px]'
    if (isLandingPageSpecial)
      return `${isMultiple ? 'w-[calc(100%_-_16px)] min-w-[calc(100%_-_16px)]' : 'w-full min-w-[100%]'
        } md:w-[calc(100%_/_3_-_10.67px)] md:min-w-[calc(100%_/_3_-_10.67px)]`
    return 'w-full md:w-1/2 md:px-3 py-[8px] md:py-[18px]'
  }
  const getClassImgBox = () => {
    let result = 'cursor-pointer object-cover'
    if (isTablet) result += ' w-[126px] h-[126px] rounded-tl-[16px] rounded-bl-[16px]'
    else if (isMapMobile) result += ' w-[126px] h-[126px] rounded-tl-[16px] rounded-bl-[16px]'
    else if (isMap) result += ' w-full rounded-t-xl h-[160px]'
    else if (isLandingPage)
      result += ' w-full rounded-xl h-[358px] sm:h-[358px] md:h-[185px] lg:h-[354px] xl:h-[408px] 2xl:h-[408px]'
    else if (isLandingPageSpecial)
      result += ' w-full rounded-xl h-[358px] sm:h-[358px] md:h-[224px] lg:h-[298px] xl:h-[368px] 2xl:h-[368px]'
    else result += ' w-full rounded-xl h-[337px] sm:h-[337px] md:h-[256px] lg:h-[256px] xl:h-[328px] 2xl:h-[328px]'
    return result
  }
  const bedrooms = item?.bedrooms
  const beds = item?.beds
  const bathrooms = item?.bathrooms
  const isHorizontalMap = isTablet || isMapMobile
  const showBedInfo = () => {
    let result: string[] = []
    if (!isEmpty(bedrooms) && Number(bedrooms) > 0) result.push(`${bedrooms} bedroom${Number(bedrooms) > 1 ? 's' : ''}`)
    if (!isEmpty(beds) && Number(beds) > 0) result.push(`${beds} bed${Number(beds) > 1 ? 's' : ''}`)
    if (!isEmpty(bathrooms) && Number(bathrooms) > 0) result.push(`${bathrooms} bath${Number(bathrooms) > 1 ? 's' : ''}`)
    if (!isEmpty(result)) return result.join(' • ')
    return ''
  }
  return (
    <InView
      className={`${getClassBox()}`}
      style={{ boxShadow: isMap ? '0px 2px 8px rgba(0, 0, 0, 0.16)' : 'none' }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      id={`merchant_item_${item.id}`}
      as="div"
      onChange={(inView) => {
        if (lastId && inView && handleLoadMore && lastId === item.id) handleLoadMore()
      }}
    >
      <div className={`${getClassImgBox()}`} onClick={gotoDetail}>
        {!isEmpty(item?.propertyImages) ? (
          <MerchantSlider
            images={item?.propertyImages || []}
            isMap={isMap}
            isMapMobile={isMapMobile}
            isTablet={isTablet}
            isLandingPage={isLandingPage}
            isMobileDevice={isMobile}
            isLandingPageSpecial={isLandingPageSpecial}
          />
        ) : (
          <Image
            src={item.thumbnail || 'https://static.dtravel.com/images/404/default_image.jpg'}
            alt=""
            width={408}
            height={408}
            className={'object-cover w-full h-full rounded-xl'}
          />
        )}
      </div>

      <div
        className={`
        ${isMapMobile ? 'p-4' : isMap ? 'px-4 pb-4' : ''}
        ${isHorizontalMap ? 'w-full bg-white rounded-tr-[16px] rounded-br-[16px] p-[16px] h-[126px] min-h-[126px]' : ''}
        `}
      >
        <div
          className={`w-full flex justify-between items-center font-inter-500 text-neutral-800 ${isHorizontalMap ? 'mb-[4px] text-12-16' : 'mb-2 mt-3 text-14-18'
            }`}
        >
          <p
            className={`line-clamp-1 tracking-[0.04em] text-ellipsis font-inter-500 text-neutral-800 ${isHorizontalMap ? '' : 'pr-[16px]'
              }`}
            title={renderAddress()}
          >
            {renderAddress()}
          </p>
          {!isHorizontalMap && !hiddenPrice && (
            <span className="">
              <DtravelPrice price={Number(basePriceConvertedDisplay)} currency={currencyDisplay} isRounded />
            </span>
          )}
        </div>
        <p
          className={`cursor-pointer mb-[4px] font-inter-400 text-neutral-600 text-ellipsis line-clamp-1 tracking-[0.04em] ${isHorizontalMap ? 'text-12-16' : 'text-14-18'
            }`}
          title={item?.externalName}
          onClick={gotoDetail}
        >
          {item?.externalName}
        </p>
        <div
          className={`text-neutral-600 font-inter-400 flex flex-wrap items-center ${isHorizontalMap ? 'text-12-16 mb-[18px]' : 'text-14-18'
            }`}
        >
          {showBedInfo()}
        </div>
        {isHorizontalMap && !hiddenPrice && (
          <span className="text-neutral-8 text-12-16 tracking-[0.04em] font-inter-500">
            <DtravelPrice price={Number(basePriceConvertedDisplay)} currency={currencyDisplay} isRounded />
          </span>
        )}
      </div>
    </InView>
  )
}

export default MerchantListItem
