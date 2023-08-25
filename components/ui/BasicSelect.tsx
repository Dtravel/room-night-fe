import { isEmpty } from '@dtravel/utils/common'
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
// import Tooltip from '@mui/material/Tooltip'
import React, { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  isRequired?: boolean
  classes?: string
  options: {
    value: string
    label?: string
  }[]
}

const BasicSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, isRequired, classes, placeholder, value, ...props }, ref) => {
    return (
      <>
        {/* ⌄ -> code: \2304*/}
        <div
          // className={'relative after:content-["⌄"] after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2'}
          // className={'relative after:content-["⌄"] after:absolute after:right-4 after:top-2.5'}
          className={'relative after:content-down after:absolute after:right-4 after:translate-y-1/2 after:mt-2 h-[68px]'}
        >
          {label && !isEmpty(value) && (
            <span className={'absolute left-[15px] top-3 font-inter-400 text-12-16 text-grayscale-600 mb-[4px]'}>
              {isRequired && <span className={'text-red'}>*</span>}
              &nbsp;
              {label}
              {/* &nbsp;
              {tooltip && (
                <Tooltip placement="top" title={tooltip} sx={{ fontSize: 16 }} arrow>
                  <HelpOutlineIcon />
                </Tooltip>
              )} */}
            </span>
          )}
          <select
            ref={ref}
            className={
              'appearance-none w-full h-[68px] text-16-20 px-4 pb-3 rounded-[12px] ' +
              'border border-black-0.05 hover:border-grayscale-900 ' +
              'focus:border-grayscale-900 focus:outline-none ' +
              `${value === '' ? 'text-grayscale-600 pt-3' : 'text-grayscale-900 pt-6'} ` +
              classes
            }
            value={value}
            // style={{ borderRight: ' 16px solid transparent', outline: '1px solid' }}
            {...props}
          >
            {placeholder && <option value="" disabled hidden>{placeholder}</option>}
            {Array.isArray(options) &&
              options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label || opt.value}
                </option>
              ))}
          </select>
        </div>
      </>
    )
  }
)

export default BasicSelect
