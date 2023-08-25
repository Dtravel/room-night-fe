import React from 'react'

interface Props {
  title: string | React.ReactNode | React.ReactNode[]
  children?: React.ReactNode
}

const AboutContentDetail: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h3 className={'font-editorial-new font-normal text-24-32 text-sand-8 pb-[16px] pt-[48px]'}>{title}</h3>
      <div className={'font-maison-neue font-normal text-18-28 text-sand-8'}>{children}</div>
    </div>
  )
}

export default AboutContentDetail
