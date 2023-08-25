/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { IconPlus, IconClose } from '@dtravel/components/common/Icons'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props { }

const MerchantLandingSpecialFAQ: NextPage<Props> = () => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const { color } = useTheme()
  const [collapse, setCollapse] = useState<Array<number>>([])

  if (isEmpty(landingSetting?.faq)) return null
  return (
    <>
      <div className='pt-[64px] xl:pt-[80px]' id={'FAQ'}>
        <div className="bg-white w-full pt-[64px] xl:pt-[80px] border-t-[0.5px] border-t-[#00000026]">
          <div className="flex flex-col lg:flex-row lg:items-start md:gap-[16px] justify-between mb-[32px] xl:mb-[64px]">
            <div className='w-full lg:w-1/2 lg:pr-[64px] xl:pr-[96px]'>
              <p className="text-grayscale-900 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em]">
                FAQ
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[12px] w-full">
            {!isEmpty(landingSetting?.faq) && landingSetting?.faq.map((el: any, idx: number) => {
              const isOpened = collapse.includes(idx)
              return (
                <div
                  key={`faq_${idx}`}
                  className="bg-[#F5F5F5] p-[32px] md:p-[48px] rounded-[24px]"
                >
                  <div className={`flex justify-between items-start ${isOpened ? 'mb-[24px]' : ''}`}>
                    <p className='font-inter-400 text-grayscale-900 text-20-24 pr-[16px] break-word'>
                      {el.question}
                    </p>
                    <span
                      className='cursor-pointer'
                      onClick={() => {
                        if (isOpened) setCollapse(collapse.filter((v: number) => v !== idx))
                        else setCollapse([...collapse, idx])
                      }}
                    >
                      {isOpened ?
                        <IconClose color={color} /> :
                        <IconPlus color={color} />
                      }
                    </span>
                  </div>
                  {isOpened && !isEmpty(el.answer) && el.answer.map((v: any, index: number) => {
                    const notHasBrTag = (index == el.answer.length - 1) ||
                      (v.substring(0, 1) === '•' && el.answer[index + 1]?.substring(0, 1) === '•') ||
                      (v.substring(0, 1) !== '•' && el.answer[index + 1]?.substring(0, 1) === '•')
                    const hasFirstDot = v.substring(0, 1) === '•'
                    return (
                      <Fragment key={`answer_${index}`}>
                        <p className={`font-inter-400 text-grayscale-600 text-20-24 break-word ${hasFirstDot ? 'mx-3' : ''}`}>
                          {v}
                        </p>
                        {/* {typeof v === "string" ?
                          <p className="font-inter-400 text-grayscale-600 text-20-24">
                            {v}
                          </p> :
                          <>
                            <p className="font-inter-400 text-grayscale-600 text-20-24">
                              {v.title}
                            </p>
                            <ul className='list-none custom-ul'>
                              {!isEmpty(v.sub) && v.sub.map((elm: string, i: number) => {
                                return (
                                  <li key={'sub-' + i} className={'flex font-inter-400 text-grayscale-600 text-20-24'}>
                                    {elm}
                                  </li>
                                )
                              })}
                            </ul>
                          </>
                        } */}
                        {!notHasBrTag && <br></br>}
                      </Fragment>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default MerchantLandingSpecialFAQ
