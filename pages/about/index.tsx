import AboutAdvisors from '@dtravel/components/about/AboutAdvisors';
import AboutFaq from '@dtravel/components/about/AboutFaq';
import AboutMission from '@dtravel/components/about/AboutMission';
import AboutPartners from '@dtravel/components/about/AboutPartners';
import AboutPrinciples from '@dtravel/components/about/AboutPrinciples';
import AboutSideBar from '@dtravel/components/about/AboutSideBar';
import AboutTeam from '@dtravel/components/about/AboutTeam';
import LayoutHome from '@dtravel/components/layout/LayoutHome';
import { NextPage } from 'next';

interface Props {}

const About: NextPage<Props> = () => {
  return (
    <LayoutHome>
      <div
        className={
          'mr-auto ml-auto px-[16px] md:px-[32px] lg:px-[40px] xl:max-w-[1304px]'
        }
      >
        <h3 className={'font-pp-monument-extended-bold text-24-32 pt-[48px]'}>
          About
        </h3>

        <div
          className={
            'block lg:flex md:gap-[16px] lg:gap-[24px] mt-[32px] w-full'
          }
        >
          <div
            className={'w-full lg:w-2/12 lg:max-w-[184px] lg:block relative'}
          >
            <AboutSideBar />
          </div>

          <div className={'lg:w-8/12 lg:max-w-[808px]'}>
            <AboutMission />
            <AboutPrinciples />
            <AboutTeam />
            <AboutPartners />
            <AboutAdvisors />
            <AboutFaq />
            {/*<AboutInvestors />*/}
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default About;
