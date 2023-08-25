import ic_arrow_right_white from '@dtravel/assets/icons/ic_arrow_right_white.svg'
import BasicButton from '@dtravel/components/ui/BasicButton'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import Image from 'next/image'
import React from 'react'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  handleSubmit: () => void
  loading: boolean
  isLoadingPrice?: boolean
  disabled: boolean
}

const BookingComplete: React.FC<Props> = ({ handleSubmit, loading, isLoadingPrice, disabled }) => {
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const { color } = useTheme()
  const style: any = { width: isMobile ? '100%' : 'auto' }
  if (color) {
    style.backgroundColor = color
  }
  return (
    <BasicButton
      size={'xxl'}
      variant={'contained'}
      onClick={() => {
        if (!loading && !disabled) handleSubmit()
      }}
      loading={loading}
      // loading={loading || isLoadingPrice}
      disabled={loading || isLoadingPrice || disabled}
      style={style}
    >
      <span className="text-white font-inter-500 text-16-20 mr-[4px]">Confirm and book now</span>
      {!loading && <Image src={ic_arrow_right_white} alt="" />}
    </BasicButton>
  )
}

export default BookingComplete
