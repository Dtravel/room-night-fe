import { Popover } from '@mui/material'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ic_arrow_down from '@dtravel/assets/icons/ic_arrow_down.svg'
import MerchantInput from './MerchantInput'
import { isNumber } from '@dtravel/utils/common'
import { FilterProps } from '../merchant-map-view/MerchantMapView'
import BasicSwipeDrawer from '../ui/BasicSwipeDrawer'
import { numberWithCommas } from '@dtravel/helpers/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { useRouter } from 'next/router'

interface Props {
  isMap?: boolean
}
interface ValueFilterProps {
  min?: string | number
  max?: string | number
  bed?: string
  bath?: string
}

const TYPES = { PRICE: 'price', BEDS: 'beds', BATHS: 'baths' }
const PRICE_DEFAULT = { min: '0', max: '9999' }
const VALUE_DEFAULT = 'any'

let typeFilter: string = ''

const MerchantListFilter: NextPage<Props> = ({ isMap }) => {
  const router = useRouter()
  const { color } = useTheme()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const { rate, isRateLoadDone } = useAppSelector((state) => state.property)
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const getMaxPriceDefault = () => {
    return Math.round(Number(PRICE_DEFAULT.max) / Number(rate?.rate))
  }
  const getSymbolCurrency = () => {
    return rate?.symbol
  }
  const FILTER_DEFAULT_VALUE: ValueFilterProps = {
    min: PRICE_DEFAULT.min,
    max: getMaxPriceDefault(),
    bed: VALUE_DEFAULT,
    bath: VALUE_DEFAULT,
  }

  const [min, setMin] = useState<string>(PRICE_DEFAULT.min)
  const [max, setMax] = useState<string | number>(getMaxPriceDefault())
  const [bed, setBed] = useState<string>(VALUE_DEFAULT)
  const [bath, setBath] = useState<string>(VALUE_DEFAULT)
  const [filterValue, setFilterValue] = useState<any>(FILTER_DEFAULT_VALUE)
  const [isOpen, setOpen] = useState<boolean>(false) // show filter in mobile

  const clearFilter = (e: any) => {
    if (typeFilter === TYPES.PRICE) {
      setMin(PRICE_DEFAULT.min)
      setMax(getMaxPriceDefault())
      handleUpdateFilterValue({ min: PRICE_DEFAULT.min, max: getMaxPriceDefault() })
    }
    if (typeFilter === TYPES.BEDS) {
      setBed(VALUE_DEFAULT)
      handleUpdateFilterValue({ bed: VALUE_DEFAULT })
    }
    if (typeFilter === TYPES.BATHS) {
      setBath(VALUE_DEFAULT)
      handleUpdateFilterValue({ bath: VALUE_DEFAULT })
    }
    e.preventDefault()
  }

  const handleOpenFilter = (event: any, type: string) => {
    typeFilter = type
    if (isMobile) setOpen(true)
    else setAnchorEl(event?.currentTarget)
    event?.preventDefault()
  }

  const handleClose = () => {
    typeFilter = ''
    setAnchorEl(null)
  }
  const handleUpdateFilterValue = (newFilter?: ValueFilterProps) => {
    const newFilterData: ValueFilterProps = {
      min: min || PRICE_DEFAULT.min,
      max: max || getMaxPriceDefault(),
      bed,
      bath,
      ...newFilter,
    }
    setFilterValue(newFilterData)
    if (!min) setMin(PRICE_DEFAULT.min)
    if (!max) setMax(getMaxPriceDefault())
    handleApplyFilter(newFilterData)
  }
  const clearToBeforeFilterValue = () => {
    setMin(filterValue.min)
    setMax(filterValue.max)
    setBed(filterValue.bed)
    setBath(filterValue.bath)
  }
  const handleApplyFilter = (newFilter: ValueFilterProps) => {
    let paramsFilter: FilterProps = {}
    const newMin = newFilter?.min
    const newMax = newFilter?.max
    const newBed = newFilter?.bed
    const newBath = newFilter?.bath
    if (newMin) paramsFilter = { ...paramsFilter, minPrice: newMin }
    if (newMax) paramsFilter = { ...paramsFilter, maxPrice: newMax }
    if (newBed && newBed !== VALUE_DEFAULT) paramsFilter = { ...paramsFilter, beds: Number(newBed.charAt(0)) }
    if (newBath && newBath !== VALUE_DEFAULT) paramsFilter = { ...paramsFilter, bathrooms: Number(newBath.charAt(0)) }
    const queryObj: any = { ...router.query }
    const keys: Array<keyof FilterProps> = ['minPrice', 'maxPrice', 'beds', 'bathrooms']
    keys.map((key) => {
      if (paramsFilter[key]) {
        if (key === 'maxPrice') {
          queryObj[key] = Math.round(Number(paramsFilter[key]))
        } else {
          queryObj[key] = paramsFilter[key]
        }
      } else {
        delete queryObj[key]
      }
    })
    if (String(queryObj.minPrice) === PRICE_DEFAULT.min) {
      delete queryObj.minPrice
    }
    if (String(queryObj.maxPrice) === String(getMaxPriceDefault())) {
      delete queryObj.maxPrice
    }
    router.push(
      {
        pathname: router.pathname,
        query: queryObj,
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  useEffect(() => {
    const { minPrice, maxPrice, beds, bathrooms } = router.query
    if (minPrice) {
      setMin(minPrice.toString())
    } else {
      setMin(PRICE_DEFAULT.min)
    }
    if (maxPrice) {
      setMax(maxPrice.toString())
    } else {
      setMax(getMaxPriceDefault())
    }
    if (beds) {
      setBed(beds.toString())
    } else {
      setBed(VALUE_DEFAULT)
    }
    if (bathrooms) {
      setBath(bathrooms.toString())
    } else {
      setBath(VALUE_DEFAULT)
    }
    setFilterValue({
      min: minPrice ? minPrice.toString() : PRICE_DEFAULT.min,
      max: maxPrice ? maxPrice.toString() : getMaxPriceDefault(),
      bed: beds ? beds.toString() : VALUE_DEFAULT,
      bath: bathrooms ? bathrooms.toString() : VALUE_DEFAULT,
    })
    // eslint-disable-next-line
  }, [router.query, rate?.key])

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const renderArrow = () => {
    return <Image src={ic_arrow_down} alt="" width={20} height={20} className="" />
  }
  const renderSelectItem = (value: string, typeF: string, isFull?: boolean) => {
    const isActived = (typeF === TYPES.BEDS && bed === value) || (typeF === TYPES.BATHS && bath === value)
    return (
      <div
        className={`
          ${isFull ? 'w-full' : 'w-1/4 md:w-[68px]'}
          md:min-w-[68px] h-[68px] flex items-center justify-center mx-[4px] capitalize
          hover:border-[2px] hover:border-neutral-8 rounded-[16px] cursor-pointer
          ${isActived ? 'border-[2px] border-neutral-8' : 'border-[1px] border-neutral-3'}
        `}
        onClick={(e: any) => {
          if (typeF === TYPES.BEDS) setBed(value)
          if (typeF === TYPES.BATHS) setBath(value)
          e.preventDefault()
        }}
        role="presentation"
      >
        {value}
      </div>
    )
  }

  const checkChanged = (title?: string) => {
    const typeTitle = title || typeFilter
    return (
      (typeTitle === TYPES.PRICE &&
        (filterValue.min !== PRICE_DEFAULT.min || filterValue.max !== getMaxPriceDefault())) ||
      (typeTitle === TYPES.BEDS && filterValue.bed !== VALUE_DEFAULT) ||
      (typeTitle === TYPES.BATHS && filterValue.bath !== VALUE_DEFAULT)
    )
  }

  const renderFilterItem = (title: string) => {
    let titleFilter = ''
    if (title === TYPES.PRICE) {
      titleFilter =
        filterValue.min !== PRICE_DEFAULT.min || filterValue.max !== getMaxPriceDefault()
          ? `${getSymbolCurrency()}${Number(filterValue.min) > getMaxPriceDefault()
            ? `${numberWithCommas(getMaxPriceDefault())}+`
            : numberWithCommas(filterValue.min)
          }-${getSymbolCurrency()}${Number(filterValue.max) > getMaxPriceDefault()
            ? `${numberWithCommas(getMaxPriceDefault())}+`
            : numberWithCommas(filterValue.max)
          }`
          : title
    }
    if (title === TYPES.BEDS) titleFilter = filterValue.bed !== VALUE_DEFAULT ? ` ${filterValue.bed} ${title}` : title
    if (title === TYPES.BATHS)
      titleFilter = filterValue.bath !== VALUE_DEFAULT ? ` ${filterValue.bath} ${title}` : title
    const isActived = (open && typeFilter === title) || checkChanged(title)
    return (
      <div
        onClick={(e: any) => handleOpenFilter(e, title)}
        role="presentation"
        className={`
          flex item-center w-1/3 md:w-auto justify-between md:justify-center text-14-18 font-inter-500 bg-white
          rounded-[12px] px-[16px] py-[13px] cursor-pointer capitalize border
          ${isMap
            ? `mx-[4px] ${isActived ? 'border-neutral-8 text-neutral-900' : 'border-white text-neutral-600'}`
            : `mx-[4px] ${isActived ? 'border-neutral-8 text-neutral-900' : 'border-neutral-3 text-neutral-600'}`
          }
         
        `}
        id={title}
        style={{ boxShadow: isMap ? '0px 0.5px 0px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.04)' : 'none' }}
      >
        <span className="flex items-center justify-center">
          {title === TYPES.PRICE ? (isRateLoadDone ? titleFilter : 'Price') : titleFilter}
        </span>
        &nbsp;{renderArrow()}
      </div>
    )
  }

  const renderPriceRange = () => {
    return (
      <div className="flex justify-between">
        <MerchantInput
          label={'Minimum'}
          value={`${getSymbolCurrency()}${numberWithCommas(min)}`}
          onChange={(e) => {
            const newValue = e?.target?.value?.trim()
            const newMin = newValue.split(',').join('')
            const minValue = newMin.replace(getSymbolCurrency(), '')
            if ((minValue !== '' && isNumber(minValue)) || minValue === '') setMin(minValue)
          }}
        />
        <div className="w-[16px] h-full" />
        <MerchantInput
          label={'Maximum'}
          value={`${getSymbolCurrency()}${numberWithCommas(max)}`}
          onChange={(e) => {
            const newValue = e?.target?.value?.trim()
            const newMax = newValue.split(',').join('')
            const maxValue = newMax.replace(getSymbolCurrency(), '')
            if ((maxValue !== '' && isNumber(maxValue)) || maxValue === '') setMax(maxValue)
          }}
        />
      </div>
    )
  }
  const renderBeds = () => {
    return (
      <>
        <div className="w-[calc(100%_+_8px)] mx-[-4px] flex justify-between">
          {renderSelectItem('any', TYPES.BEDS)}
          {renderSelectItem('1+', TYPES.BEDS)}
          {renderSelectItem('2+', TYPES.BEDS)}
          {renderSelectItem('3+', TYPES.BEDS)}
          {renderSelectItem('4+', TYPES.BEDS)}
        </div>
      </>
    )
  }
  const renderBaths = () => {
    return (
      <>
        <div className="w-[calc(100%_+_8px)] mx-[-4px] flex justify-between">
          {renderSelectItem('any', TYPES.BATHS)}
          {renderSelectItem('1+', TYPES.BATHS)}
          {renderSelectItem('2+', TYPES.BATHS)}
          {renderSelectItem('3+', TYPES.BATHS)}
          {renderSelectItem('4+', TYPES.BATHS)}
        </div>
      </>
    )
  }
  const renderContentFilter = () => {
    let content = null
    if (typeFilter === TYPES.PRICE) content = renderPriceRange()
    if (typeFilter === TYPES.BEDS) content = renderBeds()
    if (typeFilter === TYPES.BATHS) content = renderBaths()
    return content
  }
  const renderContent = () => {
    const isChanged = checkChanged()
    return (
      <div className="w-[372px] flex flex-col">
        <div className="w-full flex justify-between mb-[16px] font-inter-500 text-16-20">
          {typeFilter && (
            <span className={`text-neutral-900`}>
              {typeFilter === TYPES.PRICE ? 'Set nightly price range' : `Select ${typeFilter}`}
            </span>
          )}
        </div>
        <div className="flex justify-between">{renderContentFilter()}</div>
        <div className="flex justify-between items-center mt-[24px]">
          <span
            className={`font-inter-500 text-14-18 cursor-pointer text-neutral-900 hover:opacity-100 ${isChanged ? 'opacity-100' : 'opacity-50'
              }`}
            onClick={clearFilter}
            role="presentation"
          >
            Clear
          </span>
          <span
            className="font-inter-500 text-14-18 cursor-pointer bg-neutral-900 text-white px-[16px] py-[13px] rounded-[12px]"
            onClick={(e: any) => {
              handleClose()
              handleUpdateFilterValue()
              e.preventDefault()
            }}
            role="presentation"
            style={color ? { backgroundColor: color } : {}}
          >
            Apply
          </span>
        </div>
      </div>
    )
  }
  const renderContentMobile = () => {
    return (
      <>
        <div className="flex justify-between mb-[24px] mt-[8px]">{renderContentFilter()}</div>

        <div
          className="flex items-center pt-[12px] bg-white sticky bottom-0 w-[calc(100%_+_32px)] mx-[-16px] px-[16px]"
          style={{ boxShadow: '0px -1px 0px #E9E9E4' }}
        >
          <div
            className="w-1/3 rounded-[16px] px-[24px] py-[20px] border border-neutral-300 text-neutral-900 cursor-pointer flex items-center justify-center font-inter-500 text-16-20"
            onClick={clearFilter}
          >
            Clear
          </div>
          <div
            className="rounded-[16px] w-2/3 py-[20px] ml-[12px] flex items-center justify-center bg-neutral-8 text-white cursor-pointer font-inter-500 text-16-20"
            onClick={(e: any) => {
              setOpen(false)
              handleUpdateFilterValue()
              e.preventDefault()
            }}
            style={color ? { backgroundColor: color } : {}}
          >
            Apply
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex w-[calc(100%_+_8px)] mx-[-4px] md:w-auto">
        {renderFilterItem(TYPES.PRICE)}
        {renderFilterItem(TYPES.BEDS)}
        {renderFilterItem(TYPES.BATHS)}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          handleClose()
          clearToBeforeFilterValue()
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{
          '& .MuiPaper-root': {
            width: 'auto',
            boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            marginTop: '8px',
          },
        }}
      >
        {renderContent()}
      </Popover>
      <BasicSwipeDrawer
        isOpen={isOpen}
        onClose={() => {
          setOpen(false)
          clearToBeforeFilterValue()
        }}
        title={typeFilter === TYPES.PRICE ? 'Set nightly price range' : `Select ${typeFilter}`}
        titleAlign={'center'}
      >
        {renderContentMobile()}
      </BasicSwipeDrawer>
    </>
  )
}

export default MerchantListFilter
