/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Map, { MapSourceDataEvent, Marker, Popup } from 'react-map-gl'
import MerchantListItem from '@dtravel/components/merchant-map-view/MerchantListItem'
import { convertCurrencyAmount, isEmpty } from '@dtravel/utils/common'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import DtravelPrice from '../common/DtravelPrice'
import { useAppSelector } from '@dtravel/redux/hooks'
import { isCryptoCurrency } from '@dtravel/helpers/utils/common'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  merchantData: any[]
  hiddenMarker?: boolean
  isShowBasePrice?: boolean
}

interface MarkerPriceProps {
  item: any
  isShowBasePrice?: boolean
}

export const MarkerPrice = ({ item, isShowBasePrice }: MarkerPriceProps) => {
  const { rate, rates } = useAppSelector((state) => state.property)
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
  return <DtravelPrice price={Number(basePriceConvertedDisplay)} currency={currencyDisplay} isRounded />
}

const MapsBoxMerchantV2 = ({ merchantData, hiddenMarker, isShowBasePrice }: Props) => {
  const { propertyHover, showCollapseMobile } = useAppSelector((state) => state.property)
  const { color } = useTheme()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024
  const mapRef: any = React.useRef(null)
  const [itemSelected, setItemSelected] = useState<any>(null)
  const [hoverMarker, setHoverMarker] = useState<any>(null)
  const [firstLoaded, setFirstLoaded] = useState<boolean>(false)

  const handleClose = () => {
    setItemSelected(null)
  }

  const getLocation = (merchantItem: any) => {
    const result = { lat: merchantItem?.address?.lat, lng: merchantItem?.address?.lng }
    return result
  }
  const applyToArray = (func: any, array: any[]) => func.apply(Math, array)
  useEffect(() => {
    if (showCollapseMobile) setItemSelected(null)
  }, [showCollapseMobile])
  useEffect(() => {
    if (itemSelected) {
      const activedItem = (merchantData || []).find((el: any) => el?.id === itemSelected?.id)
      setItemSelected(activedItem || null)
    }
    // eslint-disable-next-line
  }, [merchantData])
  const handleFitbounds = () => {
    const merchantDataMap = (merchantData || []).filter((el: any) => el?.address?.lng && el?.address?.lat)
    if (mapRef && mapRef?.current && typeof window !== 'undefined') {
      if (!isEmpty(merchantDataMap)) {
        const pointsLong = (merchantDataMap || []).map((el: any) => Number(el?.address?.lng))
        const pointsLat = (merchantDataMap || []).map((el: any) => Number(el?.address?.lat))
        const cornersLongLat = [
          [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
          [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)],
        ]
        if (!isEmpty(cornersLongLat)) {
          ;(mapRef as any)?.current.fitBounds(cornersLongLat, {
            padding: isMobile
              ? { top: 160, bottom: showCollapseMobile ? window?.innerHeight / 2 + 160 : 160, left: 80, right: 80 }
              : { top: 160, bottom: 80, left: 120, right: 120 },
            duration: 1000,
            maxZoom: 15,
          })
        } else {
          ;(mapRef as any)?.current.fitBounds(
            [
              [-180, 0],
              [180, 0],
            ],
            {
              padding: { top: 0, bottom: 0, left: 0, right: 0 },
              duration: 1000,
              maxZoom: 10,
            }
          )
        }
      } else {
        ;(mapRef as any)?.current.fitBounds(
          [
            [-180, 0],
            [180, 0],
          ],
          {
            padding: { top: 0, bottom: 0, left: 0, right: 0 },
            duration: 1000,
            maxZoom: 10,
          }
        )
      }
    }
  }
  useEffect(() => {
    handleFitbounds()
    // eslint-disable-next-line
  }, [merchantData, isMobile, showCollapseMobile, mapRef])

  const getSameMarker = () => {
    const result: Array<any> = []
    const markers = (merchantData || [])
      .filter((el: any) => el?.address?.lng && el?.address?.lat)
      .map((el: any) => {
        return { id: el.id, lat: Number(el?.address?.lat).toFixed(3), lng: Number(el?.address?.lng).toFixed(3) }
      })
    markers.forEach((marker: any) => {
      // get all markers with the same coordinates
      const sameMarkers = markers.filter((m: any) => m?.lat === marker?.lat && m?.lng === marker?.lng)
      // if there is more than one marker with the same coordinates
      if (sameMarkers.length > 1) {
        // get the index of the current marker
        const index = sameMarkers.indexOf(marker)

        // calculate the offset for the current marker
        const offset = 64 * (index - (sameMarkers.length - 1) / 2)
        // set the offset
        result.push({ ...marker, offset: [offset, 0] })
      } else result.push({ ...marker })
    })
    return result
  }
  const mapsBox = () => {
    const sameMarkersInfo = getSameMarker()
    return (
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        initialViewState={{
          // latitude: merchantData[0]?.address?.lat,
          // longitude: merchantData[0]?.address?.lng,
          zoom: 12,
          fitBoundsOptions: { maxZoom: 15 },
        }}
        reuseMaps
        onSourceData={(propsSourceData: MapSourceDataEvent) => {
          if (propsSourceData?.isSourceLoaded && !firstLoaded) {
            // fitbounds with network very slow
            handleFitbounds()
            setFirstLoaded(true)
          }
        }}
        // onClick={() => { }}
      >
        {/* <NavigationControl showCompass={false} /> */}
        {itemSelected && itemSelected?.address?.lat && itemSelected?.address?.lng && (
          <Popup
            // anchor="bottom"
            latitude={Number(getLocation(itemSelected)?.lat)}
            longitude={Number(getLocation(itemSelected)?.lng)}
            // closeOnClick={true}
            onClose={handleClose}
            closeButton={false}
            className="mapboxgl-popup-custom"
          >
            <MerchantListItem isMap item={itemSelected} />
          </Popup>
        )}
        {!isEmpty(merchantData) &&
          !hiddenMarker &&
          merchantData.map((el: any, idx: number) => {
            const isActived = itemSelected?.pmsPropertyId === el?.pmsPropertyId || el.id === propertyHover
            const isHovered = el.id === hoverMarker
            if (!el?.address?.lat || !el?.address?.lng) return null
            const offsetInfo = sameMarkersInfo.find((v: any) => v.id === el.id)
            return (
              <Marker
                key={idx}
                latitude={Number(getLocation(el)?.lat)}
                longitude={Number(getLocation(el)?.lng)}
                style={{ zIndex: isActived || isHovered ? 3 : isMobile ? 1 : 'unset' }}
                offset={offsetInfo?.offset || [0, 0]}
              >
                <span
                  className={`
                  rounded-[100px] px-3 py-[6px] mt-4 cursor-pointer font-inter-500 text-16-20 border
                  ${isActived ? 'bg-neutral-8 text-white border-neutral-8' : 'bg-white text-neutral-8 border-white'}
                  ${!isMobile ? 'hover:bg-neutral-3 hover:text-neutral-7 hover:border-neutral-5' : ''}
                `}
                  style={
                    color && isActived
                      ? hoverMarker === el.id
                        ? {
                            boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.16)',
                            backgroundColor: color,
                            borderColor: color,
                            color: 'white',
                          }
                        : { boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.16)', backgroundColor: color, borderColor: color }
                      : color && hoverMarker === el.id
                      ? {
                          boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.16)',
                          backgroundColor: color,
                          borderColor: color,
                          color: 'white',
                        }
                      : { boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.16)' }
                  }
                  onClick={(e: any) => {
                    setItemSelected(el)
                    e.stopPropagation()
                  }}
                  onMouseEnter={() => {
                    if (hoverMarker !== el.id && !isMobile) setHoverMarker(el.id)
                  }}
                  onMouseLeave={() => {
                    if (hoverMarker === el.id && !isMobile) setHoverMarker(null)
                  }}
                >
                  <MarkerPrice item={el} isShowBasePrice={isShowBasePrice} />
                </span>
              </Marker>
            )
          })}
      </Map>
    )
  }
  return (
    <>
      {mapsBox()}
      {itemSelected && (
        <div
          className="bg-white z-20 fixed bottom-[104px] block md:hidden w-[324px] sm:w-[324px] sm:max-w-[358px] rounded-2xl left-[50%] translate-x-[-50%]"
          style={{ boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.16)' }}
        >
          <MerchantListItem item={itemSelected} isMap />
        </div>
      )}
    </>
  )
}
export default MapsBoxMerchantV2
