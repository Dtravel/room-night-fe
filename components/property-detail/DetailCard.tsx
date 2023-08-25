import React from 'react'

interface Props {
  title: string
  extraTitle?: string
  hideBorderBot?: boolean
  titleClass?: string
  extraTitleClass?: string
  children?: React.ReactNode
}

const DetailCard: React.FC<Props> = ({ title, extraTitle, hideBorderBot, children, extraTitleClass, titleClass }) => {
  return (
    <div className={`py-[32px] lg:py-[48px] ${hideBorderBot ? '' : 'border-b border-solid border-neutral-300'}`}>
      <p
        className={
          `font-inter-500 ${extraTitle ? 'mb-[4px]' : ''} text-20-24 md:text-24-32 text-neutral-900` +
          (titleClass || '')
        }
      >
        {title}
      </p>
      {extraTitle && <p className={extraTitleClass || 'text-18-24'}>{extraTitle}</p>}

      <div className={'mt-[16px]'}>{children}</div>
    </div>
  )
}

export default DetailCard
