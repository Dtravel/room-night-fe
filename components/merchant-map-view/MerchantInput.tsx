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
}

const MerchantInput = forwardRef<HTMLInputElement, InputProps>(
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
      ...props
    },
    ref,
  ) => {
    // const inputRef = useRef<HTMLInputElement | null>(null);
    const labelRef = useRef<HTMLSpanElement | null>(null);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [htmlType, setHtmlType] = useState<
      HTMLInputTypeAttribute | undefined
    >('text');
    const [isFocus, setFocus] = useState<boolean>(false);
    const [value, setValue] = useState<
      string | number | readonly string[] | undefined
    >('');

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
    };

    const handleBlurWrapper = (inputBlurProps: any) => {
      setFocus(false);
      if (handleBlur) handleBlur(inputBlurProps);
    };

    return (
      <>
        <label
          className={
            `block relative rounded-[16px] text-neutral-8 px-[24px] border border-sand-3 hover:border-sand-8 focus:border-sand-8 focus:outline-none
           ${isFocus ? 'border-sand-8' : ''} ${isFocus || value ? 'py-[24px]' : 'py-[24px]'}`
          }
        >
          {label && (
            <span
              ref={labelRef}
              className={
                'block font-inter-400 text-14-18 text-neutral-600 ease-in-out duration-300 tracking-[.48px] mb-[4px]'
              }
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
              'w-full font-inter-500 text-14-18 text-neutral-900',
              'placeholder:text-sand-5',
              'focus:border-grey-700 focus:outline-none',
              `${isFocus || value ? 'opacity-100' : 'opacity-0'}`,
              classes,
              {
                ['text-red-6 border border-red-6 hover:border-red-6 focus:border-red-6']:
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
        </label>

        {error && <Error {...error} />}
      </>
    );
  },
);

export default MerchantInput;
