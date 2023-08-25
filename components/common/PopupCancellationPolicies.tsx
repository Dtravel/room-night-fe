import React, { useEffect, useState } from 'react'
import { CancelPolicies } from '@dtravel/helpers/interfaces/property'
import BasicDialog from '../ui/BasicDialog'
import { useRouter } from 'next/router'
import { useAppSelector } from '@dtravel/redux/hooks'
import { getCancelPolicy } from '@dtravel/helpers/api/property'
import { isEmpty } from '@dtravel/utils/common'
interface Props {
  cancelPolicies?: CancelPolicies
  popupShowDefaultFooter?: boolean
  propertyId?: string
}

const PopupCancellationPolicies: React.FC<Props> = ({ cancelPolicies, popupShowDefaultFooter, propertyId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const isSummaryPage = router.pathname.includes('/booking-summary/')
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const [data, setData] = useState<any>({})

  const fetchCancelPolicy = async () => {
    if (propertyId) {
      try {
        const res: any = await getCancelPolicy(propertyId, selectedCurrency?.key)
        if (res) setData(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (propertyId && !isSummaryPage) fetchCancelPolicy() // eslint-disable-next-line
  }, [selectedCurrency, propertyId])

  if (!cancelPolicies && isEmpty(data)) {
    return <>Cancellation Policy</>
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const renderContent = () => {
    return <p className={`mb-[24px] whitespace-pre-line ${popupShowDefaultFooter ? 'md:mb-[64px]' : ''} `}>
      {isSummaryPage ? cancelPolicies?.description || '' : data?.description || 'Please contact us for more details or if you need to cancel your reservation.'}
    </p>
  }

  return (
    <>
      <span className={'underline cursor-pointer'} onClick={() => setIsOpen(true)}>
        Cancellation Policy
      </span>
      <BasicDialog
        isOpen={isOpen}
        onClose={handleClose}
        title={'Cancellation Policy'}
        showDefaultFooter={popupShowDefaultFooter}
      >
        {renderContent()}
      </BasicDialog>
    </>
  )
}

export default PopupCancellationPolicies
