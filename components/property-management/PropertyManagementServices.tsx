/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import { IconArrowDown } from '../common/Icons'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import clsx from 'clsx'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'

interface Props {
  data: any
}

const PropertyManagementServices: NextPage<Props> = ({ data }) => {
  const { color } = useTheme()
  const windowDimensions = useWindowDimensions()
  const isMobileTablet = windowDimensions.width < 1024
  const { service } = data
  const [collapse, setCollapse] = useState<Array<number>>([])

  if (isEmpty(service)) return null
  return (
    <>
      <div className="bg-white w-full pt-[64px] lg:pt-[80px] xl:pt-[112px]" id={'services_management'}>
        <div className="flex flex-col md:gap-[16px] justify-between  mb-[32px] lg:mb-[48px] xl:mb-[64px]">
          <p className="text-grayscale-800 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em] text-center">
            {service?.header}
          </p>
          <p className="text-grayscale-600 font-inter-400 text-16-24 text-center">
            {service?.subHeader}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-[4px] lg:gap-0 rounded-[24px] lg:rounded-[40px] h-auto ">
          <div
            className='w-full lg:w-1/2 rounded-tl-[24px] rounded-tr-[24px] lg:rounded-tr-[0px] lg:rounded-tl-[40px] lg:rounded-bl-[40px]'
          >
            <img src={service?.imageUrl} className="w-full h-full object-cover rounded-tl-[24px] rounded-tr-[24px] lg:rounded-tr-[0px] lg:rounded-tl-[40px] lg:rounded-bl-[40px]" alt="" />
          </div>
          <div className='w-full lg:w-1/2 lg:bg-grayscale-100 lg:p-[48px] xl:p-[64px] rounded-tr-[24px] rounded-br-[24px] lg:rounded-tr-[40px] lg:rounded-br-[40px]'>
            <div className="flex flex-col justify-center gap-[4px] w-full h-full">
              {!isEmpty(service?.contents) && service?.contents.map((el: any, idx: number) => {
                const isOpened = collapse.includes(idx)
                const isFirst = idx == 0
                const isLast = idx == service?.contents?.length - 1
                return (
                  <Accordion
                    key={idx}
                    expanded={isOpened}
                    onChange={() => {
                      if (isOpened) setCollapse(collapse.filter((v: number) => v !== idx))
                      else setCollapse([idx])
                      // else setCollapse([...collapse, idx])
                    }}
                    className={clsx(
                      "bg-grayscale-200 px-6 py-3",
                      isFirst && 'lg:rounded-tl-[16px] lg:rounded-tr-[16px]',
                      isLast && 'rounded-bl-[24px] rounded-br-[24px] lg:rounded-bl-[16px] lg:rounded-br-[16px]',
                    )}
                    style={{ boxShadow: 'none', border: 'none' }}
                    sx={{
                      '&:before': {
                        backgroundColor: 'transparent !important',
                      },
                      '&.Mui-expanded': {
                        margin: 0
                      },
                      '&.MuiAccordion-root': {
                        backgroundColor: '#EDEDED'
                      },
                      '&.MuiAccordion-root:first-of-type': {
                        borderTopLeftRadius: isMobileTablet ? 0 : 16,
                        borderTopRightRadius: isMobileTablet ? 0 : 16
                      },
                      '&.MuiAccordion-root:last-of-type': {
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<IconArrowDown color={color} />}
                      className="p-0 m-0"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <p className='font-inter-500 text-grayscale-800 text-16-24 break-word'>
                        {el.title}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      '&.MuiAccordionDetails-root': {
                        padding: 0
                      }
                    }}>
                      {el.subTitle && <p className='mb-2 text-grayscale-800 font-inter-400 text-14-18'>{el.subTitle}</p>}
                      <p className={`font-inter-400 text-grayscale-600 break-word text-14-20 whitespace-pre-line`}>
                        {el.content}
                      </p>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyManagementServices
