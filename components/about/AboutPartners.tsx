import Image from 'next/image';
import React from 'react';

const PARTNERS = [
  {
    key: 'hostaway',
    image: 'https://static.dtravel.com/dtravel-direct/partner_host_away.png',
  },
  {
    key: 'travala',
    image: 'https://static.dtravel.com/dtravel-direct/partner_travala.png',
  },
  {
    key: 'rent',
    image: 'https://static.dtravel.com/dtravel-direct/partner_rent.png',
  },
  {
    key: 'uplisting',
    image: 'https://static.dtravel.com/dtravel-direct/partner_uplisting.png ',
  },
];

const AboutPartners = () => {
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
          'font-maison-neue-medium text-16-18 text-sand-8 tracking-[.2em] uppercase pb-[16px] pt-[32px] lg:pt-[48px]'
        }
        id={'partners'}
      >
        PARTNERS
      </h3>
      <p
        className={
          'font-pp-monument-extended-bold font-bold text-28-36 text-sand-8 pb-[24px] tracking-[-.01em]'
        }
      >
        Strategic partners in travel and vacation rentals
      </p>

      <p
        className={
          'font-maison-neue font-normal text-18-28 text-sand-8 pb-[24px]'
        }
      >
        Our ever-expanding list of strategic partners helps accelerate the brand
        awareness and adoption of Dtravel. Partnering with property management
        systems and channel managers reduces onboarding friction, enabling hosts
        to easily switch on Dtravel with little disruption to their business.
      </p>

      {/*<a*/}
      {/*  className={*/}
      {/*    'font-maison-neue font-medium text-red-6 text-18-28 flex items-center gap-[4px] cursor-pointer pb-[16px] md:pb-[32px] lg:pb-[48px]'*/}
      {/*  }*/}
      {/*>*/}
      {/*  <span>Partnership inquiries</span>*/}
      {/*  <Image src={ic_arrow_right_lg} alt={'ic_arrow_right_lg'} />*/}
      {/*</a>*/}

      <div
        className={
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[16px] lg:gap-[24px]'
        }
      >
        {PARTNERS.map(item => (
          <div
            key={item.key}
            className={'rounded-[16px] w-full h-[184px] relative'}
          >
            <Image
              src={item.image}
              alt={item.key}
              layout={'fill'}
              className={'rounded-[16px]'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPartners;
