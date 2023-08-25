import BasicPopup, { PopupProps } from '@dtravel/components/ui/BasicPopup'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import BasicSwipeDrawer, { BasicSwipeDrawerProps } from '@dtravel/components/ui/BasicSwipeDrawer'

const BasicDialog = (props: (PopupProps & BasicSwipeDrawerProps)) => {
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768
  const {
    // PopupProps
    topTitle,
    allowBackdropClick,
    maxWidth,
    fullScreen,
    noBorderRadius,

    // BasicSwipeDrawerProps
    titleAlign,
    height,
    maxHeight,
    noScroll,

    // CommonProps
    ...commonProps
  } = props
  const IPopupProps = { topTitle, allowBackdropClick, maxWidth, fullScreen, noBorderRadius, ...commonProps }
  const IBasicSwipeDrawerProps = { titleAlign, height, maxHeight, noScroll, ...commonProps }

  return (
    <>
      {isMobile ?
        <BasicSwipeDrawer {...IBasicSwipeDrawerProps} /> :
        <BasicPopup {...IPopupProps} />
      }
    </>
  )
}

export default BasicDialog
