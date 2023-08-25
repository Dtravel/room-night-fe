import React, { useState } from 'react'
import Image from 'next/image'
import logo from './images/logo.svg'
import ic_menu from './images/ic_menu.svg'
import ic_close from './images/ic_close.svg'
import { Drawer } from '@mui/material'
import { EXTERNAL_LINK } from '@dtravel/components/dashboard/Dashboard'

const DAOCommunity = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="commonBG dashboardUpgrade daoCommunity">
        <div className="dashboardHeaderMobile">
          <span>
            <Image src={logo} alt="dtravel" />
          </span>

          <div className="pc-hidden">
            <span onClick={() => setOpen(true)} role="presentation" className="cursor-pointer">
              <Image src={ic_menu} alt="" />
            </span>
          </div>
        </div>
        <p className="header-upgrade-text">The DAO</p>
        <p className="title-upgrade">Community-driven travel</p>
        <p className="sub-text-description max-w-[948px]">Dtravel is a Decentralized Autonomous Organization (DAO). A DAO model empowers community members to make decisions that guide the platform.</p>
      </div>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} className="dashboard-menu-mobile pc-hidden">
        <div className="dashboardDrawer">
          <div className="dashboardDrawerHeader">
            <span onClick={() => setOpen(false)} role="presentation" className="cursor-pointer">
              <Image src={logo} alt="dtravel" />
            </span>
            <span onClick={() => setOpen(false)} role="presentation" className="cursor-pointer">
              <Image src={ic_close} alt="" />
            </span>
          </div>
          <div className="dashboardDrawerMenu">
            <span className="menu-item">
              <a href={EXTERNAL_LINK.DISCORD} target="_blank" rel="noreferrer">
                DISCORD
              </a>
            </span>
            <span className="menu-item">
              <a href={EXTERNAL_LINK.BLOG} target="_blank" rel="noreferrer">
                BLOG
              </a>
            </span>
            <span className="menu-item">
              <a href={EXTERNAL_LINK.TRVL} target="_blank" rel="noreferrer">
                TRVL Token
              </a>
            </span>
          </div>
          <span className="dashboardDrawerFooter">
            <span className="privacy-text">
              <a href={EXTERNAL_LINK.POLICY} target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
            </span>
            <span className="privacy-text">
              <a href={EXTERNAL_LINK.TERMS_CONDITION} target="_blank" rel="noreferrer">
                Terms & Conditions
              </a>
            </span>
          </span>
        </div>
      </Drawer>
    </>
  )
}

export default DAOCommunity
