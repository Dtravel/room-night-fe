import team_damian_bielinski from '@dtravel/assets/images/about/team_damian_bielinski.svg';
import team_julian_persaud from '@dtravel/assets/images/about/team_julian_persaud.jpeg';
import Image from 'next/image';
import React from 'react';

const ADVISORS = [
  {
    name: 'Simon Lehmann',
    role: 'Vacation Rentals Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_simon_lehmann.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Andre Cronje',
    role: 'DeFi Architect',
    image: 'https://static.dtravel.com/dtravel-direct/team_andre_cronje.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Sebastien Borget',
    role: 'Growth Advisor',
    image:
      'https://static.dtravel.com/dtravel-direct/team_sebastien_borget.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Sicco Behrens',
    role: 'Business Development Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_sicco_behrens.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Ethan Eismann',
    role: 'Design Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_ethan_eismann.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Mauricio Prieto',
    role: 'Product Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_mauricio_prieto.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Tom Chan',
    role: 'Technical Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_tom_chan.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Jehan Chu',
    role: 'Finance Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_jehan_chu.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Michael Chen',
    role: 'Token Economics Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_michael_chen.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Bryan Lip',
    role: 'Strategic Partnerships Lead',
    image: 'https://static.dtravel.com/dtravel-direct/team_bryan_lip.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Luke Kim',
    role: 'Investor Relations Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_luke_kim.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Damian Bielinski',
    role: 'Communications Advisor',
    image: team_damian_bielinski,
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Julian Persaud',
    role: 'Operations Advisor',
    image: team_julian_persaud,
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Caleb Yeoh',
    role: 'Operations Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_caleb_yeoh.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Michael Goldin',
    role: 'Business Development Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_michael_goldin.png',
    linkedIn: '',
    twitter: '',
  },
  {
    name: 'Jin Yang',
    role: 'Security Advisor',
    image: 'https://static.dtravel.com/dtravel-direct/team_jin.jpg',
    linkedIn: '',
    twitter: '',
  },
];

const AboutAdvisors = () => {
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
        id={'advisors'}
      >
        ADVISORS
      </h3>
      <p
        className={
          'font-pp-monument-extended-bold font-bold text-28-36 text-sand-8 pb-[24px] tracking-[-.01em]'
        }
      >
        Industry experts across crypto, travel and tech
      </p>

      <p
        className={
          'font-maison-neue font-normal text-18-28 text-sand-8 pb-[24px]'
        }
      >
        Dtravel’s team of advisors bring with them a wealth of knowledge across
        crypto, travel and tech projects including Airbnb, Google, Travala, The
        Sandbox, Binance, yearn.finance, Curve, Oracle, Booking.com, ASAPNL, AJL
        Atelier, Phocus Wright, Interhome, Hotelplan Group, Swissport, and more.
      </p>

      <div
        className={
          'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] lg:gap-[24px]'
        }
      >
        {ADVISORS.map((item, index) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutAdvisors;
