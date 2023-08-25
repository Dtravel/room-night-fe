import React from 'react'
import { NextPage } from 'next'
import { setIsOpenSelectCurrency } from '@dtravel/redux/slices/common'
import ic_arrow_down from '@dtravel/assets/icons/ic_arrow_down.svg'
import Image from 'next/image'
import SocialFooter from '../common/SocialFooter'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import Link from 'next/link'
import { DTRAVEL_URL } from '@dtravel/helpers/constants/constants'

interface Props {
  hiddenCurrency?: boolean
}

const LandingFooter: NextPage<Props> = ({ hiddenCurrency }) => {
  const dispatch = useAppDispatch()
  const { businessInfor } = useAppSelector((state) => state.property)
  const { selectedCurrency } = useAppSelector((state) => state.common)
  return (
    <>
      <div className="w-full flex items-center justify-between py-[25px] text-12-16 font-inter-500 tracking-[-0.02em] text-grayscale-800 bg-white mt-[64px]">
        <div className="flex flex-col">
          <p className="mb-[2px] text-12-16 font-inter-500 text-grayscale-800">
            {businessInfor?.hostName || businessInfor?.contactName}
          </p>
          <Link href={DTRAVEL_URL} passHref target={"_blank"}>
            <span className="font-inter-400 text-10-12 text-grayscale-600 hover:text-grayscale-800">Powered by Dtravel</span>
          </Link>
        </div>
        <div className="flex gap-[24px]">
          <SocialFooter />
          {!hiddenCurrency &&
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() => {
                dispatch(setIsOpenSelectCurrency(true))
              }}
            >
              {selectedCurrency.type === 'CRYPTO' ? (
                <span className={'rounded-[100px] px-[4px] py-[2px] text-white'}>
                  <Image src={selectedCurrency.icon} alt={selectedCurrency.key} width={16} height={16} />
                </span>
              ) : (
                <span
                  className={
                    'mr-[4px] bg-grayscale-900 rounded-[100px] px-[4px] py-[2px] text-white font-inter-600 text-10-12 tracking-[0.04em] uppercase'
                  }
                >
                  {selectedCurrency.symbol}
                </span>
              )}
              <span className={'mr-[4px] tracking-[-0.02em] text-grayscale-800 text-12-16 font-inter-500'}>
                &nbsp;{selectedCurrency.key}
              </span>
              <Image src={ic_arrow_down} alt="" width={16} height={16} />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default LandingFooter
