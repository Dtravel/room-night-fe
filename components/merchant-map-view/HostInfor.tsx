import React from 'react'
// import ic_bxs_star from '@dtravel/assets/icons/ic_bxs_star.svg'
import ic_D_logo from '@dtravel/assets/icons/ic_D_logo.svg'
import Image from 'next/image'
import { convertRating } from '@dtravel/utils/common'
import { useRouter } from 'next/router'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import { numberWithCommas } from '@dtravel/helpers/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'
import LandingLogo from '@dtravel/components/merchant-landing/LandingLogo'

const HostInfor = () => {
  const router = useRouter()
  const { hostId, propertyId } = router.query
  const { userID, businessInfor } = useAppSelector((state) => state.property)
  const hostID = (userID || hostId) as string
  const isMounted = useMounted()
  const isPropertyDetailPage = router.pathname.includes('/property/') && propertyId

  const getUrl = () => {
    if (typeof window === 'undefined') return ''
    return hostId ? `/property/${hostID}` : `/`
  }

  const renderLogo = () => {
    if (businessInfor?.hostLogo) {
      return (
        <div
          className={`w-[40px] h-[40px] rounded-xl mr-3 flex items-center justify-center bg-no-repeat bg-center bg-cover`}
          style={{
            backgroundImage: `url(${businessInfor.hostLogo}?h=40)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: '100% auto',
          }}
        />
      )
    }
    return (
      <div
        className={`${isPropertyDetailPage ? 'w-[40px] h-[40px]' : 'w-[52px] h-[52px]'
          } rounded-xl mr-3 bg-[#1D2D3B] text-white text-32-40 flex items-center justify-center`}
      >
        {businessInfor?.contactName ? (
          <span
            className={'font-editorial-new uppercase'}
            style={{ fontSize: '22px', lineHeight: '20px', marginTop: '4px', marginLeft: '2px' }}
          >
            {businessInfor?.contactName?.charAt(0) || 'D'}
          </span>
        ) : (
          <span className={'ml-[3px]'}>
            <Image src={ic_D_logo} alt={'logo'} />
          </span>
        )}
      </div>
    )
  }

  if (isPropertyDetailPage) {
    return (
      <div className="flex ">
        {isMounted && <a href={getUrl()}>{renderLogo()}</a>}

        {/* <div className="rounded-full mr-3 bg-none text-white w-[48px] h-[48px] flex items-center justify-center" /> */}
        <div className="flex-col justify-center md:hidden lg:flex">
          {isMounted && (
            <a href={getUrl()}>
              <span className={`text-sand-8 font-inter-500 line-clamp-1 text-14-18 uppercase`}>
                {businessInfor?.contactName} &nbsp;
              </span>
            </a>
          )}
          <p className="text-sand-6 font-inter-500 text-12-16 flex items-center uppercase mt-[1px]">
            {(businessInfor?.rating || 0) > 0 && (
              <span className={'flex items-center'}>
                {convertRating(businessInfor?.rating, 1)}
                <span className="uppercase">
                  /5 average
                  {/* <Image src={ic_bxs_star} alt={'star'} width={8} height={8} /> */}
                </span>
              </span>
            )}
            {(businessInfor?.totalBookings || 0) > 0 && (businessInfor?.totalReviews || 0) > 0 && <>&nbsp;•&nbsp;</>}
            {(businessInfor?.totalReviews || 0) > 0 && (
              <span>
                {numberWithCommas(businessInfor?.totalReviews)}{' '}
                {`rating${(businessInfor?.totalReviews || 0) > 1 ? 's' : ''}`}
              </span>
            )}
            {(businessInfor?.totalReviews || 0) > 0 && (businessInfor?.rating || 0) > 0 && <>&nbsp;•&nbsp;</>}
            {(businessInfor?.totalBookings || 0) > 0 &&
              (businessInfor?.totalReviews || 0) <= 0 &&
              (businessInfor?.rating || 0) > 0 && <>&nbsp;•&nbsp;</>}
            {(businessInfor?.totalBookings || 0) > 0 && (
              <span className={''}>
                {numberWithCommas(businessInfor?.totalBookings)}{' '}
                {`booking${(businessInfor?.totalBookings || 0) > 1 ? 's' : ''} `}
              </span>
            )}
          </p>
        </div>
      </div>
    )
  }
  if (!isMounted) return null
  return (
    <div className="md:flex items-center w-2/3 md:w-1/3 max-w-[50vw] md:max-w-[33vw]">
      <LandingLogo
        url={getUrl()}
        hostLogo={businessInfor?.hostLogo}
        hostName={businessInfor?.hostName}
        contactName={businessInfor?.contactName}
      />
    </div>
  )
}

export default HostInfor
