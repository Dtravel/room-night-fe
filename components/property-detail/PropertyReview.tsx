import { NextPage } from 'next'
import React, { useEffect } from 'react'
import ReviewScrollHorizontal from '../common/ReviewScrollHorizontal'
import MerchantReviewItem from '../merchant-landing-special/MerchantReviewItem'
import { isEmpty } from '@dtravel/utils/common'
import DetailCard from './DetailCard'
import { getReviews } from '@dtravel/helpers/api/property'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setPropertyReview } from '@dtravel/redux/slices/property'
import { filterReview } from '@dtravel/helpers/utils/common'

interface Props {
  pmsPropertyId: string
  userId: string
}

const PropertyReview: NextPage<Props> = ({ pmsPropertyId, userId }) => {
  const dispatch = useAppDispatch()
  const { propertyReview } = useAppSelector((state) => state.property)
  const fetchData = async () => {
    try {
      const res: any = await getReviews({
        searchType: 'listing',
        isStrict: false,
        pmsListingId: pmsPropertyId,
        hostId: userId,
        pageSize: 100,
        minRate: 8, // from 4 star
      })
      if (res.success) {
        dispatch(setPropertyReview(filterReview(res?.data)))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (pmsPropertyId) fetchData()
    // eslint-disable-next-line
  }, [pmsPropertyId])

  return (
    <>
      {!isEmpty(propertyReview) && (
        <div id={'reviews'}>
          <DetailCard title={'Reviews'}>
            <p className="mb-[48px] text-grayscale-600 text-16-24 font-inter-400">
              Real experiences, real opinions. See what our guests have to say about their stay.
            </p>
            <ReviewScrollHorizontal total={propertyReview.length} numberInRow={2}>
              {propertyReview.map((item: any) => {
                // if (idx > 10) return null
                return <MerchantReviewItem key={item.id} {...item} id={item.id} numberInRow={2} />
              })}
            </ReviewScrollHorizontal>
          </DetailCard>
        </div>
      )}
    </>
  )
}

export default PropertyReview
