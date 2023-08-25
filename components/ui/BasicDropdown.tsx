import React, { useEffect, useRef, useState } from 'react'
import BasicButton from './BasicButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ic_chevron_down from 'src/assets/icons/ic_chevron_down.svg'
import CheckIcon from '@mui/icons-material/Check'
import Image from 'next/image'

export interface ItemOptionProps {
  value: string
  label: string
}
interface Props {
  label: string | React.ReactNode
  options: Array<ItemOptionProps>
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (item: ItemOptionProps) => void
  menuWidth?: number
  menuProps?: any
  selectedValue?: string
  btnClass?: string
  btnSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  hideIcon?: boolean
}

const BasicDropdown: React.FC<Props> = ({
  label,
  menuWidth,
  options,
  handleSelect,
  selectedValue,
  btnSize,
  btnClass,
  menuProps,
  hideIcon,
}) => {
  const btn = useRef<HTMLButtonElement | null>(null)
  const [btnWidth, setBtnWidth] = useState<null | number>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (btn && btn.current) {
      setBtnWidth(btn.current.offsetWidth)
    }
  }, [])

  return (
    <div>
      <BasicButton
        ref={btn}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={hideIcon ? null : <Image src={ic_chevron_down} alt="" style={{ width: 16, height: 16 }} />}
        size={btnSize || 'xl'}
        clases={btnClass}
      >
        {label}
      </BasicButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: '8px', minWidth: menuWidth ? `${menuWidth}px` : btnWidth ? `${btnWidth}px` : 'auto' },
        }}
        {...menuProps}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {options.map((item: ItemOptionProps) => {
          return (
            <MenuItem
              key={item.value}
              onClick={() => {
                if (handleSelect) handleSelect(item)
                handleClose()
              }}
            >
              <span className={'flex justify-between items-center w-full'}>
                <span>{item.label}</span>
                {item.value === selectedValue ? <CheckIcon fontSize={'small'} /> : ''}
              </span>
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

export default BasicDropdown
