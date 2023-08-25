import React, { useEffect } from 'react'
import { NextPage } from 'next'
import MerchantReviewItem from './MerchantReviewItem'
import { isEmpty } from '@dtravel/utils/common'
import ReviewScrollHorizontal from '../common/ReviewScrollHorizontal'
import { getReviews } from '@dtravel/helpers/api/property'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setHostReviewSpecial } from '@dtravel/redux/slices/property'
import { filterReview } from '@dtravel/helpers/utils/common'

interface Props { }

const MerchantLandingSpecialReviews: NextPage<Props> = () => {
  const dispatch = useAppDispatch()
  const { hostReviewSpecial, landingSetting } = useAppSelector((state) => state.property)
  const fetchData = async () => {
    if (landingSetting?.userId) {
      try {
        const res: any = await getReviews({ searchType: 'host', isStrict: true, hostId: landingSetting?.userId })
        // const res: any = await getHostReview('770f5e0d-9a3b-4515-8112-80cf140ef0a3')
        if (res.success) dispatch(setHostReviewSpecial(filterReview(res?.data)))
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [landingSetting?.userId])
  if (isEmpty(hostReviewSpecial)) return <></>
  return (
    <div className="pt-[64px] xl:pt-[80px]" id={'reviews'}>
      <div className="bg-white w-full pt-[64px] xl:pt-[80px] border-t-[0.5px] border-t-[#00000026]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-[16px] justify-between mb-[32px] lg:mb-[64px] xl:mb-[80px]">
          <div className="w-full lg:w-1/2 lg:pr-[64px] xl:pr-[96px]">
            <p className="text-grayscale-900 font-inter-500 lg:font-inter-600 text-28-36 lg:text-40-40 tracking-[-0.03em] lg:tracking-[-0.02em]">
              Reviews
            </p>
          </div>
          <p className="text-grayscale-600 font-inter-400 text-20-28 w-full lg:w-1/2">{landingSetting?.reviews?.title || 'Real experiences, real opinions. See what our guests have to say about their stay.'}</p>
        </div>
        {!isEmpty(hostReviewSpecial) && (
          <ReviewScrollHorizontal total={hostReviewSpecial.length}>
            {hostReviewSpecial.map((item: any, idx: number) => {
              if (idx > 10) return null
              return <MerchantReviewItem key={item.id} {...item} id={item.id} />
            })}
          </ReviewScrollHorizontal>
        )}
      </div>
    </div>
  )
}

export default MerchantLandingSpecialReviews
