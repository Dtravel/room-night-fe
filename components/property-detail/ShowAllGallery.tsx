/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { PropertyImage } from '@dtravel/helpers/interfaces'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import { Drawer } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@dtravel/redux/store'
import { setIsOpenPopupImages } from '@dtravel/redux/slices/common'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import ic_close_md from '@dtravel/assets/icons/ic_close_md.svg'
import { Address } from '@dtravel/helpers/interfaces/property'
import clsx from 'clsx'

interface Props {
  externalName: string
  propertyImages: PropertyImage[]
  address: Address
}

const ShowAllGallery: React.FC<Props> = ({ propertyImages, externalName, address }) => {
  const dispatch = useDispatch()
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024
  const { isOpenPopupImages, indexImageInGallery } = useSelector((state: RootState) => state.common)

  useEffect(() => {
    if (indexImageInGallery) {
      setTimeout(() => {
        const element = document.getElementById(`image_${indexImageInGallery}`)
        if (element) {
          element.scrollIntoView()
        }
      }, 200)
    }
  }, [indexImageInGallery, isOpenPopupImages])

  const handleClosePopup = () => {
    dispatch(setIsOpenPopupImages(false))
  }

  const renderContent = (isRadius?: boolean) => {
    return (
      <div
        className={clsx(
          'm-auto',
          'px-0',
          'md:px-[32px]',
          'lg:px-[48px]',
          'xl:px-[72px] xl:max-w-[1280px]',
          '2xl:px-[152px] 2xl:max-w-[1536px]'
        )}
      >
        {(propertyImages || []).map((image, index) => {
          return (
            <div key={image.id} id={`image_${index}`} className="pb-[24px] lg:pb-[32px]">
              <div className={'relative'}>
                <img
                  src={image.url}
                  alt={image.caption}
                  className={`object-cover h-full w-full ${isRadius ? 'rounded-[24px]' : ''}`}
                />
              </div>
              {image.caption &&
                <p className={'text-14-18 lg:text-16-20 text-neutral-700 font-inter-400 text-center pt-[16px] lg:pt-[24px]'}>
                  {image.caption}
                </p>
              }
            </div>
          )
        })}
      </div>
    )
  }

  const renderHeader = (externalName: string, fullAddress: string) => {
    return (
      <div className={'text-center'}>
        <div className={'absolute top-[32px] right-[20px] lg:right-[32px] w-[40px] h-[40px]'}>
          <IconButton onClick={handleClosePopup}>
            <Image src={ic_close_md} alt="" width={24} height={24} />
          </IconButton>
        </div>
        <div className={'py-[20px] flex flex-col-reverse lg:flex-col items-center'}>
          <p className={'font-inter-500 text-neutral-800 text-16-20 lg:text-24-36 px-[72px] '}>
            {externalName}
          </p>
          <p className={'font-inter-400 text-neutral-600 text-10-12 lg:text-12-16'}>{fullAddress}</p>
        </div>
      </div>
    )
  }

  const fullAddress =
    address.city ||
    address.state + `${(address.city || address.state) && address.country ? ', ' : ''}` + address.country

  return isMobile ? (
    <Drawer
      anchor={'bottom'}
      open={isOpenPopupImages}
      onClose={handleClosePopup}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          padding: '24px 0px',
          height: '100%',
        },
      }}
    >
      {renderHeader(externalName, fullAddress)}
      {renderContent()}
    </Drawer>
  ) : (
    <Dialog
      onClose={handleClosePopup}
      aria-labelledby="customized-dialog-title"
      open={isOpenPopupImages}
      fullWidth
      scroll={'paper'}
      fullScreen={true}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 0,
          position: 'relative',
          backgroundColor: '#FFFFFF',
        },
        '& .MuiDialogContent-root': { padding: '0px 80px' },
      }}
    >
      {renderHeader(externalName, fullAddress)}
      <DialogContent>{renderContent(true)}</DialogContent>
    </Dialog>
  )
}

export default ShowAllGallery
