/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import { IconPlus, IconClose } from '@dtravel/components/common/Icons'
// import { useAppSelector } from '@dtravel/redux/hooks'

interface Props {
  data: any
}

const PropertyManagementFAQ: NextPage<Props> = ({ data }) => {
  // const { landingSetting } = useAppSelector((state) => state.property)
  const { color } = useTheme()
  const [collapse, setCollapse] = useState<Array<number>>([])

  if (isEmpty(data?.faq)) return null
  return (
    <>
      <div className="bg-white w-full pt-[64px] lg:pt-[80px] xl:pt-[112px]" id={'FAQ_management'}>
        <div className="flex flex-col md:gap-[16px] justify-between  mb-[32px] lg:mb-[48px] xl:mb-[64px]">
          <p className="text-grayscale-800 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em] text-center">
            FAQ
          </p>
        </div>
        <div className="flex flex-col gap-[12px] w-full">
          {!isEmpty(data?.faq) && data?.faq.map((el: any, idx: number) => {
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
                  <div
                    className='cursor-pointer min-w-[24px]'
                    onClick={() => {
                      if (isOpened) setCollapse(collapse.filter((v: number) => v !== idx))
                      else setCollapse([...collapse, idx])
                    }}
                  >
                    {isOpened ?
                      <IconClose color={color} /> :
                      <IconPlus color={color} />
                    }
                  </div>
                </div>
                {isOpened && !isEmpty(el.answer) && el.answer.map((v: any, index: number) => {
                  const notHasBrTag = (index == el.answer.length - 1) ||
                    (v.substring(0, 1) === '•' && el.answer[index + 1]?.substring(0, 1) === '•') ||
                    (v.substring(0, 1) !== '•' && el.answer[index + 1]?.substring(0, 1) === '•')
                  const hasFirstDot = v.substring(0, 1) === '•'
                  return (
                    <Fragment key={`answer_${index}`}>
                      <p
                        className={`font-inter-400 text-grayscale-600 text-20-24 break-word ${hasFirstDot ? 'mx-3' : ''}`}
                        dangerouslySetInnerHTML={{ __html: v }}
                      >
                      </p>
                      {!notHasBrTag && <br></br>}
                    </Fragment>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PropertyManagementFAQ
