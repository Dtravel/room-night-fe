import React from 'react'
import DetailCard from '@dtravel/components/property-detail/DetailCard'

const ACTIVITIES = ['New booking', 'Listing updated', 'Booking cancelled', 'New booking', 'Listing minted']

const RecentActivity = () => {
  return (
    <DetailCard title={'Recent activity'} extraTitle={'On-chain activity for this listing'} hideBorderBot>
      {ACTIVITIES.map((item, index) => {
        return (
          <div
            key={index}
            className={`py-5 border-solid border-sand-3 ${index === 0 ? 'pt-0' : ''}  ${
              index === ACTIVITIES.length - 1 ? '' : 'border-b'
            }`}
          >
            <p>{item}</p>
            <p className={'text-sand-6 text-12-16'}>May 1, 2022 • 8:54 AM</p>
          </div>
        )
      })}
    </DetailCard>
  )
}

export default RecentActivity
