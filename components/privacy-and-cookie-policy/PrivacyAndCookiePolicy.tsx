import IconButton from '@mui/material/IconButton'
import React, { useEffect, useState } from 'react'
import ic_close from '@dtravel/assets/icons/ic_close.svg'
import Image from 'next/image'

const PrivacyAndCookiePolicy = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // check if already open this popup before
  useEffect(() => {
    const isClosedPolicy = window.localStorage.getItem('closedPolicy')
    if (!isClosedPolicy || isClosedPolicy === 'false') {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    window.localStorage.setItem('closedPolicy', 'true')
    setIsOpen(false)
  }

  return (
    <div
      className={`fixed bottom-[16px] lg:bottom-[32px] right-[16px] lg:right-[32px] p-[16px] bg-white rounded-[16px] flex items-center gap-[16px] max-w-[536px] ${
        isOpen ? '' : 'hidden'
      }`}
      style={{ boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)', zIndex: 100 }}
    >
      <div className={'font-maison-neue-medium text-12-16 text-neutral-7'}>
        This site uses cookies to provide you with a great user experience. By using Dtravel you accept our use of
        cookies. For more details see our{' '}
        <a
          href={(process.env.NEXT_PUBLIC_SITE_URL || 'https://dtravel.com') + '/privacy-policy'}
          target="_blank"
          rel="noreferrer"
          className={'text-ocean-6 hover:underline'}
        >
          Privacy & Cookie Policy
        </a>
        .
      </div>
      <IconButton size={'small'} onClick={handleClose}>
        <Image src={ic_close} alt={'ic_close'} />
      </IconButton>
    </div>
  )
}

export default PrivacyAndCookiePolicy
