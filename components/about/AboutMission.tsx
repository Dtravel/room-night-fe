/* eslint-disable @next/next/no-img-element */
import AboutContentDetail from '@dtravel/components/about/AboutContentDetail';

const AboutMission = () => {
  return (
    <div className={''}>
      <div className={'relative w-full h-auto rounded-[24px]'}>
        <img
          src={'https://static.dtravel.com/dtravel-direct/about_1_lg.png'}
          alt={'about'}
          className={'rounded-[24px]'}
        />
      </div>
      <h3
        className={
          'font-maison-neue-medium text-16-18 text-sand-8 tracking-[.2em] uppercase pb-[16px] pt-[32px] lg:pt-[48px]'
        }
        id={'mission'}
      >
        MISSION
      </h3>
      <p
        className={
          'font-pp-monument-extended-bold font-bold text-28-36 text-sand-8 tracking-[-.01em]'
        }
      >
        Empower ownership in a decentralized travel ecosystem
      </p>

      <AboutContentDetail title={'What is Dtravel?'}>
        Dtravel is a web3 direct booking tool that facilitates vacation rentals
        without intermediaries. Blending the freedom of direct booking sites
        with the simplicity of online travel agencies, Dtravel offers greater
        ownership, lower fees and more control.
      </AboutContentDetail>

      <AboutContentDetail title={'How it works'}>
        <p className={'mb-6'}>
          As a web3 ecosystem, bookings are conducted on-chain in a peer-to-peer
          manner, with Dtravel acting solely as the technology and
          infrastructure provider. Smart contracts govern booking conditions,
          ensuring full transparency and independence. Hosts have the ability to
          accept crypto and/or fiat payments from guests, diversifying the
          customer base.
        </p>
        <p>
          By leveraging smart contracts and blockchain technology, Dtravel
          eliminates the issues resulting from short-term rental platforms and
          travel agencies. This approach empowers hosts to create their own
          terms/policies, build their unique brand with greater customizability
          and enjoy unconstrained communications with guests.
        </p>
      </AboutContentDetail>

      <AboutContentDetail title={'Why it matters'}>
        To actualize our vision of becoming a fully decentralized,
        community-owned and operated travel ecosystem, Dtravel’s core
        contributors have committed to developing a sustainable Decentralized
        Autonomous Organization (DAO) structure. By initially testing and
        evolving DAO operations internally, Dtravel will be better equipped to
        empower the community with the ability to create proposals and subDAOs,
        eventually establishing a self-governing ecosystem completely operated
        by community members.
      </AboutContentDetail>
    </div>
  );
};

export default AboutMission;
