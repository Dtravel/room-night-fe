import React, { useState } from 'react'
import { NextPage } from 'next'
import IconButton from '@mui/material/IconButton'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import ic_arrow_left_small from '@dtravel/assets/icons/ic_arrow_left_small.svg'
import Image from 'next/image'
interface Props {
  numberInRow?: number
  total: number
  children?: React.ReactNode

}

const ReviewScrollHorizontal: NextPage<Props> = ({ total, numberInRow, children }) => {
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024
  const [isLeftActive, setLeftActive] = useState<boolean>(false)
  const [isRightActive, setRightActive] = useState<boolean>(true)
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const numberItemInRow = numberInRow || 3

  const checkScroll = () => {
    if (typeof window === 'undefined') return
    const el = document.getElementById('scroll_group')
    if (el) {
      if (el.scrollLeft <= 0) {
        if (isLeftActive) setLeftActive(false)
        if (!isRightActive) setRightActive(true)
      } else if (el.scrollLeft + el.offsetWidth + 1 >= el.scrollWidth) {
        if (!isLeftActive) setLeftActive(true)
        if (isRightActive) setRightActive(false)
      } else {
        if (!isLeftActive) setLeftActive(true)
        if (!isRightActive) setRightActive(true)
      }
    }
  }
  const handleScrollLeft = () => {
    if (isDisabled) return;
    const el = document.getElementById('scroll_group')
    if (el) {
      setDisabled(true)
      const value = el.getBoundingClientRect()?.width + 16
      el.scrollLeft -= value
      checkScroll()
      setTimeout(() => {
        setDisabled(false)
      }, 500);
    }
  }
  const handleScrollRight = () => {
    if (isDisabled) return;
    const el = document.getElementById('scroll_group')
    if (el) {
      setDisabled(true)
      const value = el.getBoundingClientRect()?.width + 16
      el.scrollLeft += value
      checkScroll()
      setTimeout(() => {
        setDisabled(false)
      }, 500);
    }
  }

  return (
    <>
      {(total > 0) && (
        <div className={'w-full relative'}>
          {total > numberItemInRow && !isMobile && (
            <>
              {isLeftActive && (
                <IconButton
                  sx={{
                    '&.MuiIconButton-root': {
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      left: -20,
                      zIndex: 1,
                      border: '1px solid #E3E3DE',
                      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                      backgroundColor: '#FFF',
                      width: 48,
                      height: 48
                    },
                  }}
                  onClick={handleScrollLeft}
                >
                  <Image src={ic_arrow_left_small} width={24} height={24} alt="" />
                </IconButton>
              )}

              {isRightActive && (
                <IconButton
                  sx={{
                    '&.MuiIconButton-root': {
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      right: -20,
                      zIndex: 1,
                      border: '1px solid #E3E3DE',
                      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                      backgroundColor: '#FFF',
                      width: 48,
                      height: 48
                    },
                  }}
                  onClick={handleScrollRight}
                >
                  <Image src={ic_arrow_left_small} width={24} height={24} alt="" className='rotate-180' />
                </IconButton>
              )}
            </>
          )}

          <div
            id="scroll_group"
            className={'w-[calc(100%_+_32px)] mx-[-16px] px-4 md:w-[calc(100%_+_48px)] md:mx-[-24px] md:px-6 lg:mx-0 lg:px-0 lg:w-full flex gap-[16px] overflow-x-auto hidden-scroll-bar'}
            onScroll={() => checkScroll()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewScrollHorizontal
