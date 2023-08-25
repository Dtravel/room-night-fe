import React from 'react'
// import BusinessInformation from '@dtravel/components/merchant-map-view/BusinessInformation'
import BusinessContact from '@dtravel/components/merchant-map-view/BusinessContact'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import LandingLogo from '@dtravel/components/merchant-landing/LandingLogo'
import ic_arrow_right_white from '@dtravel/assets/icons/ic_arrow_right_white.svg'
import Image from 'next/image'
import { isScrolledIntoView } from '@dtravel/helpers/utils/common'
import { useEffect, useState } from 'react'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { useAppSelector } from '@dtravel/redux/hooks'
import { isEmpty } from '@dtravel/utils/common'
interface Props {
  url: string
  onChangeViewMode: () => void
  isEmptyFeatured: boolean
}
const MENU = [
  { name: 'Featured', id: 'featured' },
  { name: 'Reviews', id: 'reviews' },
  { name: 'About', id: 'about' },
  { name: 'List your property', id: 'list_your_property' },
  { name: 'FAQ', id: 'FAQ' },
]
const LandingHeaderSpecial: React.FC<Props> = ({ url, onChangeViewMode, isEmptyFeatured }) => {
  const { hostReviewSpecial, landingSetting } = useAppSelector((state) => state.property)
  const { businessInfor } = useAppSelector((state) => state.property)
  const isMounted = useMounted()
  const { color } = useTheme()
  const isAdeel = landingSetting?.name === 'adeel'
  const [active, setActive] = useState<string>('featured')
  const MENU_SHOW = MENU.filter(
    (el: any) =>
      !(
        (isEmptyFeatured && el.id === 'featured') ||
        (isEmpty(hostReviewSpecial) && el.id === 'reviews') ||
        (isEmpty(landingSetting?.faq) && el.id === 'FAQ') ||
        (isEmpty(landingSetting?.bio) && el.id === 'about') ||
        (isEmpty(landingSetting?.property) && el.id === 'list_your_property')
      )
  )

  const handleScroll = () => {
    for (let el of MENU) {
      const element = document.getElementById(el.id)
      if (element && isScrolledIntoView(element)) {
        setActive(el.id)
        break
      }
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', function () {})
    } // eslint-disable-next-line
  }, [landingSetting])

  const handleClickMenu = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActive(id)
    }
  }
  return (
    <div className="flex justify-between items-center w-full md:max-w-[834px] lg:max-w-[1280px] xl:max-w-[1232px] m-auto px-[16px] md:px-[32px] lg:px-[48px]">
      {isMounted && (
        <div className="flex items-center w-auto md:w-1/4 max-w-[50vw] md:max-w-[33vw]">
          <LandingLogo
            url={url}
            hostLogo={businessInfor?.hostLogo}
            hostName={businessInfor?.hostName}
            contactName={businessInfor?.contactName}
            isSpecial
          />
        </div>
      )}

      <div className="hidden lg:flex items-center w-1/2 lg:justify-center">
        {MENU_SHOW.map((el: any, id: number) => {
          const isActived = active === el.id
          return (
            <span
              className={`${
                isActived ? 'text-grayscale-900' : 'text-grayscale-600'
              } font-inter-500 text-14-18 hover:text-grayscale-900 cursor-pointer mx-[12px]`}
              key={id}
              onClick={() => handleClickMenu(el.id)}
            >
              {el.name === 'Featured' && isAdeel ? 'Locations' : el.name}
            </span>
          )
        })}
        {/* <BusinessInformation>
          <span
            className={`text-neutral-500 font-inter-500 text-14-18 hover:text-grayscale-900 cursor-pointer mx-[12px]`}
          >
            About
          </span>
        </BusinessInformation> */}
      </div>

      <div className="flex justify-end w-1/4">
        <BusinessContact>
          <button
            className={
              'h-[40px] md:flex items-center justify-center text-grayscale-900 font-inter-500 text-14-18 px-[24px] border-[0.5px] border-[#00000026] rounded-[12px] whitespace-nowrap hover:bg-neutral-300'
            }
            style={color ? { color } : {}}
          >
            Contact
          </button>
        </BusinessContact>
        <div
          className="h-[40px] hidden md:flex items-center justify-center text-white font-inter-500 text-14-18 px-[24px] border-[0.5px] border-[#00000026] bg-grayscale-900 rounded-[12px] cursor-pointer ml-[8px] whitespace-nowrap"
          onClick={() => onChangeViewMode()}
          style={color ? { backgroundColor: color } : {}}
        >
          Book now
          <Image src={ic_arrow_right_white} alt="" width={16} height={16} className="ml-[4px]" />
        </div>
      </div>
    </div>
  )
}

export default LandingHeaderSpecial
