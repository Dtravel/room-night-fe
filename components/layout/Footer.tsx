import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@dtravel/redux/store'
import { setIsOpenSelectCurrency } from '@dtravel/redux/slices/common'
import Image from 'next/image'
import { useAppSelector } from '@dtravel/redux/hooks'
import ic_arrow_down from '@dtravel/assets/icons/ic_arrow_down.svg'
import SocialFooter from '../common/SocialFooter'
import Link from 'next/link'
import { DTRAVEL_URL } from '@dtravel/helpers/constants/constants'

interface Props { }

const Footer: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { propertyId } = router.query
  const { selectedCurrency } = useSelector((state: RootState) => state.common)
  const { businessInfor } = useAppSelector((state) => state.property)
  const isPropertyDetail = router.pathname.includes('/property') && propertyId
  const isSummaryPage = router.pathname.includes('/booking-summary/')

  return (
    <>
      <div className={`h-[80px] flex justify-between items-center px-[16px] md:px-[24px]`}>
        <div className="">
          <p className={'font-inter-500 text-12-16 text-grayscale-800'}>
            {businessInfor?.hostName || businessInfor?.contactName}
          </p>
          <Link href={DTRAVEL_URL} passHref target={"_blank"}>
            <p className={'font-inter-400 text-10-12 text-grayscale-600 hover:text-grayscale-800'}>Powered by Dtravel</p>
          </Link>
        </div>
        <div className='flex gap-[24px]'>
          <SocialFooter />
          {!isSummaryPage && (
            <button
              className={'hover:bg-sand-2 hover:rounded-[8px] inline-flex items-center gap-[4px]'}
              onClick={() => {
                dispatch(setIsOpenSelectCurrency(true))
              }}
            >
              {selectedCurrency.type === 'CRYPTO' ? (
                <span className={'mt-[4px]'}>
                  <Image src={selectedCurrency.icon} alt={selectedCurrency.key} width={16} height={16} />
                </span>
              ) : (
                <span
                  className={
                    'font-inter-600 text-10-12 tracking-[0.04em] bg-neutral-900 text-white rounded-[100px] px-[4px] py-[2px] uppercase'
                  }
                >
                  {selectedCurrency.symbol}
                </span>
              )}
              <span className={'font-inter-500 text-12-16 text-grayscale-800 tracking-[-0.02em]'}>
                &nbsp;{selectedCurrency.key}
              </span>
              <Image src={ic_arrow_down} alt="" width={16} height={16} />
            </button>
          )}
        </div>
      </div>
      {isPropertyDetail && <div className={'lg:hidden h-[96px]'} />}
    </>
  )
}

export default Footer
