import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import React, { MouseEvent, ReactElement, ReactNode } from 'react'
import ic_close_white from './images/ic_close_white.svg'

interface PopupProps {
  title?: string | ReactNode | ReactElement
  extraTitle?: string | ReactNode | ReactElement
  isOpen: boolean
  handleClose: () => void
  children: ReactNode
  hideClose?: boolean
  allowBackdropClick?: boolean
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0),
    overflowY: 'initial',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0),
  },
  '& .MuiDialog-paper': {
    borderRadius: 40,
    // padding: '48px 32px',
    position: 'relative',
    backgroundColor: '#000',
  },
}))

const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '24px',
  right: '24px',
}))

const DashboardDialog: React.FC<PopupProps> = ({
  isOpen,
  handleClose,
  allowBackdropClick,
  hideClose,
  title,
  extraTitle,
  children,
}) => {
  const handleCloseWrapper = (
    event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
    reason?: string
  ) => {
    if (reason === 'backdropClick' && allowBackdropClick) {
      // click outside
      handleClose()
    }
  }

  return (
    <BootstrapDialog
      onClose={handleCloseWrapper}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      fullWidth
      maxWidth={'sm'}
      scroll={'paper'}
      className="dashboard-dialog-container"
    >
      {!hideClose && (
        <StyledIconButton className={''} onClick={handleClose}>
          <Image src={ic_close_white} alt="" style={{ width: 24, height: 24 }} />
        </StyledIconButton>
      )}
      {title && (
        <div className="mb-8 mt-4" style={{ padding: '48px 32px' }}>
          {typeof title === 'string' ? (
            <>
              <h3 className="dialog-title">{title}</h3>
              {typeof extraTitle === 'string' ? (
                <p className={'font-maison-neue text-16-24 text-sand-7 text-center mt-3'}>{extraTitle}</p>
              ) : (
                extraTitle
              )}
            </>
          ) : (
            <>{title}</>
          )}
        </div>
      )}

      <DialogContent>{children}</DialogContent>
    </BootstrapDialog>
  )
}

export default DashboardDialog
