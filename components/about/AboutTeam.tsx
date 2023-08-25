/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';

const TEAMS = [
  {
    name: 'Cynthia Huang',
    role: 'Community',
    image: 'https://static.dtravel.com/dtravel-direct/team_cynthia.jpg',
    linkedIn: 'https://www.linkedin.com/in/cynthiajhuang/',
    twitter: '',
  },
  {
    name: 'Bruno Paleo',
    role: 'STEM',
    image: 'https://static.dtravel.com/dtravel-direct/team_bruno.png',
    linkedIn: 'https://www.linkedin.com/in/brunowp/',
    twitter: '',
  },
  {
    name: 'Drew Currah',
    role: 'Finance',
    image: 'https://static.dtravel.com/dtravel-direct/team_drew.jpg',
    linkedIn: 'https://www.linkedin.com/in/dcurrah1/',
    twitter: '',
  },
  {
    name: 'Charlie Aufmann',
    role: 'Design',
    image: 'https://static.dtravel.com/dtravel-direct/team_charlie.jpg',
    linkedIn: 'https://www.linkedin.com/in/charlieaufmann/',
    twitter: '',
  },
  {
    name: 'James Soulodre',
    role: 'Marketing',
    image: 'https://static.dtravel.com/dtravel-direct/team_james.jpg',
    linkedIn: 'https://www.linkedin.com/in/james-soulodre-5ba87526/',
    twitter: '',
  },
  {
    name: 'Trang Dang',
    role: 'Product',
    image: 'https://static.dtravel.com/dtravel-direct/team_kate.jpg',
    linkedIn: 'https://www.linkedin.com/in/trang-dang-quynh-43b050124/',
    twitter: '',
  },
  {
    name: 'Thai Nguyen',
    role: 'Engineering',
    image: 'https://static.dtravel.com/dtravel-direct/team_thai.jpg',
    linkedIn: 'https://www.linkedin.com/in/thainh/',
    twitter: '',
  },
  {
    name: 'Eric Pace',
    role: 'Supply Growth',
    image: 'https://static.dtravel.com/dtravel-direct/team_eric.jpg',
    linkedIn: 'https://www.linkedin.com/in/ericpace/',
    twitter: '',
  },
  {
    name: 'Cécile Tran',
    role: 'People',
    image: 'https://static.dtravel.com/dtravel-direct/team_cecile.jpg',
    linkedIn: 'https://www.linkedin.com/in/tranhuyentrang/',
    twitter: '',
  },
  {
    name: 'Quinn Hubertz',
    role: 'Product',
    image: 'https://static.dtravel.com/dtravel-direct/team_quinn.jpg',
    linkedIn: 'https://www.linkedin.com/in/quinn-h/',
    twitter: '',
  },
  {
    name: 'Duc Pham',
    role: 'Design',
    image: 'https://static.dtravel.com/dtravel-direct/team_finn.jpg',
    linkedIn: 'https://www.linkedin.com/in/ducpm1608/',
    twitter: '',
  },
];

const AboutTeam = () => {
  return (
    <div className={'py-[64px] md:py-[88px] lg:py-[112px]'}>
      <div className={'relative w-full h-auto rounded-[24px]'}>
        <img
          src={'https://static.dtravel.com/dtravel-direct/about_3_lg.png'}
          alt={'about'}
          className={'rounded-[24px]'}
        />
      </div>
      <h3
        className={
          'font-maison-neue-medium text-16-18 text-sand-8 tracking-[.2em] uppercase pb-[16px] pt-[32px] lg:pt-[48px]'
        }
        id={'contributors'}
      >
        CONTRIBUTORS
      </h3>
      <p
        className={
          'font-pp-monument-extended-bold font-bold text-28-36 text-sand-8 pb-[24px] tracking-[-.01em]'
        }
      >
        Seasoned builders from the travel and crypto industries
      </p>

      <p
        className={
          'font-maison-neue font-normal text-18-28 text-sand-8 pb-[24px]'
        }
      >
        The core Dtravel team is comprised of seasoned creators and operators
        from top-of-the-line travel and blockchain companies like Airbnb,
        Booking.com, vrbo, Cardano, and more.
      </p>

      {/*<a*/}
      {/*  className={*/}
      {/*    'font-maison-neue font-medium text-red-6 text-18-28 flex items-center gap-[4px] cursor-pointer pb-[16px] md:pb-[32px] lg:pb-[48px]'*/}
      {/*  }*/}
      {/*>*/}
      {/*  <span>Join us</span>*/}
      {/*  <Image src={ic_arrow_right_lg} alt={'ic_arrow_right_lg'} />*/}
      {/*</a>*/}

      <div
        className={
          'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] lg:gap-[24px]'
        }
      >
        {TEAMS.map((item, index) => {
          return (
            <div key={index}>
              <Image
                src={
                  item.image ||
                  'https://static.dtravel.com/images/404/default_image.jpg'
                }
                alt={item.name}
                className={'rounded-[16px] grayscale'}
                width={184}
                height={184}
              />
              <p
                className={
                  'font-maison-neue font-medium text-18-28 text-sand-8 pt-[16px]'
                }
              >
                {item.name}
              </p>
              <p
                className={
                  'font-maison-neue font-medium text-14-20 text-sand-6'
                }
              >
                {item.role}
              </p>
              <div className={'flex items-center gap-[5px] mt-[12px]'}>
                <a href={item.linkedIn} target={'_blank'} rel="noreferrer">
                  <Image
                    src={
                      'https://static.dtravel.com/logo/entypo-social_linkedin-with-circle.svg'
                    }
                    alt={'linkedin'}
                    width={24}
                    height={24}
                  />
                </a>
                {/*<Image*/}
                {/*  src={ic_entypo_social_twitter_with_circle}*/}
                {/*  alt={'twitter'}*/}
                {/*  width={24}*/}
                {/*  height={24}*/}
                {/*/>*/}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutTeam;
