import { isScrolledIntoView } from '@dtravel/helpers/utils/common';
import { useEffect, useState } from 'react';

const MENU = [
  {
    label: 'Mission',
    href: 'mission',
  },
  {
    label: 'Principles',
    href: 'principles',
  },
  {
    label: 'Contributors',
    href: 'contributors',
  },
  {
    label: 'Partners',
    href: 'partners',
  },
  {
    label: 'Advisors',
    href: 'advisors',
  },
  {
    label: 'FAQ',
    href: 'faq',
  },
];

const AboutSideBar = () => {
  const [active, setActive] = useState<string>('mission');

  useEffect(() => {
    const listId = MENU.map(item => item.href);
    document.addEventListener('scroll', function () {
      for (let id of listId) {
        const element = document.getElementById(id);
        if (element && isScrolledIntoView(element)) {
          setActive(id);
          break;
        }
      }
    });
    return () => {
      window.removeEventListener('scroll', function () { });
    };
  }, []);

  const handleClickMenu = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
    }
  };

  return (
    <div className={'lg:sticky lg:top-[64px] flex gap-[16px] lg:block'}>
      <ul
        className={
          'font-maison-neue font-medium text-16-20 w-full flex lg:block overflow-x-auto lg:overflow-hidden mb-[32px] lg:mb-48px md:mt-[-8px] border-b border-sand-4 lg:border-0 pb-[16px] hidden-scroll-bar'
        }
      >
        {MENU.map((item, index) => (
          <li
            key={index}
            className={
              'px-[8px] lg:px-0 lg:py-[8px] ' +
              (active === item.href
                ? 'text-sand-8 font-maison-neue-medium font-medium'
                : 'text-sand-6 font-maison-neue')
            }
          >
            <button onClick={() => handleClickMenu(item.href)}>
              {item.label}
            </button>
          </li>
        ))}
        {/*<li className={'md:py-[8px] px-[8px]'}>*/}
        {/*  <div className={'hidden md:block w-[32px] h-[1px] bg-sand-4'} />*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  className={*/}
        {/*    'md:py-[8px] px-[8px] min-w-[136px] overflow-hidden text-ellipsis whitespace-nowrap'*/}
        {/*  }*/}
        {/*>*/}
        {/*  <a*/}
        {/*    className={*/}
        {/*      'text-red-6 flex items-center gap-[4px] cursor-pointer font-medium'*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <span>Join our team</span>*/}
        {/*    <Image src={ic_arrow_right_lg} alt={'ic_arrow_right_lg'} />*/}
        {/*  </a>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

export default AboutSideBar;
