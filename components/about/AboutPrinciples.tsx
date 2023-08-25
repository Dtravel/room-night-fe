/* eslint-disable @next/next/no-img-element */
import AboutContentDetail from '@dtravel/components/about/AboutContentDetail';
import React from 'react';

const AboutPrinciples = () => {
  return (
    <div className={'pt-[64px] md:pt-[112px]'}>
      <div className={'relative w-full h-auto rounded-[24px]'}>
        <img
          src={'https://static.dtravel.com/dtravel-direct/about_2_lg.png'}
          alt={'about'}
          className={'rounded-[24px]'}
        />
      </div>
      <h3
        className={
          'font-maison-neue-medium text-16-18 text-sand-8 tracking-[.2em] uppercase pb-[16px] pt-[32px] lg:pt-[48px]'
        }
        id={'principles'}
      >
        PRINCIPLES
      </h3>
      <p
        className={
          'font-pp-monument-extended-bold font-bold text-28-36 text-sand-8 tracking-[-.01em]'
        }
      >
        Shared values that define our community
      </p>

      <AboutContentDetail title={'We value ownership'}>
        Dtravel’s tools are purpose-built for ownership, empowering hosts to
        have greater control over their businesses and enabling guests to better
        shape their travel experiences.
      </AboutContentDetail>

      <AboutContentDetail title={'We are conscientious'}>
        We listen to each other and our community, seek feedback, and are
        mindful of how our actions (no matter how small) affect our members and
        the Dtravel ecosystem.
      </AboutContentDetail>

      <AboutContentDetail title={'We are idealistic'}>
        We believe that web3 technology will fundamentally transform travel by
        decentralizing control and enhancing trust amongst travel participants,
        leading to a better experience for all.
      </AboutContentDetail>

      <AboutContentDetail title={'We are community-driven'}>
        Dtravel exists to serve the community. All members are active
        participants in planning and governance, with every action informed by
        their input.
      </AboutContentDetail>

      <AboutContentDetail title={'We are transparent'}>
        Information is power and critical to being empowered as an owner. We
        maintain transparency with the community and optimize the ecosystem for
        transparency.
      </AboutContentDetail>
    </div>
  );
};

export default AboutPrinciples;
