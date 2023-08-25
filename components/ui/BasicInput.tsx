import Error from '../common/Error';
import { FormError } from '@dtravel/helpers/interfaces';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import React, {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  HTMLInputTypeAttribute,
  useRef,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isRequired?: boolean;
  tooltip?: string;
  classes?: string;
  showIconPassword?: boolean;
  error?: FormError;
  handleFocus?: any;
  handleBlur?: any;
  endAdornment?: any
}

const BasicInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      isRequired,
      tooltip,
      classes,
      showIconPassword,
      type,
      error,
      handleFocus,
      handleBlur,
      endAdornment,
      ...props
    },
    ref,
  ) => {
    // const inputRef = useRef<HTMLInputElement | null>(null);
    const labelRef = useRef<HTMLSpanElement | null>(null);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [htmlType, setHtmlType] = useState<HTMLInputTypeAttribute | undefined>('text');
    const [isFocus, setFocus] = useState<boolean>(false);
    const [value, setValue] = useState<string | number | readonly string[] | undefined>('');

    useEffect(() => {
      setHtmlType(type);
    }, [type]);

    useEffect(() => {
      setValue(props.value);
      const labelElement = labelRef.current;
      if (labelElement && props.value) {
        labelElement.style.top = '12px';
      }
    }, [props.value]);

    const toggletPasswod = (isShow: boolean) => {
      setIsShowPassword(isShow);
      setHtmlType(isShow ? 'text' : 'password');
    };

    const handleFocusWrapper = (inputFocusProps: any) => {
      setFocus(true);
      if (handleFocus) handleFocus(inputFocusProps);

      const labelElement = labelRef.current;
      if (labelElement) {
        labelElement.style.top = '12px';
        labelElement.style.fontSize = '12px';
        labelElement.style.lineHeight = '16px';
      }
    };

    const handleBlurWrapper = (inputBlurProps: any) => {
      setFocus(false);
      if (handleBlur) handleBlur(inputBlurProps);

      const labelElement = labelRef.current;
      if (labelElement && !value) {
        labelElement.style.top = '24px';
        labelElement.style.fontSize = '16px';
        labelElement.style.lineHeight = '20px';
      }
    };

    return (
      <>
        <label
          className={
            `block relative rounded-[16px] text-grayscale-900  px-[24px] border-[0.5px] border-[#00000026] hover:border-grayscale-900 focus:border-grayscale-900 focus:outline-none h-[68px] min-h-[68px]
           ${isFocus ? 'border-grayscale-900' : ''} ${isFocus || value ? 'py-[12px]' : 'py-[24px]'}`
          }
        >
          {label && (
            <span
              ref={labelRef}
              className="block font-inter-400 text-16-20 text-grayscale-600 absolute top-[24px] ease-in-out duration-300"
            >
              {isRequired && <span className={'text-red'}>*&nbsp;</span>}
              {label}
              &nbsp;
              {tooltip && (
                <Tooltip
                  placement="top"
                  title={tooltip}
                  sx={{ fontSize: 16 }}
                  arrow
                >
                  <HelpOutlineIcon />
                </Tooltip>
              )}
            </span>
          )}

          <input
            ref={ref}
            className={clsx(
              'w-full font-inter-500 text-16-20 text-grayscale-900',
              'placeholder:text-grayscale-500',
              'focus:border-grayscale-900 focus:outline-none',
              `${isFocus || value ? 'opacity-100 mt-[20px]' : 'opacity-0'}`,
              classes,
              {
                ['text-red-6 border-[0.5px] border-red-6 hover:border-red-6 focus:border-red-6']:
                  error?.show,
                ['pr-[42px]']: type === 'password' && showIconPassword,
              },
            )}
            type={htmlType}
            onFocus={(inputFocusProps: any) => {
              handleFocusWrapper(inputFocusProps);
            }}
            onBlur={(inputBlurProps: any) => {
              handleBlurWrapper(inputBlurProps);
            }}
            value={value}
            {...props}
          />
          {endAdornment ?
            <div className={'absolute top-1/2 right-[12px] -translate-y-1/2'}>{endAdornment}</div> :
            <>
              {type === 'password' && showIconPassword && (
                <button
                  className={'absolute top-1/2 right-[12px] -translate-y-1/2'}
                  onClick={() => toggletPasswod(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </button>
              )}
            </>
          }
        </label>

        {error && <Error {...error} />}
      </>
    );
  },
);

export default BasicInput;
