/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react'
import { isEmpty } from '@dtravel/utils/common'
import CircularProgress from '@mui/material/CircularProgress'
import BasicTooltip from '../ui/BasicTooltip'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { useAppSelector } from '@dtravel/redux/hooks'
import DtravelPrice from '../common/DtravelPrice'

interface Props {
  item: any
  addonsAdded: Array<any>
  isAdded: boolean
  isOnly: boolean
  isLoading: boolean
  index: number
  isDisabled: boolean
  manualCurrency: string
  fetchPricesManualBooking: any
}

const BookingAddOnItem: React.FC<Props> = (props) => {
  const { color } = useTheme()
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const { rates } = useAppSelector((state) => state.property)
  const { item, addonsAdded, isAdded, isOnly, isLoading, index, isDisabled, manualCurrency, fetchPricesManualBooking } = props
  const contentRef = useRef<any>(null)
  const [isClamped, setClamped] = useState(false)

  useEffect(() => {
    // Function that should be called on window resize
    function handleResize() {
      if (contentRef && contentRef.current) {
        setClamped(contentRef.current.scrollHeight > contentRef.current.clientHeight)
      }
    }
    handleResize()
    // Add event listener to window resize
    if (window) window.addEventListener('resize', handleResize)

    // Remove event listener on cleanup
    return () => {
      if (window) window.removeEventListener('resize', handleResize)
    }
  }, [])
  const convertPriceDisplay = () => {
    const rateManualCurrency = (rates || []).find((v: any) => v?.key === manualCurrency)
    const rateDisplay = (rates || []).find((v: any) => v?.key === selectedCurrency?.key)
    if (rateManualCurrency && rateDisplay) return (rateManualCurrency?.rate / rateDisplay?.rate) * (item?.price || 0)
    return item?.price
  }
  return (
    <div
      className={`rounded-[12px] border p-[24px] flex flex-col
        ${isOnly ? 'w-full' : 'w-full lg:w-[calc(50%_-_8px)]'}
        ${isAdded ? 'border-grayscale-50 bg-grayscale-50' : 'border-grayscale-300'}
      `}
    >
      <div className="w-full flex justify-between mb-[12px] font-inter-500 text-16-20 text-neutral-800">
        <span>{item?.name}</span>
        <span className="text-right">
          <DtravelPrice price={convertPriceDisplay()} currency={selectedCurrency?.key} />
        </span>
        {/* <span className='text-right'>${item?.price} {item?.applyPer.split('_').join(' ')}</span> */}
      </div>
      <div className="flex items-start font-inter-400 text-14-20 text-neutral-600 mb-[16px] h-full">
        <p className="whitespace-pre-line line-clamp-2" style={{ wordBreak: 'break-word' }} ref={contentRef}>
          {item?.description}
        </p>
        {isClamped && (
          <BasicTooltip placement="top" title={item?.description} arrow>
            <span className="underline mt-[20px]">+more</span>
          </BasicTooltip>
        )}
      </div>
      {!isEmpty(item?.images) && (
        <div className="w-full mb-[24px] flex gap-[12px]">
          {item?.images.map((image: any, i: number) => (
            <img
              src={`${image?.slug}?w=320`}
              alt=""
              className="w-[48px] h-[48px] min-w-[48px] rounded-[8px] object-cover"
              key={i}
            />
          ))}
        </div>
      )}

      <div
        className={`flex items-center justify-center rounded-[16px] border border-neutral-300 min-h-[56px] h-[56px] bg-white
          ${isLoading || isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-[1]'}
        `}
        onClick={() => {
          if (isDisabled) return
          if (isAdded) {
            const newAddonsAdded: Array<string> = addonsAdded
              .filter((v: any) => v?.name !== item?.name)
              .map((v: any) => v.name)
            fetchPricesManualBooking(newAddonsAdded, index + 1)
          } else {
            const newAddonsAdded: Array<string> = addonsAdded.map((v: any) => v.name)
            fetchPricesManualBooking([...newAddonsAdded, item?.name], index + 1)
          }
        }}
      >
        <span className="font-inter-500 text-neutral-900 text-16-20" style={color ? { color } : {}}>
          {isAdded ? 'Remove from reservation' : 'Add to reservation'}
        </span>
        {isLoading && (
          <>
            &nbsp;
            <CircularProgress size={24} style={{ color: '#000' }} />
          </>
        )}
      </div>
    </div>
  )
}

export default BookingAddOnItem
