import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useAppSelector } from '../../redux/hooks'

const Loading = () => {
  const { isLoading } = useAppSelector((state) => state.common)

  if (isLoading)
    return (
      <div
        className={
          'fixed w-full h-full top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center opacity-30 cursor-not-allow bg-neutral-300'
        }
        style={{ zIndex: 9999 }}
      >
        <CircularProgress size={50} style={{ color: '#0B2336' }} />
      </div>
    )
  return null
}

export default Loading
