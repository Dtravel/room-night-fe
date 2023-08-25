import ic_blockchain from './images/ic_blockchain.svg';
import ic_chart_pie from './images/ic_chart_pie.svg';
import ic_globe from './images/ic_globe.svg';
import ic_planet from './images/ic_planet.svg';
import ic_arrow_right_white from '@dtravel/assets/icons/ic_arrow_right_white.svg';
import Image from 'next/image';
import React from 'react';

const DashboardNewWorld = () => {
  const renderItem = (icon: any, title: string, description: string, isLast?: boolean) => {
    return (
      <div className={`itemBox ${isLast ? 'lastItem' : ''}`}>
        <Image src={icon} alt="twitter" />
        <p className="titleItem" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="desTextItem">{description}</p>
      </div>
    );
  };
  return (
    <>
      <div className="dashboardNewWorld">
        <div className="dashboardNewWorldContent">
          <p className="sub-header-text uppercase font-maison-neue-medium">
            THE FUTURE OF DIRECT STAYS
          </p>
          <p className="header-text text-28-36 md:text-40-48 lg:text-56-64">
            What is Dtravel?
          </p>
          <p className="sub-text-description font-maison-neue hidden lg:block">
            Grow and scale your hospitality business with Dtravel’s innovative booking infrastructure. Accept crypto payments to lower fees, eliminate the need for intermediaries, and take control over your booking terms and payouts. Earn real-value rewards with every transaction and participate in the future success of the book direct movement.
          </p>
          <p className="sub-text-description font-maison-neue block lg:hidden">
            Grow and scale your hospitality business with Dtravel’s innovative booking infrastucture.
          </p>
          <div className="flex items-start moreBtn">
            <a href={'/about'} rel="noreferrer">
              <div className="flex items-center px-5 h-[56px] md:h-[64px] rounded-xl border-2 border-white cursor-pointer">
                <span className="mr-3 text-white text-16-20 md:text-18-24 font-maison-neue font-medium">
                  More about us
                </span>
                <Image src={ic_arrow_right_white} alt="" width={24} height={24} />
              </div>
            </a>
          </div>
          <div className="itemGroup">
            {renderItem(
              ic_globe,
              'Peer-to-peer',
              'A travel ecosystem powered by smart contracts reduces costs and enables guest-to-host bookings without intermediaries.',
            )}
            {renderItem(
              ic_blockchain,
              'Better Economics              ',
              'Lower fees, greater flexibility and unrestricted communications create a better travel booking experience for everyone.',
            )}
            {renderItem(
              ic_chart_pie,
              'Complete Ownership',
              'Shape the future of Dtravel by submitting improvement proposals, voting on them and earning rewards by contributing.',
            )}
            {renderItem(
              ic_planet,
              'Future-proof',
              'Built with blockchain tech and smart contracts, Dtravel enables you to transact transparently, trustlessly and efficiently.',
              true
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNewWorld;
