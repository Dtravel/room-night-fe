import React, { useState } from 'react'
import { NextPage } from 'next'
import { isEmpty } from '@dtravel/utils/common'
import MerchantListItem from './MerchantListItem'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch } from 'react-redux'
import { setShowCollapseMobile } from '@dtravel/redux/slices/property'
import useMounted from '@dtravel/helpers/hooks/useMounted'
import { useAppSelector } from '@dtravel/redux/hooks'
import MerchantListFilter from './MerchantListFilter'
import Image from 'next/image'
import ic_list_white from '@dtravel/assets/icons/ic_list_white.svg'
import ic_map_white from '@dtravel/assets/icons/ic_map_white.svg'
import ic_arrow_down from '@dtravel/assets/icons/ic_arrow_down.svg'
import { setIsOpenSelectCurrency } from '@dtravel/redux/slices/common'
import { InView } from 'react-intersection-observer'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import SocialFooter from '../common/SocialFooter'
import Link from 'next/link'
import { DTRAVEL_URL } from '@dtravel/helpers/constants/constants'
interface Props {
  merchantData: any[]
  paging: any
  fetchData: any
  loading: boolean
  businessInfor: any
  userId: string
  isShowBasePrice?: boolean
}
// use react-window
// https://react-window.vercel.app/#/examples/grid/variable-size
const MerchantList: NextPage<Props> = (props) => {
  const dispatch = useDispatch()
  const { color } = useTheme()
  const { merchantData, paging, loading, fetchData, businessInfor, userId } = props
  const { showCollapseMobile } = useAppSelector((state) => state.property)
  const { selectedCurrency } = useAppSelector((state) => state.common)
  const isMounted = useMounted()
  const isShowAll = paging.total === paging.totalCount

  const [isStickyFooter, setStickyFooter] = useState<boolean>(false)

  const handleLoadMore = () => {
    if (!loading && paging.page < paging.totalPages) fetchData(paging.page + 1)
  }
  const renderList = () => {
    return (
      <>
        {!isEmpty(merchantData) &&
          (merchantData || []).map((el: any, idx: number) => {
            const lastId = merchantData[merchantData.length - 1].id
            return (
              <MerchantListItem
                key={idx}
                item={el}
                handleLoadMore={handleLoadMore}
                lastId={lastId}
                isShowBasePrice={props.isShowBasePrice}
              />
            )
          })}
      </>
    )
  }

  const renderPropertyNumber = () => {
    return `Showing ${!isShowAll ? `${paging?.total || 0} of ` : ''}${paging?.totalCount || 0} ${`${(paging?.totalCount || 0) > 1 ? 'properties' : 'property'
      }`}`
  }
  const renderContent = (isMobile?: boolean) => {
    return (
      <>
        {showCollapseMobile && (
          <div
            className="w-full h-[calc(50%_-_40px)] z-[-1] cursor-pointer lg:hidden"
            onClick={(e: any) => {
              dispatch(setShowCollapseMobile(false))
              e.preventDefault()
            }}
          />
        )}
        {(isStickyFooter || !showCollapseMobile) && (
          <div
            className="w-full items-center justify-center flex lg:hidden cursor-pointer fixed bottom-[104px] z-[100]"
            onClick={(e: any) => {
              if (isMobile) dispatch(setShowCollapseMobile(!showCollapseMobile))
              e.preventDefault()
            }}
          >
            <div
              className="flex items-center justify-center h-[56px] rounded-[20px] bg-neutral-900 px-[32px]"
              style={color ? { backgroundColor: color } : {}}
            >
              {showCollapseMobile && <Image src={ic_map_white} alt="" width={20} height={20} />}
              {!showCollapseMobile && <Image src={ic_list_white} alt="" width={24} height={24} />}
              <span className="text-white font-inter-500 text-14-18 ml-[8px]">
                {showCollapseMobile ? 'Map' : 'List'}
              </span>
            </div>
          </div>
        )}
        {((isMobile && showCollapseMobile) || !isMobile) && (
          <>
            <InView
              id={`scroll_drag_btn`}
              as="div"
              onChange={(inView) => {
                if (!inView) setStickyFooter(true)
                if (inView) setStickyFooter(false)
              }}
            >
              <div
                className={`lg:hidden px-4 md:px-6 py-[8px] md:pb-0 lg:pb-[24px] md:pt-[24px] bg-white ${isMobile ? 'rounded-t-[24px] pb-[16px]' : 'sticky top-0 z-10'
                  }`}
                onClick={(e: any) => {
                  dispatch(setShowCollapseMobile(!showCollapseMobile))
                  e.preventDefault()
                }}
              >
                <div className="w-full items-center justify-center bg-white flex lg:hidden cursor-pointer">
                  <div className="w-[40px] h-[4px] rounded-[20px] bg-neutral-4" />
                </div>
              </div>
            </InView>
            <p className="text-neutral-900 text-14-18 font-inter-500 whitespace-nowrap text-center bg-white md:hidden pb-[2px]">
              {renderPropertyNumber()}
            </p>
          </>
        )}
        <div
          className={`w-full flex justify-between items-center px-[16px] md:px-[24px] py-[20px] top-[80px] md:top-[76px] lg:top-0 z-[100] bg-white ${showCollapseMobile ? 'sticky' : 'fixed'
            }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-neutral-900 text-14-18 font-inter-500 whitespace-nowrap hidden md:flex">
            {renderPropertyNumber()}
          </p>
          <MerchantListFilter />
        </div>
        {((isMobile && showCollapseMobile) || !isMobile) && (
          <div
            className="bg-white flex flex-col px-[16px] md:px-3 mt-[-8px] md:mt-[-18px]"
            style={{ minHeight: 'calc(100% - 32px - 76px)' }}
          >
            <div className="flex flex-wrap">{renderList()}</div>
            {loading && (
              <div className="hidden md:flex items-center justify-center opacity-60 cursor-not-allow bg-transparent py-6">
                <CircularProgress size={36} style={{ color: '#5F4013' }} />
              </div>
            )}
          </div>
        )}
        {/* footer */}
        <div
          className={`w-full flex items-center justify-between px-4 md:px-6 py-[25px] bg-white ${(isMobile && showCollapseMobile && isStickyFooter) || !isMobile ? 'sticky bottom-0 z-[100]' : ''
            }`}
          style={{ boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex flex-col">
            <p className="mb-[2px] text-12-16 font-inter-500 text-neutral-8">
              {businessInfor?.hostName || businessInfor?.contactName}
            </p>
            <Link href={DTRAVEL_URL} passHref target={"_blank"}>
              <span className="font-inter-400 text-10-12 text-neutral-600 hover:text-grayscale-800">Powered by Dtravel</span>
            </Link>
          </div>
          <div className="flex gap-[24px]">
            <SocialFooter />
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={(e: any) => {
                dispatch(setIsOpenSelectCurrency(true))
                e.preventDefault()
              }}
            >
              {selectedCurrency.type === 'CRYPTO' ? (
                <span className={'rounded-[100px] px-[4px] py-[2px] text-white'}>
                  <Image src={selectedCurrency.icon} alt={selectedCurrency.key} width={16} height={16} />
                </span>
              ) : (
                <span
                  className={
                    'mr-[4px] bg-neutral-900 rounded-[100px] px-[4px] py-[2px] text-white font-inter-600 text-10-12 tracking-[0.04em] uppercase'
                  }
                >
                  {selectedCurrency.symbol}
                </span>
              )}
              <span className={'mr-[4px] tracking-[-0.02em] text-neutral-800 text-12-16 font-inter-500'}>
                &nbsp;{selectedCurrency.key}
              </span>
              <Image src={ic_arrow_down} alt="" width={16} height={16} />
            </div>
          </div>
        </div>
      </>
    )
  }
  if (!isMounted) return null
  return (
    <>
      {/* ? */}
      <div className="w-full lg:w-[617px] xl:w-[768px] bg-white z-10 rounded-2xl overflow-auto hidden-scroll-bar hidden lg:block">
        {renderContent()}
      </div>

      {/* tablet and mobile */}
      <div
        className={`z-20 fixed bottom-0 w-full block lg:hidden overflow-auto hidden-scroll-bar mt-[-26px] bg-transparent ${showCollapseMobile ? 'h-full rounded-t-2xl' : 'h-auto'
          }`}
        style={{ boxShadow: showCollapseMobile ? '0px 10px 50px rgba(0, 0, 0, 0.15)' : 'none' }}
      >
        {renderContent(true)}
      </div>
    </>
  )
}

export default MerchantList
