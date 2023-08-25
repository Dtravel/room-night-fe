import DashboardDecentralized from './DashboardDecentralized'
import DashboardIntroduction from './DashboardIntroduction'
import DashboardNativeToken from './DashboardNativeToken'
import DashboardNewWorld from './DashboardNewWorld'
import DashboardPress from './DashboardPress'
import DashboardRoadMap from './DashboardRoadMap'
import LayoutHome from '@dtravel/components/layout/LayoutHome'
import React, { useEffect, useState } from 'react'

interface Props {
  isMobile: boolean
}
export const EXTERNAL_LINK = {
  TRVL: 'https://trvl.com',
  EARN: 'https://trvl.com/earn',
  DISCORD: 'https://discord.com/invite/dtravel',
  TWITTER: 'https://twitter.com/DtravelDAO',
  BLOG: 'https://dtravel.com/blog',
  TERMS_CONDITION: '/terms-and-conditions',
  POLICY: '/privacy-policy',
  DAO: '/DAO',
  PASSPORT: 'https://trvl.com/passport'
}
const Dashboard: React.FC<Props> = ({ isMobile }) => {
  const [innerHeight, setInnerHeight] = useState<number>(0)

  useEffect(() => {
    setInnerHeight(window.innerHeight)
  }, [])

  return (
    <LayoutHome>
      <>
        <DashboardIntroduction isMobile={isMobile} />
        <DashboardNewWorld />
        <DashboardRoadMap heightWindow={innerHeight} isMobile={isMobile} />
        <DashboardNativeToken />
        <DashboardDecentralized />
        <DashboardPress />
      </>
    </LayoutHome>
  )
}

export default Dashboard
