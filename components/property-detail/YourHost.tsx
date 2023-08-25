import ContactHost from '@dtravel/components/common/ContactHost'
import DetailCard from '@dtravel/components/property-detail/DetailCard'
import { Contact } from '@dtravel/helpers/interfaces/property'
import React from 'react'
import { useAppSelector } from '@dtravel/redux/hooks'

interface Props extends Contact {
  hideBorderBot?: boolean
}

const YourHost: React.FC<Props> = (props) => {
  const { businessInfor } = useAppSelector((state) => state.property)
  const hostName = businessInfor?.contactName || props?.contactName
  return (
    <DetailCard
      title={`About ${hostName ? `${hostName}` : 'us'}`}
      titleClass={'capitalize'}
      hideBorderBot={props.hideBorderBot}
    >
      {businessInfor?.bio && (
        <div className={'font-inter-400 text-16-24 text-neutral-900 mb-[24px]'}>{businessInfor.bio}</div>
      )}
      <ContactHost {...props} />
    </DetailCard>
  )
}

export default YourHost
