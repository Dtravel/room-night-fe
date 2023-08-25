/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import DetailCard from '@dtravel/components/property-detail/DetailCard'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { Contact } from '@dtravel/helpers/interfaces/property'
import { useRouter } from 'next/router'
import { isCryptoCurrency } from '@dtravel/helpers/utils/common'
import DtravelPrice from '@dtravel/components/common/DtravelPrice'
import { getRateCurrency } from '@dtravel/helpers/api/property'
import { setRates } from '@dtravel/redux/slices/property'
import { convertCurrencyAmount } from '@dtravel/utils/common'
import BasicButton from '@dtravel/components/ui/BasicButton'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  pmsPropertyId: string
  contact?: Contact
  properties: any[]
}

const MoreProperties: React.FC<Props> = ({ contact, properties, pmsPropertyId }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { color } = useTheme()
  const { hostId } = router.query
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const { businessInfor, rates } = useAppSelector((state) => state.property)
  const hostName = businessInfor?.contactName || contact?.contactName || businessInfor?.hostName || 'this host'

  useEffect(() => {
    async function fetchRates() {
      try {
        const res: any = await getRateCurrency()
        if (res.data) dispatch(setRates(res.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchRates()
    // eslint-disable-next-line
  }, [])

  const getUrl = (propertyId?: string) => {
    if (propertyId) {
      return hostId ? `/${hostId}/property/${propertyId}` : `/property/${propertyId}`
    }
    return hostId ? `/${hostId}/property` : '/property'
  }

  const gotoDetail = (propertyId: string) => {
    if (typeof window !== 'undefined') {
      window.open(getUrl(propertyId), '_blank')
    }
  }

  const renderPrice = (item: any) => {
    const currencyDisplay = selectedCurrency.key || item?.propertyPrice?.currency
    const propertyCurrency = item?.propertyPrice?.currency
    const isCrypto = isCryptoCurrency(currencyDisplay)
    const basePriceConverted = convertCurrencyAmount(
      // item?.propertyPrice?.basePrice,
      item?.propertyPrice?.avgPrice || item?.propertyPrice?.basePrice,
      propertyCurrency,
      currencyDisplay,
      rates
    )
    const basePriceConvertedDisplay = isCrypto
      ? Number(basePriceConverted || 0).toFixed(2)
      : Math.round(Number(basePriceConverted || 0))

    return <DtravelPrice price={Number(basePriceConvertedDisplay)} isRounded />
  }

  const renderAddress = (data: any) => {
    if (data) {
      const { city, state, country } = data?.address as any
      if (city || state || country)
        return `${data?.propertyTypeName ? `${data?.propertyTypeName} in ` : ''}${`${city || state || ''}`}${(city || state || '') && country ? ', ' : ''
          }${country || ''}`
      return '-'
    }
    return ''
  }

  const filterProperties = properties.filter((item) => String(item.id) !== String(pmsPropertyId)).slice(0, 3)

  if (Array.isArray(filterProperties) && filterProperties.length === 0) return null

  return (
    <DetailCard title={`More properties from ${hostName}`} hideBorderBot>
      <div
        className={
          'flex gap-[24px] md:gap-[16px] mt-[24px] md:mt-[32px] mr-[-16px] md:overflow-x-hidden overflow-x-auto snap-x snap-mandatory'
        }
      >
        {filterProperties.map((item, index) => {
          const bedrooms = item?.bedrooms
          const beds = item?.beds
          const bathrooms = item?.bathrooms
          const isLastItem = index === filterProperties.length - 1
          return (
            <div
              key={item.id}
              className={`w-[calc(100vw-32px-24px)] min-w-[calc(100vw-32px-24px)] md:w-1/3 md:min-w-0 snap-always snap-start ${isLastItem ? 'pr-[16px] md:pr-0' : ''
                }`}
            >
              <div className={'mb-[16px] rounded-[24px]'}>
                <div>
                  <img
                    src={item.thumbnail ? `${item.thumbnail}?w=480` : 'https://static.dtravel.com/images/404/default_image.jpg'}
                    alt=""
                    className={'rounded-[24px] h-[334px] md:h-[230px] 2xl:h-[260px] w-full object-cover cursor-pointer'}
                    onClick={() => gotoDetail(item.id)}
                  />
                </div>
              </div>
              <p className={'font-inter-500 text-14-18 text-neutral-800 flex justify-between gap-[8px] mb-[4px]'}>
                <span>{renderAddress(item)}</span>
                <span>{renderPrice(item)}</span>
              </p>
              <p className={'font-inter-400 text-14-18 text-neutral-600 line-clamp-2'}>
                <a href={getUrl(item.id)} target={'_blank'} rel="noreferrer">
                  {item.externalName}
                </a>
              </p>
              <p className={'font-inter-400 text-14-18 text-neutral-600 mb-[2px]'}>
                {bedrooms && Number(bedrooms) > 0 && (
                  <span>
                    {bedrooms} {Number(bedrooms) > 1 ? 'bedrooms' : 'bedroom'}
                  </span>
                )}
                {bedrooms &&
                  Number(bedrooms) > 0 &&
                  ((beds && Number(beds) > 0) || (bathrooms && Number(bathrooms) > 0)) && <span>&nbsp;•&nbsp;</span>}
                {beds && Number(beds) > 0 && (
                  <span>
                    {beds} {Number(beds) > 1 ? 'beds' : 'bed'}
                  </span>
                )}
                {beds && Number(beds) > 0 && bathrooms && Number(bathrooms) > 0 && <span>&nbsp;•&nbsp;</span>}
                {bathrooms && Number(bathrooms) > 0 && (
                  <span>
                    {bathrooms} {Number(bathrooms) > 1 ? 'baths' : 'bath'}
                  </span>
                )}
              </p>
            </div>
          )
        })}
      </div>
      <div className={'mt-[32px]'}>
        <BasicButton
          variant={'outlined'}
          size={'xl'}
          clases={'w-full md:w-auto'}
          onClick={() => {
            window.open(getUrl(), '_blank')
          }}
          style={color ? { color } : {}}
        >
          Show all properties
        </BasicButton>
      </div>
    </DetailCard>
  )
}

export default MoreProperties
