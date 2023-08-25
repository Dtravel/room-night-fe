import React, { useEffect, useRef } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import BusinessContact from '@dtravel/components/merchant-map-view/BusinessContact'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import LandingLogo from '@dtravel/components/merchant-landing/LandingLogo'
import { useAppSelector } from '@dtravel/redux/hooks'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  middleContent?: React.ReactNode | string | null
  hasBorderBottom?: boolean
  hideContactAndLogo?: boolean
}

const Header: NextPage<Props> = ({ middleContent, hasBorderBottom, hideContactAndLogo }) => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const isMounted = useMounted()
  const { color } = useTheme()
  const { hostId } = router.query
  const { businessInfor } = useAppSelector((state) => state.property)

  // On scroll, can we add a 1px drop shadow on the top bar at 8% opacity? (Charlie comment for mobile)
  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current as HTMLDivElement
      if (header) {
        if (window.scrollY > 0) {
          header && header.classList.add('drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]')
          header && header.classList.add('md:drop-shadow-none')
        } else {
          header && header.classList.remove('drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]')
          header && header.classList.remove('md:drop-shadow-none')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getUrl = () => {
    if (typeof window === 'undefined') return ''
    return hostId ? `/${hostId}` : `/`
  }

  if (!isMounted) return null

  return (
    <div
      ref={headerRef}
      className={'h-[80px] fixed top-0 px-[24px] flex items-center w-full bg-white z-[100]'}
      style={{
        borderBottom: hasBorderBottom ? 'solid 1px #EBE9E9' : 'none',
      }}
    >
      <div className="w-full h-full flex items-center justify-between">
        {!hideContactAndLogo && (
          <div className="md:flex items-center w-2/3 md:w-1/3 max-w-[50vw] md:max-w-[33vw]">
            <LandingLogo
              url={getUrl()}
              hostLogo={businessInfor?.hostLogo}
              hostName={businessInfor?.hostName}
              contactName={businessInfor?.contactName}
            />
          </div>
        )}

        {middleContent ? middleContent : ''}

        {!hideContactAndLogo && (
          <div className="flex items-center justify-end w-1/3">
            <BusinessContact>
              <button
                className="border border-neutral-300 rounded-[12px] px-[16px] h-[40px] text-14-18 font-inter-500 text-grayscale-900 cursor-pointer hover:bg-neutral-300"
                style={color ? { color } : {}}
              >
                Contact
              </button>
            </BusinessContact>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
