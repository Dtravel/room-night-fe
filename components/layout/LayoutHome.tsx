import DashboardFooter from '@dtravel/components/dashboard/DashboardFooter'
import DashboardHeader from '@dtravel/components/dashboard/DashboardHeader'
import Head from 'next/head'
import React from 'react'

interface Props {
  title?: string
  description?: string
  children?: React.ReactNode
}

const LayoutHome: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title || 'Dtravel'}</title>
        <meta name="description" content={props.description || 'Dtravel'} />
      </Head>
      <div className="dashboardContainer bg-sand-2">
        <DashboardHeader />
        {props.children}
        <DashboardFooter />
      </div>
    </>
  )
}

export default LayoutHome
