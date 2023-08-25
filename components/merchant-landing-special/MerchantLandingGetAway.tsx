/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'
import BasicButton from '../ui/BasicButton'
import Link from 'next/link'
import { IconArroRight } from '../common/Icons'
import clsx from 'clsx'

interface Props { }

const MerchantLandingGetAway: NextPage<Props> = () => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const isRiley = landingSetting?.name === 'riley'
  if (isEmpty(landingSetting?.cta) || !isRiley) return null
  const { cta } = landingSetting
  const actionBtn = cta?.actions[0]
  return (
    <>
      <div className='pt-[64px] xl:pt-[80px]' id={'about'}>
        <div className="bg-white w-full pt-[64px] xl:pt-[80px] border-t-[0.5px] border-t-[#00000026]">
          <div
            className={clsx(
              "flex flex-col items-center justify-center gap-[16px] w-full h-[600px] bg-cover",
              "rounded-[24px] md:rounded-[32px] lg:rounded-[40px]",
              "p-[24px] md:p-[80px]"
            )}
            style={{
              backgroundImage: `url(${cta?.imageUrl})`,
              backgroundRepeat: 'no-repeat',
              // backgroundSize: 'auto 100%'
            }}
          >
            <p className='text-40-40 font-inter-600 text-white tracking-[-0.8px] text-center px-4'>{cta?.title}</p>
            <p className='mb-6 text-16-24 font-inter-400 text-grayscale-300 tracking-[-0.8px] text-center'>{cta?.subTitle}</p>
            {!isEmpty(actionBtn) &&
              <div className={'w-full md:w-auto'}>
                <Link href={actionBtn?.url} target="_blank" passHref>
                  <BasicButton
                    variant={'outlined'} size={'xxl'}
                    clases={'w-full bg-white'}
                  // color="white" 
                  >
                    <span className='text-20-24 font-inter-500 mr-3'>{actionBtn?.button}</span>
                    <IconArroRight color={landingSetting?.primaryColor} />
                  </BasicButton>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MerchantLandingGetAway
