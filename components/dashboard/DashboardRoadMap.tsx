/* eslint-disable @next/next/no-img-element */
import ic_check from './images/ic_check.svg';
import ic_uncheck from './images/ic_uncheck.svg';
import ic_uncheck_grey from './images/ic_uncheck_grey.svg';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import * as beacon from './images/beacon.json'

interface Props {
  heightWindow: number
  isMobile: boolean
}

const DashboardRoadMap = ({ heightWindow, isMobile }: Props) => {
  const [show, setShow] = useState<boolean>(true)

  const handleScroll = (e: any) => {
    const radioRoadmapEl: any = document.getElementById('radio_roadmap')
    if (radioRoadmapEl) {
      const top = radioRoadmapEl.getBoundingClientRect()?.y
      if (top && top < heightWindow / 2 && show) setShow(false)
    }
    e.preventDefault()
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('scroll', handleScroll);
      }
    }
    // eslint-disable-next-line
  }, [])
  const renderRadio = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: beacon,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div
        className="w-8 h-8 min-h-8 min-w-8 rounded-full flex items-center justify-center relative z-20"
        // style={{ background: 'rgba(163, 42, 48, 0.2)' }}
        id="radio_roadmap"
      >
        {/* <div className="w-[18px] h-[18px] min-h-[18px] min-w-[18px] bg-white border-2 border-red-6 rounded-full" /> */}
        <Lottie
          options={defaultOptions}
          height={32}
          width={32}
          isStopped={false}
          isPaused={false}
        />
        {show && <div className='w-[2px] bg-sand-3 absolute top-[22px] left-[15px] h-[900px]' style={{ zIndex: -1 }} />}
      </div>
    );
  };
  const renderImage = (phase: number, icon: any) => {
    return (
      <div className={`flex mx-4 md:mx-0 ${phase === 1 ? 'phase1Image' : ''} ${phase === 3 ? 'phase3Image' : ''} roadMapImg`}>
        <img src={icon} alt="" />
      </div>
    );
  };
  const renderContentPhase = (
    phase: number,
    title: string,
    messages: Array<string>,
  ) => {
    return (
      <div className={`flex flex-col justify-center contentPhase ${phase === 1 ? 'contentPhase1' : ''}`}>
        <div className='mb-4 flex items-start'>
          <span className={`
            px-3 py-[10px] rounded-[80px] text-12-16 md:text-12-16 letter-spacing-02em font-maison-neue-medium
            ${phase === 1 ? 'bg-forest-1 text-forest-6' : ''}
            ${phase === 2 ? 'bg-sun-1 text-sun-6' : ''}
            ${phase === 3 ? 'bg-sand-2 text-sand-6' : ''}
          `}
          >
            {phase === 1 && 'PHASE 1 – LAUNCHED'}
            {phase === 2 && 'PHASE 2 – IN PROGRESS'}
            {phase === 3 && 'PHASE 3 – UPCOMING'}
          </span>
        </div>
        <p className="mb-6 font-editorial-new text-28-36 md:text-40-48 text-sand-8">
          {title}
        </p>
        {messages.map((el: string, idx: number) => {
          const isLast = idx === messages.length - 1
          const isChecked = phase === 1 || (phase === 2 && idx < 3);
          return (
            <div className={`flex items-center ${isLast ? '' : 'mb-3'}`} key={idx}>
              <div className='w-6 h-6 min-w-[24px]'>
                <Image src={isChecked ? ic_check : phase === 3 ? ic_uncheck_grey : ic_uncheck} alt="" width={24} height={24} />
              </div>
              <span className='ml-3 text-16-24 md:text-18-28 font-maison-neue text-sand-8'>{el}</span>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <div className='w-full bg-white roadMapContainer'>
        <div className='xl:max-w-[1304px] xl:px-[40px] w-full m-auto pb-[112px] md:pb-0 pt-[112px] md:pt-[160px] lg:pt-[220px]'>
          <div className='xl:max-w-[703px] w-full text-sand-8 roadMapText'>
            <p className='mb-6 font-maison-neue-medium text-12-16 md:text-14-16 lg:text-16-18 tracking-[.25em] md:tracking-[.2em] uppercase'>Join the movement</p>
            <p className='mb-4 font-pp-monument-extended-bold text-28-36 md:text-40-48 lg:text-56-64 letter-spacing-001em'>Appeal to the modern traveller</p>
            <p className='mb-10 font-maison-neue text-18-28 md:text-24-36'>Dtravel removes intermediaries and reduces fees, providing hospitality operators with the tech and infrastructure to attract travellers who prefer direct stays and diverse payment options.</p>
          </div>
          {/* phase 1 */}
          <div className='flex w-full roadMapItem'>
            <div className='w-full mb:w-1/2 flex'>
              {!isMobile &&
                <div className={`w-[2px] bg-red-6 mx-[38px] z-10 tablet-hidden mobile-hidden ${show ? '' : 'relative'}`}>
                  <div className={`ml-[-15px] mt-[-15px] mb-[-15px] ${show ? 'sticky' : 'absolute bottom-0'}`} style={show ? { top: heightWindow / 2 } : {}}>{renderRadio()}</div>
                </div>
              }
              {renderContentPhase(1, 'Smart contract powered direct stays', [
                "Modern website designed for today's traveller",
                'Free to setup, pay as you earn',
                'Offer payment options guests want',
                'Take control over booking terms and policies',
                'Build more meaningful guest relationships',
              ])}
            </div>
            {renderImage(1, "https://static.dtravel.com/dtravel-direct/phase_1.webp")}
          </div>

          {/* phase 2 */}
          <div className='flex w-full roadMapItem phase2Item'>
            <div className='w-full mb:w-1/2 flex'>
              <div className='w-[2px] bg-sand-3 mx-[38px] tablet-hidden mobile-hidden' />
              {renderContentPhase(
                2,
                'Earn rewards and access demand channels',
                [
                  'Earn real-value rewards with every booking',
                  'Leverage rewards to offset fees',
                  'Connect through industry leading integrations',
                  'Stand out with customizations and features',
                  'Target digital nomads and crypto travellers'
                ]
              )}
            </div>
            {renderImage(2, "https://static.dtravel.com/dtravel-direct/phase_2.webp")}
          </div>

          {/* phase 3 */}
          <div className='flex w-full roadMapItem phase3Item'>
            <div className='w-full mb:w-1/2 flex'>
              <div className='w-[2px] bg-sand-3 mx-[38px] tablet-hidden mobile-hidden' />
              {renderContentPhase(
                3,
                'Open travel protocol',
                [
                  'A single source of listing information',
                  'Available to all industry participants',
                  'Immutable data stored on the blockchain',
                  'Reduces fees, improves transparency and operations',
                  'Neutral and censorship resistant'
                ]
              )}
            </div>
            {renderImage(3, "https://static.dtravel.com/dtravel-direct/phase_3.webp")}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardRoadMap;