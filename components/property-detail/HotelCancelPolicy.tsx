import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CancelPolicies } from '@dtravel/helpers/interfaces/property'
import DetailCard from '@dtravel/components/property-detail/DetailCard'
import ViewMoreContent from '@dtravel/components/common/ViewMoreContent'
import { useAppSelector } from '@dtravel/redux/hooks'
import { getCancelPolicy } from '@dtravel/helpers/api/property'

interface Props {
  cancelPolicy?: string
  cancelPolicies: CancelPolicies
  propertyId?: string
}

const HotelCancelPolicy: React.FC<Props> = ({ cancelPolicies, cancelPolicy, propertyId }) => {
  const router = useRouter()
  const isSummaryPage = router.pathname.includes('/booking-summary/')
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const [data, setData] = useState<any>({})

  const fetchCancelPolicy = async () => {
    if (propertyId) {
      try {
        // const res: any = await getCancelPolicy('2674', selectedCurrency?.key)
        const res: any = await getCancelPolicy(propertyId, selectedCurrency?.key)
        if (res) setData(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (propertyId && !isSummaryPage) fetchCancelPolicy() // eslint-disable-next-line
  }, [selectedCurrency])
  return (
    <DetailCard title={'Cancellation policy'} hideBorderBot={isSummaryPage}>
      <div className={'text-18-28 text-neutral-900'}>
        <ViewMoreContent
          content={isSummaryPage ? cancelPolicies?.description || cancelPolicy || '' : data?.description || 'Please contact us for more details or if you need to cancel your reservation.'}
          numberOfLine={5}
        />
      </div>
    </DetailCard>
  )
}

export default HotelCancelPolicy
