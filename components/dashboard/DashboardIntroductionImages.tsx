/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions';

const staticImageURLPC = 'https://static.dtravel.com/dtravel-direct/marketing-site/pc'
const staticImageURLTablet = 'https://static.dtravel.com/dtravel-direct/marketing-site/tablet'
const staticImageURLMobile = 'https://static.dtravel.com/dtravel-direct/marketing-site/mobile'

interface Props {
  isMobile: boolean
}
const DashboardIntroductionImages = ({ isMobile }: Props) => {
  const [isSafari, setSafari] = useState<boolean>(false);
  // const [type, setType] = useState<'pc' | 'tablet' | 'mobile' | ''>(isMobile ? 'mobile' : 'pc');

  // const windowDimensions = useWindowDimensions()
  // const isPC = type === 'pc'
  // const isTablet = type === 'tablet'
  // const isMobile = type === 'mobile'

  // const handleScrollCenter = () => {
  //   if (typeof window === 'undefined') return
  //   const el = document.getElementById(`main_page_${type}`)
  //   const homeImgGroup = document.getElementById('home_img_group')
  //   if (el && homeImgGroup) {
  //     const elBound = el.getBoundingClientRect()
  //     const scrollLeftDistance = elBound.x + elBound.width / 2 - windowDimensions.width / 2
  //     homeImgGroup.scrollLeft = scrollLeftDistance
  //     // el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: "center" });
  //   }
  // }
  useEffect(() => {
    setSafari(
      typeof navigator !== 'undefined' &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    );
  }, []);
  // useEffect(() => {
  //   if (windowDimensions.width !== 0) {
  //     if (windowDimensions.width >= 960) setType('pc')
  //     else if (windowDimensions.width < 600) setType('mobile')
  //     else setType('tablet')
  //   }
  // }, [windowDimensions]);
  // useEffect(() => {
  //   handleScrollCenter()
  // }, [type]);

  // const renderImage = (name: string, w: number, h: number) => {
  //   const staticImageURL = staticImageURLPC
  //   return (
  //     <Image
  //       src={staticImageURL + name}
  //       alt=""
  //       width={w} height={h}
  //       quality={80}
  //       className={"rounded-[8px] md:rounded-[13px] lg:rounded-[20px]"}
  //       priority
  //     />
  //   )
  //   // return (
  //   //   <img
  //   //     src={staticImageURL + name}
  //   //     alt=""
  //   //     style={{ width: w, height: h }}
  //   //     className={isPC ? "rounded-[20px]" : isTablet ? "rounded-[12px]" : "rounded-[4px]"}
  //   //   />
  //   // )
  // }
  const renderPC = () => {
    return (
      <>
        <div
          className='w-screen'
          style={{
            backgroundImage: `url(${staticImageURLPC + '/hero_image.webp'})`,
            width: '100vw',
            height: 'calc(100vw / 1880 * 973)',
            // aspectRatio: 'auto 1880 / 973',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
          }}
        >

          {/* <img
            src={staticImageURLPC + '/hero_image.webp'}
            alt=""
            className='w-full'
          /> */}
        </div>
        {/* <div className="flex flex-col ml-[16px] min-w-[238px]">
          {renderImage('/home_payment.webp', 238, 386)}
          <div className="w-full h-6" />
          {renderImage('/home_activity.webp', 238, 386)}
        </div> */}
        {/* <div className="ml-6 min-w-[1016px]">
          {renderImage('/home_main.webp', 1016, 796)}
        </div> */}
        {/* <div className="flex flex-col min-w-[235px]">
          {renderImage('/home_integrations.webp', 235, 374)}
          <div className="w-full h-6" />
          {renderImage('/home_wallet.webp', 235, 398)}
        </div> */}
        {/* <div className="ml-6 min-w-[964px] max-w-[1280px] w-full bg-white rounded-[20px] h-[796px] overflow-hidden" id="main_page_pc"> */}
        {/* {renderImage('/home_listing.webp', 964, 796)} */}
        {/* <img
            src={staticImageURLPC + '/home_listing.webp'}
            alt=""
            className="rounded-[20px] max-w-[964px] m-auto"
          /> */}
        {/* </div> */}
        {/* <div className="flex flex-col ml-6 min-w-[236px]">
          {renderImage('/home_add_guests.webp', 236, 285)}
          <div className="w-full h-6" />
          {renderImage('/home_map.webp', 236, 278)}
          <div className="w-full h-6" />
          {renderImage('/home_contact_host.webp', 236, 185)}
        </div> */}
        {/* <div className="flex flex-col ml-[24px] mr-[16px] min-w-[1018px]">
          {renderImage('/home_checkout.webp', 1018, 796)}
        </div> */}
      </>
    )
  }
  // const renderTablet = () => {
  //   return (
  //     <>
  //       <div className="flex flex-col min-w-[125px]">
  //         {renderImage('/home_payment.webp', 125, 203)}
  //         <div className="w-full h-[13px]" />
  //         {renderImage('/home_activity.webp', 125, 203)}
  //       </div>
  //       <div className="ml-[13px] min-w-[535px]">
  //         {renderImage('/home_main.webp', 535, 420)}
  //       </div>
  //       <div className="flex flex-col ml-[13px] min-w-[124px]">
  //         {renderImage('/home_integrations.webp', 124, 197)}
  //         <div className="w-full h-[13px]" />
  //         {renderImage('/home_wallet.webp', 124, 210)}
  //       </div>
  //       <div className="ml-[13px] min-w-[509px]" id="main_page_tablet">
  //         {renderImage('/home_listing.webp', 509, 420)}
  //       </div>
  //       <div className="flex flex-col ml-[13px] min-w-[124px]">
  //         {renderImage('/home_contact_host.webp', 124, 97)}
  //         <div className="w-full h-[13px]" />
  //         {renderImage('/home_map.webp', 124, 147)}
  //         <div className="w-full h-[13px]" />
  //         {renderImage('/home_add_guests.webp', 124, 151)}
  //       </div>
  //       <div className="flex flex-col ml-[13px] min-w-[537px]">
  //         {renderImage('/home_checkout.webp', 537, 420)}
  //       </div>
  //     </>
  //   )
  // }
  // const renderMobile = () => {
  //   return (
  //     <>
  //       <div className="flex flex-col min-w-[83px]">
  //         {renderImage('/home_payment.webp', 83, 135)}
  //         <div className="w-full h-[9px]" />
  //         {renderImage('/home_activity.webp', 83, 136)}
  //       </div>
  //       <div className="ml-[9px] min-w-[357px]">
  //         {renderImage('/home_main.webp', 357, 280)}
  //       </div>
  //       <div className="flex flex-col ml-[9px] min-w-[83px]">
  //         {renderImage('/home_integrations.webp', 83, 131)}
  //         <div className="w-full h-[9px]" />
  //         {renderImage('/home_wallet.webp', 83, 140)}
  //       </div>
  //       <div className="ml-[9px] min-w-[339px]" id="main_page_mobile">
  //         {renderImage('/home_listing.webp', 339, 280)}
  //       </div>
  //       <div className="flex flex-col ml-[9px] min-w-[83px]">
  //         {renderImage('/home_contact_host.webp', 83, 65)}
  //         <div className="w-full h-[9px]" />
  //         {renderImage('/home_map.webp', 83, 98)}
  //         <div className="w-full h-[9px]" />
  //         {renderImage('/home_add_guests.webp', 83, 100)}
  //       </div>
  //       <div className="flex flex-col ml-[9px] min-w-[374px] pr-[16px]">
  //         {renderImage('/home_checkout.webp', 358, 280)}
  //       </div>
  //     </>
  //   )
  // }
  return (
    <div
      className={`
        flex lg:justify-center w-[calc(100%_+_32px)] mx-[-16px] pl-[16px]
        ${!isSafari ? 'home-image-group' : ''}
        overflow-auto hidden-scroll-bar
        min-h-[280px] md:min-h-[420px] lg:min-h-[auto]
        mt-[64px] md:mt-[112px] lg:mt-[160px]
        pr-[0px] md:pr-[16px]
      `}
      id="home_img_group"
    >
      {renderPC()}
    </div>
  );
};

export default DashboardIntroductionImages;