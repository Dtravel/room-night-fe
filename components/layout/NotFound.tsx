import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDomainInfo } from '@dtravel/helpers/api/merchant'
import { converHostDomain, isIP } from '@dtravel/utils/common'

interface Props { }

const NotFound: React.FC<Props> = () => {
  const [isActive, setActive] = useState<boolean>(false)

  const checkDomain = async () => {
    const hostDomain = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const publicSiteDomain = process.env.NEXT_PUBLIC_SITE_URL
    if (hostDomain !== publicSiteDomain && !isIP(hostDomain)) {
      try {
        const domain = converHostDomain(hostDomain)
        const res: any = await getDomainInfo({ domain })
        if (res?.data?.id) setActive(true)
      } catch (error) { console.error(error) }
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') checkDomain()
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'flex justify-center items-center min-h-screen'}>
      <div className='font-inter-700 text-240-290 xl:text-400-484 text-neutral-100 absolute z-0 max-w-[100vw] overflow-hidden flex items-center justify-center'>404</div>
      <div className={'text-center z-10'}>
        <h1 className='font-inter-600 text-48-48 md:text-64-64 xl:text-88-88 mb-[16px] md:mb-[24px] tracking-[-0.04em] xl:tracking-[-0.035em] text-neutral-900 px-[16px] md:px-0'>Page not found</h1>
        <p className='mb-[40px] text-neutral-600 font-inter-400 text-20-28 md:text-24-36 px-[16px] md:px-0'>{"We can't seem to find the page you're looking for."}</p>
        <div className='fixed md:static bottom-[32px] flex items-center justify-center w-full px-[16px]'>
          <Link
            href={(!isActive && process.env.NEXT_PUBLIC_SITE_URL) ? process.env.NEXT_PUBLIC_SITE_URL : '/'}
            passHref
            className={'bg-white px-[24px] h-[56px] flex items-center justify-center rounded-[12px] border border-neutral-300 hover:border-neutral-900 contact-us-backdrop-filter w-full md:w-auto'}
          >
            <span className='font-inter-500 text-16-20 text-neutral-900'>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
