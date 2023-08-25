import React from 'react'
import BusinessContact from '@dtravel/components/merchant-map-view/BusinessContact'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import LandingLogo from '@dtravel/components/merchant-landing/LandingLogo'
import { isScrolledIntoView } from '@dtravel/helpers/utils/common'
import { useEffect, useState } from 'react'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { useAppSelector } from '@dtravel/redux/hooks'
import { isEmpty } from '@dtravel/utils/common'
interface Props {
  url: string
  managementData: any
  isEmptyFeatured: boolean
}
const MENU = [
  { name: 'Services', id: 'services_management' },
  { name: 'Featured', id: 'featured_management' },
  { name: 'Why Us', id: 'why_us_management' },
  { name: 'FAQ', id: 'FAQ_management' },
]
const PropertyManagementHeader: React.FC<Props> = ({ url, managementData, isEmptyFeatured }) => {
  const { businessInfor } = useAppSelector((state) => state.property)
  const isMounted = useMounted()
  const { color } = useTheme()
  const [active, setActive] = useState<string>('services_management')
  const MENU_SHOW = MENU.filter((el: any) => !(
    (isEmpty(managementData?.service) && el.id === 'services_management') ||
    (isEmptyFeatured && el.id === 'featured_management') ||
    (isEmpty(managementData?.whyClientsTrustUs) && el.id === 'why_us_management') ||
    (isEmpty(managementData?.faq) && el.id === 'FAQ_management')
  ))

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
      window.removeEventListener('scroll', function () { })
    } // eslint-disable-next-line
  }, [managementData])

  const handleClickMenu = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActive(id)
    }
  }
  return (
    <div className="flex justify-between items-center w-full m-auto px-[16px] md:px-[32px] lg:px-[48px]">
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
              className={`${isActived ? 'text-grayscale-900' : 'text-grayscale-600'
                } font-inter-500 text-14-18 hover:text-grayscale-900 cursor-pointer mx-[12px]`}
              key={id}
              onClick={() => handleClickMenu(el.id)}
            >
              {el.name}
            </span>
          )
        })}
      </div>

      <div className="flex justify-end w-1/4">
        <BusinessContact>
          <div
            className="h-[40px] flex items-center justify-center text-white font-inter-500 text-14-18 px-[24px] border-[0.5px] border-[#00000026] bg-grayscale-900 rounded-[12px] cursor-pointer ml-[8px] whitespace-nowrap"
            style={color ? { backgroundColor: color } : {}}
          >
            Contact
          </div>
        </BusinessContact>
      </div>
    </div>
  )
}

export default PropertyManagementHeader
