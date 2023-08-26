import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import ReviewScrollHorizontal from '../common/ReviewScrollHorizontal'
import { isEmpty } from '@dtravel/utils/common'
import DetailCard from './DetailCard'
import { getHistoryTransactionBSC, getPropertyTransaction } from '@dtravel/helpers/api/property'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import clsx from 'clsx'
import BasicButton from '../ui/BasicButton'
import Link from 'next/link'
import moment from 'moment'

interface Props {
  propertyId: string
}
// https://docs.bscscan.com/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
const BookTransaction: NextPage<Props> = ({ propertyId }) => {
  const dispatch = useAppDispatch()
  const [history, setHistory] = useState<any[]>([])
  const [roomNightListing, setRoomNightListing] = useState<any>({})
  const fetchHistoryTransaction = async () => {
    try {
      const response: any = await getPropertyTransaction(propertyId)
      if (response?.data?.room_night_token) {
        setRoomNightListing(response?.data)
        const res: any = await getHistoryTransactionBSC(response?.data?.room_night_token)
        if (!isEmpty(res?.result)) setHistory(res?.result)
      }
    } catch (error) { }
  }
  useEffect(() => {
    fetchHistoryTransaction()
  }, [])
  console.log('history', history)

  return (
    <>
      {!isEmpty(history) && (
        <div>
          <DetailCard title={'Booking transaction'}>
            <p className="mb-[48px] text-grayscale-600 text-16-24 font-inter-400">
              Captures and preserves an on-chain history of all bookings, ensuring transparency and accountability in the reservation process.
            </p>
            <ReviewScrollHorizontal total={history.length} numberInRow={2}>
              {history.map((el: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className={clsx(
                      'w-[calc(100%_-_16px)] min-w-[calc(100%_-_16px)] md:w-[calc(50%_-_16px)] md:min-w-[calc(50%_-_16px)] lg:w-[calc(100%/3_-_10.67px)] lg:min-w-[calc(100%/3_-_10.67px)]',
                      'h-[160px]',
                      'rounded-[24px] py-[32px] lg:py-[24px] xl:py-[32px] px-6',
                      'flex flex-col justify-between',
                      'border border-grayscale-300'
                    )}
                  >
                    <Link href={`https://testnet.bscscan.com/tx/${el?.hash}`} target="_blank" passHref>
                      <p className='text-12-16 text-ocean-700 font-inter-600 line-clamp-1 whitespace-nowrap w-full' title={el?.hash}>{el?.hash}</p>
                    </Link>
                    <div className='flex flex-col gap-2 items-start'>
                      <span className={'uppercase bg-forest-50 rounded-[16px] px-[10px] py-[2px] text-12-16 font-maison-neue-demi text-forest-700'}>transfer</span>
                      {/* <span className='text-16-20 font-inter-400 text-black'>{el?.value} BNB</span> */}
                      <span className='text-14-18 font-inter-400 text-black'>{moment(el?.timeStamp, 'X').format("DD/MM/YYYY HH:MM")}</span>
                    </div>
                  </div>
                )
              })}
            </ReviewScrollHorizontal>
            <div className={'mt-[32px] md:mt-[24px]'}>
              <Link href={`https://testnet.bscscan.com/address/${roomNightListing?.room_night_token}`} target="_blank" passHref>
                <BasicButton variant={'outlined'} clases={'w-full lg:w-auto'}>
                  Show more on bscscan
                </BasicButton>
              </Link>
            </div>
          </DetailCard>
        </div>
      )}
    </>
  )
}

export default BookTransaction
