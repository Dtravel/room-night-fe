import React, { SelectHTMLAttributes, useRef } from 'react'
import Image from 'next/image'
import ic_chevron_down from '@dtravel/assets/icons/ic_chevron_down.svg'
import Popover from "@mui/material/Popover";
import clsx from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  isRequired?: boolean
  classes?: string
  onChange?: any,
  readOnly?: boolean
  disabled?: boolean
  options: {
    value: string
    label?: string
  }[]
}

let widthPopover: number = 0;

const BasicSelect = (props: SelectProps) => {
  const { label, options, readOnly, disabled, isRequired, classes, placeholder, value, onChange } = props
  const selectRef: any = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const handleOpen = (event: any) => {
    if (readOnly || disabled) return;
    if (selectRef) {
      const selectBound = selectRef?.current.getBoundingClientRect();
      widthPopover = selectBound.width;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const itemSelected = options.find((v: any) => v.value === value)
  return (
    <>
      <div
        className={clsx(
          'w-full h-[68px] cursor-pointer flex items-center justify-between text-16-20 px-4 py-3 rounded-[12px] border',
          open ? 'border-neutral-900' : 'border-black-0.05 hover:border-neutral-900',
          value === '' ? 'text-neutral-500' : 'text-neutral-900',
          classes
        )}
        ref={selectRef}
        onClick={handleOpen}
      >
        <div className='flex flex-col gap-1'>
          {label && itemSelected && (
            <p className={'block font-inter-400 text-12-16 text-grayscale-600'}>
              {label}
              {isRequired && <span className={'text-red'}>*</span>}
            </p>
          )}
          <p>{itemSelected?.label || placeholder}</p>
        </div>
        <div className='h-full flex items-center justify-center cursor-pointer' >
          <Image src={ic_chevron_down} alt="" width={24} height={24} />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        disableAutoFocus
        disableEnforceFocus
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          "& .MuiPaper-root": {
            width: `${widthPopover}px`,
            height: "auto",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "16px",
            backgroundColor: "#FFFFFF",
            padding: "12px 0",
            marginTop: '8px',
          },
        }}
      >
        <div className='overflow-auto max-h-[296px]'>
          {options.map((opt) => {
            const isSelected = value === opt.value
            return (
              <div
                key={opt.value}
                className={clsx(
                  `px-[14px] py-[12px] text-neutral-800 text-16-20 font-maison-neue-medium cursor-pointer`,
                  isSelected ? "bg-neutral-50" : ''
                )}
                onClick={() => {
                  onChange(opt.value)
                  handleClose()
                }}
              >
                {opt.label || opt.value}
              </div>
            )
          })}
        </div>
      </Popover>
    </>
  )
}

export default BasicSelect
