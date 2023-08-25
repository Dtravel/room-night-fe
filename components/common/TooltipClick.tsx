import * as React from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Image from 'next/image'
import ic_close from '@dtravel/assets/icons/ic_close.svg'
import { useAppDispatch, useAppSelector } from '@dtravel/redux/hooks'
import { setTypeTooltip } from '@dtravel/redux/slices/common'
import { isEmpty } from '@dtravel/utils/common'

interface Props extends TooltipProps {
  header?: string
  type: string
}

const TooltipClick = (props: Props) => {
  const isArrow = props.arrow
  const LightTooltip = styled(({ className, ...tooltipProps }: TooltipProps) => (
    <Tooltip {...tooltipProps} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
      '&::before': {
        backgroundColor: theme.palette.common.black,
        border: '1px solid black',
      },
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: isArrow ? theme.palette.common.black : theme.palette.common.white,
      boxShadow: isArrow ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '0px 6px 24px rgba(0, 0, 0, 0.16)',
      borderRadius: isArrow ? 8 : 24,
      padding: isArrow ? '12px 16px' : 24,
      maxWidth: 'initial',
    },
  }))
  const dispatch = useAppDispatch()
  const { typeTooltip } = useAppSelector((state) => state.common)

  const handleClose = () => {
    dispatch(setTypeTooltip(''))
  }

  const handleOpen = () => {
    dispatch(setTypeTooltip(props.type))
  }

  const title = props.header ? (
    <div className="font-inter-500">
      <div
        // style={{ width: 'calc(100% + 48px)' }}
        className="flex items-center justify-between border-b border-b-neutral-300 mb-6 pb-6 "
      >
        <Image src={ic_close} alt="" width={16} height={16} onClick={handleClose} className="cursor-pointer" />
        <span className="text-16-20 text-neutral-800 mx-10 whitespace-nowrap font-inter-500">{props.header}</span>
        <div className="w-4 h-4" />
      </div>
      {props.title}
    </div>
  ) : (
    <div>
      {props.title}
    </div>
  )
  const open = !isEmpty(typeTooltip) && typeTooltip === props?.type
  const isDateOfBirth = props?.type === 'dateOfBirth'
  return (
    <div>
      <ClickAwayListener onClickAway={handleClose}>
        <div className="flex items-start">
          <LightTooltip
            PopperProps={{ disablePortal: !isDateOfBirth }}
            onClose={handleClose}
            open={open}
            disableFocusListener
            disableHoverListener={props?.disableHoverListener}
            disableTouchListener
            title={title}
            arrow={props.arrow}
            placement={props.placement || "bottom-start"}
          >
            <div
              onClick={(e: any) => {
                handleOpen()
                e.stopPropagation()
              }}
              onMouseOver={() => {
                if (!open && !props?.disableHoverListener) handleOpen()
              }}
              onMouseLeave={() => {
                if (open && !props?.disableHoverListener) handleOpen()
              }}
              className={`w-auto flex items-start underline cursor-pointer ${open ? 'text-ocean-800' : 'text-neutral-600'
                }`}
            >
              {props.children}
            </div>
          </LightTooltip>
        </div>
      </ClickAwayListener>
    </div>
  )
}
export default TooltipClick
