import logo from '@dtravel/assets/icons/logo.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { EXTERNAL_LINK } from './Dashboard'

const DashboardFooter = () => {
  const FOOTERS: any = {
    general: [
      {
        label: 'General',
        link: '',
      },
      {
        label: 'About Us',
        link: '/about',
      },
    ],
    community: [
      {
        label: 'Community',
        link: '',
      },
      {
        label: 'Discord',
        link: EXTERNAL_LINK.DISCORD,
      },
      {
        label: 'Twitter',
        link: EXTERNAL_LINK.TWITTER,
      },
      {
        label: 'Blog',
        link: EXTERNAL_LINK.BLOG,
      },
    ],
    trvl_token: [
      {
        label: 'TRVL Token',
        link: '',
      },
      {
        label: 'TRVL.com',
        link: EXTERNAL_LINK.TRVL,
      },
      {
        label: 'Etherscan',
        link: 'https://etherscan.io/token/0xd47bdf574b4f76210ed503e0efe81b58aa061f3d/',
      },
      {
        label: 'BscScan',
        link: 'https://bscscan.com/token/0x6a8fd46f88dbd7bdc2d536c604f811c63052ce0f',
      },
      {
        label: 'Security Audits',
        link: 'https://statics.trvl.com/documentations/PeckShield-Audit-Report-ERC20-TRVL-v1.0.pdf',
      },
    ],
    legal: [
      {
        label: 'Legal',
        link: '',
      },
      {
        label: 'Privacy & Cookie Policy',
        link: '/privacy-policy',
      },
      {
        label: 'Terms of Use',
        link: '/terms-and-conditions',
      },
    ],
  }

  const router = useRouter()
  const isAboutPage = router.pathname.includes('/about')

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div className="dashboardFooter">
        <div className={'mr-auto ml-auto px-[16px] md:px-[32px] lg:px-[40px] xl:max-w-[1304px] py-[88px]'}>
          <div className="block md:flex md:gap-[16px] lg:gap-[24px] mt-[32px] w-full">
            <div className="flex flex-col md:w-2/12 md:max-w-[184px]">
              <span className="text-logo mb-8">
                <Image src={logo} alt="dtravel" width={98} height={16} />
              </span>
            </div>
            <div className="lg:w-8/12 lg:max-w-[808px]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] lg:gap-[24px]">
                {Object.keys(FOOTERS).map((key: string) => {
                  return (
                    <div key={key} className="flex flex-col mb-[60px] md:mb-0">
                      {FOOTERS[key].map((item: any, index: number) => {
                        if (item.link === '/about' && isAboutPage)
                          return (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <a
                              className={'mb-[16px] text-16-20 text-sand-6 font-maison-neue cursor-pointer'}
                              key={index}
                              onClick={scrollToTop}
                            >
                              {item.label}
                            </a>
                          )
                        if (item.link)
                          return (
                            <a
                              className={`mb-[16px] text-16-20 ${
                                index === 0 ? 'text-sand-8 font-maison-neue-medium' : 'text-sand-6 font-maison-neue'
                              }`}
                              key={index}
                              href={item.link}
                              target={'_blank'}
                              rel="noreferrer"
                            >
                              {item.label}
                            </a>
                          )
                        return (
                          <span
                            className={`mb-[16px] text-16-20 ${
                              index === 0 ? 'text-sand-8 font-maison-neue-medium' : 'text-sand-6 font-maison-neue'
                            }`}
                            key={index}
                          >
                            {item.label}
                          </span>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
            {/*<div className="flex flex-col w-1/6 mobile-hidden" />*/}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardFooter
