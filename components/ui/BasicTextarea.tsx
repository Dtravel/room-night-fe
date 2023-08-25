import React, { TextareaHTMLAttributes, forwardRef } from 'react'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  isRequired?: boolean
  tooltip?: string
  classes?: string
}

const BasicTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, isRequired, tooltip, classes, ...props }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className={'block text-sm md-text text-grey-700 mb-2'}>
            {isRequired && <span className={'text-red'}>*</span>}
            &nbsp;
            {label}
            &nbsp;
            {tooltip && (
              <Tooltip placement="top" title={tooltip} sx={{ fontSize: 16 }} arrow>
                <HelpOutlineIcon />
              </Tooltip>
            )}
          </span>
        )}
        <textarea
          ref={ref}
          className={
            'w-full md-text px-4 py-3 rounded-xl ' +
            'border border-grey-600 hover:border-grey-700 focus:border-grey-700 focus:outline-none ' +
            'placeholder:text-grey ' +
            classes
          }
          {...props}
        />
      </label>
    )
  }
)

export default BasicTextarea
