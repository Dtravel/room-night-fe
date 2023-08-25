import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setToast } from '@dtravel/redux/slices/common'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'

const BasicToast = () => {
  const dispatch = useAppDispatch()
  const { toast } = useAppSelector((state) => state.common)
  const { show, message, title, type = 'error', duration = 6000 } = toast
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1024

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setToast({ show: false, message: '' }))
  }

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )
  return (
    <Snackbar
      open={show}
      autoHideDuration={duration}
      onClose={handleClose}
      message={message}
      action={action}
      anchorOrigin={{ vertical: isMobile ? 'top' : 'bottom', horizontal: 'right' }}
      sx={{ '& .MuiSnackbar-anchorOriginBottomRight': { borderRadius: '16px' } }}
    >
      <div
        className={'bg-white rounded-[16px] flex p-[16px] min-w-[280px] max-w-[768px] w-auto items-center gap-[12px]'}
        style={{ boxShadow: '0px 16px 88px rgba(0, 0, 0, 0.25)' }}
      >
        <div className={'w-[24px]'}>
          {show && (
            <IconButton>
              {type === 'error' ? <ErrorIcon color={'error'} /> : <CheckCircleRoundedIcon color={'success'} />}
            </IconButton>
          )}
        </div>
        <div className={'grow'}>
          <p className={'text-sand-7 text-12-16'}>{title}</p>
          <p className={'text-sand-6 text-12-16'}>{message}</p>
        </div>
        <button className={'w-[24px]'} onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
    </Snackbar>
  )
}

export default BasicToast
