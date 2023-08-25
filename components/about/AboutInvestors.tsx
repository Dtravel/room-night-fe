import ic_arrow_right_lg from '@dtravel/assets/icons/ic_arrow_right_lg.svg';
import Image from 'next/image';
import React from 'react';

const AboutInvestors = () => {
  return (
    <div
      className={
        'border-t border-sand-4 ' +
        'pb-[64px] md:pb-[88px] lg:pb-[112px] ' +
        'pt-[32px] md:pt-[56px] lg:pt-[64px]'
      }
    >
      <h3
        className={
          'font-maison-neue font-medium text-16-18 text-sand-8 tracking-[.2em] uppercase pb-[16px] pt-[32px] lg:pt-[48px]'
        }
        id={'investors'}
      >
        INVESTORS
      </h3>
      <p
        className={
          'font-monument-extended font-bold text-28-36 text-sand-8 pb-[24px] tracking-[-.01em]'
        }
      >
        Investors in TRVL, Dtravel&apos;s native <br /> web3 ecosystem token.
      </p>

      <p
        className={
          'font-maison-neue font-normal text-18-28 text-sand-8 pb-[24px]'
        }
      >
        Developed by TRVL Labs, the TRVL token was funded by institutional
        investors including Kenetic Capital, Huobi Labs, Shima Capital, LD
        Capital, Future Perfect Ventures and more to power the future of travel.
      </p>

      <a
        className={
          'font-maison-neue font-medium text-red-6 text-18-28 flex items-center gap-[4px] cursor-pointer pb-[16px] md:pb-[32px] lg:pb-[48px]'
        }
      >
        <span>Investor inquiries</span>
        <Image src={ic_arrow_right_lg} alt={'ic_arrow_right_lg'} />
      </a>

      <div
        className={'grid grid-cols-1 md:grid-cols-2 gap-[16px] lg:gap-[24px]'}
      >
        {[1, 2, 3, 4].map((item, index) => (
          <div
            key={index}
            className={'w-full h-[208px] md:h-[184px] bg-sand-3 rounded-[16px]'}
          />
        ))}
      </div>

      <div
        className={
          'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] lg:gap-[24px] mt-[24px]'
        }
      >
        {[1, 2, 3].map((item, index) => (
          <div key={index}>
            <div className={'w-full h-[184px] bg-sand-3 rounded-[16px]'} />
            <p
              className={
                'font-maison-neue font-medium text-18-28 text-sand-8 pt-[16px]'
              }
            >
              Full Name
            </p>
            <p
              className={'font-maison-neue font-medium text-14-20 text-sand-6'}
            >
              Short description goes here and can wrap multiple lines.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutInvestors;
