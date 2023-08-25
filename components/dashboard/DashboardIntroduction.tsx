/* eslint-disable */
import ic_arrow_forward from '@dtravel/assets/icons/ic_arrow_forward.svg';
import ic_arrow_right_white from '@dtravel/assets/icons/ic_arrow_right_white.svg';
import Image from 'next/image';
import React from 'react';
import DashboardIntroductionImage from './DashboardIntroductionImage';

interface Props {
  isMobile: boolean
}
const DashboardIntroduction = ({ isMobile }: Props) => {
  return (
    <div
      className={
        'text-center pt-[112px] md:pt-[160px] lg:pt-[220px] pb-[112px] md:pb-[160px] lg:pb-[0px] px-[16px] mr-auto ml-auto'
      }
    >
      <p
        className={
          'font-maison-neue-medium text-12-16 md:text-14-16 lg:text-16-18 uppercase text-sand-8 pb-[16px] md:pb-[12px] lg:pb-[32px] tracking-[.2em]'
        }
      >
        POWERING THE FUTURE OF DIRECT STAYS
      </p>
      <p
        className={
          'font-pp-monument-extended-bold text-28-36 md:text-40-48 lg:text-56-64 text-sand-8 pb-[24px] tracking-[-0.01em] mobile-hidden tablet-hidden'
        }
      >
        Book direct,<br /> earn more.
      </p>
      <p
        className={
          'font-pp-monument-extended-bold text-28-36 md:text-40-48 lg:text-56-64 text-sand-8 pb-[24px] tracking-[-0.01em] pc-hidden'
        }
      >
        Book direct,<br /> earn more.
      </p>
      <p
        className={
          'font-maison-neue text-18-28 md:text-24-36 lg:text-24-36 -0.01em pb-[32px] lg:pb-[48px] text-sand-8 tablet-hidden'
        }
      >
        Innovative tools and infrastructure for modern hospitality operators.
      </p>
      <p
        className={
          'font-maison-neue text-18-28 md:text-24-36 lg:text-24-36 -0.01em pb-[32px] lg:pb-[48px] text-sand-8 pc-hidden mobile-hidden'
        }
      >
        Innovative tools and infrastructure for<br /> modern hospitality operators.
      </p>
      <div
        className={
          'flex flex-col md:flex-row items-center justify-center gap-[12px]'
        }
      >
        <a
          className={
            'bg-red-6 flex items-center justify-center text-white rounded-[12px] h-[56px] md:h-[64px] px-[24px] hover:opacity-90 cursor-pointer relative ' +
            'w-full md:w-auto ' +
            'font-maison-neue-medium text-16-20 md:text-18-24 ' +
            'active:after:absolute active:after:top-[-4px] active:after:right-[-4px] active:after:bottom-[-4px] active:after:left-[-4px] active:after:border-red-6 active:after:border-[2px] active:after:rounded-[16px]'
          }
          target={'_blank'}
          href={process.env.NEXT_PUBLIC_DTRAVEL_DIRECT_HOST_URL}
          rel="noreferrer"
        >
          <span>Launch host app</span>
          <Image src={ic_arrow_right_white} alt={'ic_arrow_right_white'} />
        </a>

        <a
          className={
            'bg-none border-[2px] border-sand-8 text-sand-8 hover:bg-sand-3 hover:opacity-90 flex items-center justify-center rounded-[12px] h-[56px] md:h-[64px] px-[24px] hover:opacity-90 cursor-pointer relative ' +
            'w-full md:w-auto ' +
            'font-maison-neue-medium text-16-20 md:text-18-24 ' +
            'active:after:absolute active:after:top-[-6px] active:after:right-[-6px] active:after:bottom-[-6px] active:after:left-[-6px] active:after:border-red-8 active:after:border-[2px] active:after:rounded-[16px]'
          }
          target={'_blank'}
          href={'/survey/guest-waitlist'}
          rel="noreferrer"
        >
          <span>Join the guest community</span>
          <Image src={ic_arrow_forward} alt={'ic_arrow_forward'} />
        </a>
      </div>
      <DashboardIntroductionImage isMobile={isMobile} />
    </div>
  );
};

export default DashboardIntroduction;