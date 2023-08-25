import ic_close from '@dtravel/assets/icons/ic_close.svg'
import { Drawer } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import React, { ReactElement, ReactNode } from 'react'
import { EXTERNAL_LINK } from '../dashboard/Dashboard'
import ic_discord from '@dtravel/assets/icons/ic_discord.svg'

export interface BasicSwipeDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string | ReactNode | ReactElement
  extraTitle?: string | ReactNode | ReactElement
  titleAlign?: 'left' | 'right' | 'center'

  height?: number | string
  maxHeight?: number | string
  noScroll?: boolean

  children?: React.ReactNode
  hideClose?: boolean
  footer?: string | ReactNode | ReactElement
  showDefaultFooter?: boolean
  bodyStyle?: any
}

const BasicSwipeDrawer: React.FC<BasicSwipeDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  extraTitle,
  titleAlign,
  height,
  maxHeight,
  hideClose,
  noScroll,
  footer,
  showDefaultFooter,
  bodyStyle,
}) => {
  return (
    <Drawer
      anchor={'bottom'}
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          borderRadius: '24px 24px 0px 0px',
          height: height || 'auto',
          maxHeight: maxHeight || 'calc(100% - 16px)',
        },
      }}
      className="custom-drawer"
    >
      {title && (
        <div
          className="flex items-center justify-between gap-[8px] py-[24px] px-[16px]"
          style={{ boxShadow: '0px 1px 0px #E9E9E4' }}
        >
          <div className="flex items-center" style={{ textAlign: titleAlign || 'left' }}>
            {typeof title === 'string' && title !== '' ? (
              <h3 className={'font-inter-500 text-20-24 tracking-[-0.01em] text-grayscale-800'}>{title}</h3>
            ) : (
              <>{title}</>
            )}
          </div>
          {!hideClose && (
            <div className={'text-right'}>
              <IconButton onClick={onClose} sx={{ padding: 0, minWidth: 20 }}>
                <Image src={ic_close} alt="" width={20} height={20} />
              </IconButton>
            </div>
          )}
        </div>
      )}

      <div
        className={`px-[16px] py-[16px] ${noScroll ? 'overflow-y-hidden' : 'overflow-y-auto'} h-full overflow-x-hidden`}
        style={bodyStyle ? { ...bodyStyle } : {}}
      >
        {typeof extraTitle === 'string' && extraTitle !== '' ? (
          <p className={'font-inter-400 text-14-18 text-grayscale-700 mb-[8px]'}>{extraTitle}</p>
        ) : (
          extraTitle
        )}
        {children}
      </div>
      {(footer || showDefaultFooter) && (
        <>
          {footer || (
            <div className="w-[100vw] flex justify-between bg-neutral-100 p-[16px] md:p-[32px]">
              <span className="text-16-24 font-inter-500 text-neutral-600 cursor-pointer hover:underline">
                <a
                  href="https://dtravel.notion.site/Dtravel-Knowledge-Base-2e918f9e208a4f018f8074cf2b1264a2"
                  target="_blank"
                  rel="noreferrer"
                >
                  Still have questions?
                </a>
              </span>
              <a
                className="flex items-center cursor-pointer"
                href={EXTERNAL_LINK.DISCORD}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={ic_discord} width={21} height={16} alt="" />
                <span className="text-neutral-800 text-14-18 font-inter-500 ml-[8px] hover:underline">
                  Chat in our Discord
                </span>
              </a>
            </div>
          )}
        </>
      )}
    </Drawer>
  )
}

export default BasicSwipeDrawer
