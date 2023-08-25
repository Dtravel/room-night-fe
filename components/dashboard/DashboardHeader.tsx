import { EXTERNAL_LINK } from './Dashboard';
import ic_close_white from './images/ic_close_white.svg';
import ic_menu from './images/ic_menu.svg';
import logo from './images/logo.svg';
import logo_white from './images/logo_white.svg';
import { Drawer } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const DashboardHeader = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isAboutPage = router.pathname.includes('/about');

  const renderMenuContent = () => {
    return (
      <>
        <span
          className={`menu-item text-24-32 font-monument-extended-bold lg:font-maison-neue lg:hidden`}
        >
          <a href={'/'} rel="noreferrer">
            Homepage
          </a>
        </span>
        <span
          className={`menu-item text-24-32 font-monument-extended-bold ${
            isAboutPage ? 'lg:maison-neue-medium' : 'lg:font-maison-neue'
          }`}
        >
          <a
            href={'/about'}
            rel="noreferrer"
            className={isAboutPage ? 'lg:text-sand-8 lg:font-medium' : ''}
          >
            About
          </a>
        </span>
        <span className="menu-item text-24-32 font-monument-extended-bold lg:font-maison-neue">
          <a href={EXTERNAL_LINK.BLOG} target="_blank" rel="noreferrer">
            Blog
          </a>
        </span>
        <span className="menu-item text-24-32 font-monument-extended-bold lg:font-maison-neue">
          <a href={EXTERNAL_LINK.DISCORD} target="_blank" rel="noreferrer">
            Discord
          </a>
        </span>
        <span className="menu-item text-24-32 font-monument-extended-bold lg:font-maison-neue">
          <a href={EXTERNAL_LINK.TRVL} target="_blank" rel="noreferrer">
            TRVL Token
          </a>
        </span>
      </>
    );
  };
  return (
    <>
      <div className="dashboardHeader">
        <a href={'/'} rel="noreferrer">
          <Image src={logo} alt="dtravel" />
        </a>
        <div className="hidden lg:block">{renderMenuContent()}</div>
        <div className="lg:hidden">
          <Image
            src={ic_menu}
            alt=""
            onClick={() => setOpen(true)}
            role="presentation"
            className="cursor-pointer"
          />
        </div>
      </div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        className="dashboard-menu-mobile lg:hidden"
      >
        <div className="bg-red-6 dashboardDrawer">
          <div className="flex items-center justify-between">
            <span
              onClick={() => setOpen(false)}
              role="presentation"
              className="cursor-pointer"
            >
              <Image src={logo_white} alt="dtravel" />
            </span>
            <span
              onClick={() => setOpen(false)}
              role="presentation"
              className="cursor-pointer"
            >
              <Image src={ic_close_white} alt="" />
            </span>
          </div>
          <div className="dashboardDrawerMenu justify-center">
            {renderMenuContent()}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DashboardHeader;
