import CircularProgress from '@mui/material/CircularProgress'
import clsx from 'clsx'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import useTheme from '@dtravel/helpers/hooks/useTheme'

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl'
type ButtonVariant = 'contained' | 'outlined' | 'text'
type ButtonColor = 'red' | 'green' | 'black' | 'white'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  variant?: ButtonVariant
  color?: ButtonColor
  clases?: string
  loading?: boolean
}

const BasicButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, size = 'xl', variant = 'text', color = 'black', startIcon, endIcon, clases, style, ...props }, ref) => {
    const { color: themeColor } = useTheme()
    const renderBorderRadius = (_size: ButtonSize) => {
      if (_size === 'sm' || _size === 'md') {
        return 'rounded-[8px]'
      } else if (_size === 'lg' || _size === 'xl') {
        return 'rounded-[12px]'
      } else if (_size === '3xl') {
        return 'rounded-[12px]'
      } else {
        return 'rounded-[16px]'
      }
    }

    const renderClassBySize = (_size: ButtonSize) => {
      switch (_size) {
        case 'sm':
          // height: 32px
          return 'h-[32px] px-[8px] text-12-16 ' + renderBorderRadius(_size)
        case 'md':
          // height: 36px
          return 'h-[36px] px-[16px] text-16-20 ' + renderBorderRadius(_size)
        case 'lg':
          // height: 40px
          return 'h-[40px] px-[16px] text-16-20 ' + renderBorderRadius(_size)
        case 'xl':
          // height: 48px
          return 'h-[48px] px-[24px] text-16-20 ' + renderBorderRadius(_size)
        case 'xxl':
          // height: 56px
          return 'h-[56px] px-[24px] text-18-24 ' + renderBorderRadius(_size)
        case '3xl':
          // height: 56px
          return 'h-[64px] px-[24px] text-18-24 ' + renderBorderRadius(_size)
        default:
          return ''
      }
    }

    const renderBorderOutlinedClass = (_size: ButtonSize) => {
      // return 'border'
      switch (_size) {
        // case 'sm':
        //   // height: 32px
        //   return 'border border-[1.5px]'
        // case 'md':
        //   // height: 36px
        //   return 'border border-[1.5px]'
        // case 'lg':
        //   // height: 40px
        //   return 'border border-[1.5px]'
        // case 'xl':
        //   // height: 48px
        //   return 'border border-[2px]'
        // case 'xxl':
        //   // height: 56px
        //   return 'border border-[2px]'
        // case '3xl':
        //   // height: 56px
        //   return 'border border-[2px]'
        default:
          return 'border'
      }
    }

    const renderActiveClass = (
      _size: ButtonSize,
      _variant: ButtonVariant,
      _color: ButtonColor,
      _themeColor?: string
    ) => {
      const positionStyle =
        _variant === 'outlined'
          ? 'active:after:top-[-6px] active:after:right-[-6px] active:after:bottom-[-6px] active:after:left-[-6px]'
          : 'active:after:top-[-4px] active:after:right-[-4px] active:after:bottom-[-4px] active:after:left-[-4px]'
      let borderSizeAndRadius = ''
      if (_size === 'sm' || _size === 'md' || _size === 'lg') {
        borderSizeAndRadius = 'active:after:border-[1.5px] active:after:rounded-[10px]'
      } else if (_size === 'xl' || _size === '3xl') {
        borderSizeAndRadius = 'active:after:border-[2px] active:after:rounded-[16px]'
      } else {
        borderSizeAndRadius = 'active:after:border-[2px] active:after:rounded-[20px]'
      }
      let borderColor = 'active:after:border-neutral-900'
      if (_color === 'red') {
        borderColor = 'active:after:border-red-8'
      } else if (_color === 'green') {
        borderColor = 'active:after:border-forest-8'
      }
      if (_themeColor) {
        borderColor = `active:after:border-[${_themeColor}]`
      }
      return `active:after:content-[""] active:after:box-content active:after:bg-none active:after:absolute ${positionStyle} ${borderSizeAndRadius} ${borderColor}`
    }

    const renderClassByVariantAndColor = (_size: ButtonSize, _variant: ButtonVariant) => {
      switch (color) {
        case 'red':
          if (_variant === 'contained') {
            return props.disabled ? 'text-white bg-red-4 hover:bg-red-5' : 'text-white bg-red hover:bg-red-7'
          }
          if (_variant === 'outlined') {
            return `bg-none text-red ${renderBorderOutlinedClass(_size)} border-red hover:bg-red-1`
          }
          if (_variant === 'text') {
            return `bg-none text-red hover:bg-red-1`
          }
          return ''
        case 'white':
          if (_variant === 'contained') {
            return `bg-white text-neutral-900 hover:bg-sand active:bg-sand`
          }
          if (_variant === 'outlined') {
            return `bg-none text-white ${renderBorderOutlinedClass(_size)} border-neutral-900`
          }
          if (_variant === 'text') {
            return `bg-none text-neutral-900 hover:bg-neutral-200 hover:text-neutral-900`
          }
          return ''
        case 'green':
          if (_variant === 'contained') {
            return `bg-forest-6 text-white hover:opacity-90`
          }
          if (_variant === 'outlined') {
            return `bg-none ${renderBorderOutlinedClass(
              _size
            )} border-forest text-forest hover:opacity-90 hover:disabled:opacity-50`
          }
          if (_variant === 'text') {
            return `bg-none text-forest hover:bg-forest-1`
          }
          return ''
        // default color = black
        default:
          if (_variant === 'contained') {
            return `bg-neutral-900 text-white hover:opacity-90 hover:disabled:opacity-50`
          }
          if (_variant === 'outlined') {
            return `bg-none text-neutral-900 hover:bg-neutral-300 ${renderBorderOutlinedClass(
              _size
            )} border-neutral-400`
          }
          if (_variant === 'text') {
            return `bg-none text-neutral-900 hover:bg-neutral-300`
          }
          return ''
      }
    }

    const colorLoading = variant === 'outlined' && color === 'black' ? '#000000' : '#FFFFFF'

    const customStyle = style ? { ...style } : {}
    if (themeColor) {
      if (variant === 'outlined' && color === 'black') customStyle.color = themeColor
      if (variant === 'contained' && color === 'black') customStyle.backgroundColor = themeColor
    }

    return (
      <button
        ref={ref}
        className={clsx(
          renderClassBySize(size),
          renderClassByVariantAndColor(size, variant),
          renderActiveClass(size, variant, color, themeColor),
          'flex items-center justify-center relative box-border',
          'font-inter-500',
          clases,
          {
            ['cursor-not-allowed opacity-50']: props.disabled || loading,
          }
        )}
        style={customStyle}
        {...props}
      >
        {startIcon}
        <span className={clsx({ 'ml-2': !!startIcon, 'mr-2': !!endIcon }, 'flex items-center')}>{props.children}</span>
        {endIcon}
        {loading && (
          <>
            &nbsp;&nbsp;&nbsp;
            <CircularProgress size={24} style={{ color: colorLoading }} />
          </>
        )}
      </button>
    )
  }
)

export default BasicButton
