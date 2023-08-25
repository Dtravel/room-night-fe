import ic_close_md from '@dtravel/assets/icons/ic_close_md.svg'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
// import IconButton from '@mui/material/IconButton'
// import { styled } from '@mui/material/styles'
import { Breakpoint } from '@mui/system'
import Image from 'next/image'
import React, { ReactNode, ReactElement, MouseEvent } from 'react'
import { EXTERNAL_LINK } from '../dashboard/Dashboard'
import ic_discord from '@dtravel/assets/icons/ic_discord.svg'

export interface PopupProps {
  isOpen: boolean
  onClose: () => void
  topTitle?: string | ReactNode | ReactElement
  title?: string | ReactNode | ReactElement
  extraTitle?: string | ReactNode | ReactElement

  allowBackdropClick?: boolean
  maxWidth?: Breakpoint
  fullScreen?: boolean
  noBorderRadius?: boolean

  padding?: string
  children: ReactNode
  hideClose?: boolean
  footer?: string | ReactNode | ReactElement
  showDefaultFooter?: boolean
}

const BasicPopup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  allowBackdropClick,
  hideClose,
  topTitle,
  title,
  extraTitle,
  children,
  maxWidth,
  fullScreen,
  noBorderRadius,
  padding,
  footer,
  showDefaultFooter,
}) => {
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768

  const handleCloseWrapper = (
    event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
    reason?: string
  ) => {
    if (reason === 'backdropClick' && allowBackdropClick) {
      // click outside
      onClose()
    }
  }

  return (
    <Dialog
      onClose={handleCloseWrapper}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      fullWidth
      maxWidth={maxWidth || 'sm'}
      scroll={'paper'}
      fullScreen={fullScreen}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: noBorderRadius ? '0' : '24px',
          margin: 0,
          padding: padding ? padding : isMobile ? '24px 16px' : '48px 32px',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          overflowX: 'hidden',
        },
        '& .MuiDialogContent-root': {
          '&::-webkit-scrollbar': { width: 0 },
        },
      }}
      classes={{ container: 'dialog-container' }}
    >
      {!hideClose && (
        <div
          onClick={onClose}
          className="absolute top-[8px] md:top-[24px] right-[8px] md:right-[24px] p-[8px] cursor-pointer"
        >
          <Image src={ic_close_md} alt="" width={24} height={24} />
        </div>
      )}
      {title && (
        <div className="mb-6 pt-2 mt-2" style={{ boxShadow: '0px 24px 88px rgba(0, 0, 0, 0.02)' }}>
          {typeof title === 'string' ? (
            <>
              {topTitle && (
                <h3 className={'font-inter-500 text-14-18 text-neutral-800 text-center mb-2'}>{topTitle}</h3>
              )}
              <h3 className={'font-inter-500 text-24-32 text-grayscale-800 text-center px-[40px] tracking-[-0.03em]'}>
                {title}
              </h3>
              {typeof extraTitle === 'string' ? (
                <p className={'font-inter-400 text-16-20 text-grayscale-600 text-center mt-[8px] whitespace-pre-line'}>
                  {extraTitle}
                </p>
              ) : (
                extraTitle
              )}
            </>
          ) : (
            <>{title}</>
          )}
        </div>
      )}

      <DialogContent className="overflow-auto">{children}</DialogContent>
      {(footer || showDefaultFooter) && (
        <div className="mx-[-16px] md:mx-[-32px] mb-[-24px] md:mb-[-48px] rounded-b-[24px]">
          {footer || (
            <>
              <div className="w-full flex justify-between bg-neutral-100 p-[16px] md:p-[32px] rounded-b-[24px]">
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
            </>
          )}
        </div>
      )}
    </Dialog>
  )
}

export default BasicPopup
