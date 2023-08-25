import React from 'react'
import BusinessInformation from '@dtravel/components/merchant-map-view/BusinessInformation'
import BusinessContact from '@dtravel/components/merchant-map-view/BusinessContact'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import LandingLogo from '@dtravel/components/merchant-landing/LandingLogo'

interface Props {
  businessInfor: any
  url: string
  onChangeViewMode: () => void
  isEmptyFeatured: boolean
}

const LandingHeader: React.FC<Props> = ({ businessInfor, url, onChangeViewMode, isEmptyFeatured }) => {
  const isMounted = useMounted()
  return (
    <div className="sticky top-0 z-10 bg-white flex justify-between items-center px-[16px] md:px-[32px] lg:px-[24px] pt-[20px] pb-[12px]">
      {isMounted && (
        <div className="flex items-center w-auto md:w-1/3 max-w-[50vw] md:max-w-[33vw]">
          <LandingLogo
            url={url}
            hostLogo={businessInfor?.hostLogo}
            hostName={businessInfor?.hostName}
            contactName={businessInfor?.contactName}
          />
        </div>
      )}

      <div className="hidden md:flex items-center w-1/3 lg:justify-center">
        <span
          className={`text-grayscale-900 font-inter-500 text-14-18 hover:text-grayscale-900 cursor-pointer mx-[12px]`}
        >
          Home
        </span>
        {!isEmptyFeatured &&
          <span
            className={`text-grayscale-500 font-inter-500 text-14-18 hover:text-grayscale-900 cursor-pointer mx-[12px]`}
            onClick={() => onChangeViewMode()}
          >
            Listings
          </span>
        }
        <BusinessInformation>
          <span
            className={`text-neutral-500 font-inter-500 text-14-18 hover:text-grayscale-900 cursor-pointer mx-[12px]`}
          >
            About
          </span>
        </BusinessInformation>
      </div>

      <div className="hidden md:flex justify-end w-1/3">
        <BusinessContact>
          <button
            className={
              'text-grayscale-900 font-inter-500 text-14-18 h-[40px] flex items-center justify-center px-[16px] border border-neutral-300 rounded-[12px] whitespace-nowrap hover:bg-neutral-300'
            }
          >
            Contact
          </button>
        </BusinessContact>
        <span
          className="text-white font-inter-500 text-14-18 px-[16px] py-[13px] bg-neutral-900 rounded-[12px] cursor-pointer ml-[8px] whitespace-nowrap"
          onClick={() => onChangeViewMode()}
        >
          Book now
        </span>
      </div>

      {/*<button onClick={() => onOpenMenuMobile()} role="presentation" className="cursor-pointer md:hidden mr-[-4px]">*/}
      {/*  <Image src={ic_menu} alt="" />*/}
      {/*</button>*/}
    </div>
  )
}

export default LandingHeader
