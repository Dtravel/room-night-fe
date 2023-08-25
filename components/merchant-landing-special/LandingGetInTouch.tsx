import React, { useState } from 'react'
import BasicButton from '@dtravel/components/ui/BasicButton'
import BasicDialog from '../ui/BasicDialog'
import Script from 'next/script'
import { useAppSelector } from '@dtravel/redux/hooks'
import clsx from 'clsx'
import Image from 'next/image'
import ic_arrow_right_white from '@dtravel/assets/icons/ic_arrow_right_white.svg'

interface Props { }

const LandingGetInTouch: React.FC<Props> = () => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const isRiley = landingSetting?.name === 'riley'
  const [open, setOpen] = useState<boolean>(false)
  if (!isRiley) return null
  const primaryColor = landingSetting?.primaryColor || "#0F0F0F"
  return (
    <>
      <Script type="text/javascript" src="https://hwn640.infusionsoft.app/app/webTracking/getTrackingCode"></Script>
      <Script type="text/javascript" src="https://hwn640.infusionsoft.com/app/timezone/timezoneInputJs?xid=de7f467d554fab7f2e7e963c9111bfe0"></Script>
      <Script type="text/javascript" src="https://hwn640.infusionsoft.com/js/jquery/jquery-3.3.1.js"></Script>
      <Script type="text/javascript" src="https://hwn640.infusionsoft.app/app/webform/overwriteRefererJs"></Script>
      <div className={'w-full lg:w-1/2'}>
        <BasicButton variant={'outlined'} size={'xxl'} clases={'w-full'} onClick={() => setOpen(true)}>
          <span>Get in touch</span>
        </BasicButton>
      </div>
      <BasicDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title={'Get in touch'}
      >
        <div>
          <form acceptCharset="UTF-8" action="https://hwn640.infusionsoft.com/app/form/process/de7f467d554fab7f2e7e963c9111bfe0" className="infusion-form" id="inf_form_de7f467d554fab7f2e7e963c9111bfe0" method="POST">
            <input name="inf_form_xid" type="hidden" value="de7f467d554fab7f2e7e963c9111bfe0" />
            <input name="inf_form_name" type="hidden" value="Website Contact Us" />
            <input name="infusionsoft_version" type="hidden" value="1.70.0.565833" />
            <div className="infusion-field mb-[10px] h-[64px]">
              {/* <label htmlFor="inf_field_FirstName">Name *</label> */}
              <input
                id="inf_field_FirstName" name="inf_field_FirstName" placeholder="Name *" type="text"
                className='w-full border border-grayscale-300 rounded-[16px] p-6 py-[22px] text-16-20 font-inter-400 text-grayscale-600 h-[64px]'
              />
            </div>
            <div className="infusion-field mb-[10px] h-[64px]">
              {/* <label htmlFor="inf_field_Email">Email *</label> */}
              <input
                id="inf_field_Email" name="inf_field_Email" placeholder="Email *" type="text"
                className='w-full border border-grayscale-300 rounded-[16px] px-6 py-[22px] text-16-20 font-inter-400 text-grayscale-600 h-[64px]'
              />
            </div>
            <div className="infusion-field bg-grayscale-100 p-6 flex flex-col gap-4 mb-2 rounded-[16px]">
              <label htmlFor="inf_option_EnquiryType" className='text-14-18 font-inter-400 text-grayscale-600'>Enquiry Type *</label>
              <div className="infusion-radio">
                <div className="options-container w-full flex items-center gap-3">
                  <div
                    className="infusion-option flex items-center justify-between p-6 rounded-[16px] w-1/2 bg-white border-[0.5px] border-grayscale-300"
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
                  >
                    <label htmlFor="inf_option_EnquiryType_268">Guest</label>
                    <input
                      id="inf_option_EnquiryType_268"
                      name="inf_option_EnquiryType" type="radio" value="268"
                      className={clsx(
                        `h-5 w-5 appearance-none rounded-full cursor-pointer`,
                        `border border-solid border-grayscale-300 bg-white`,
                        `checked:border-[#506523] checked:border-[6px]`,
                      )}
                    />
                  </div>
                  <div
                    className="infusion-option flex items-center justify-between p-6 rounded-[16px] w-1/2 bg-white border-[0.5px] border-grayscale-300"
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
                  >
                    <label htmlFor="inf_option_EnquiryType_270">Host</label>
                    <input
                      id="inf_option_EnquiryType_270"
                      name="inf_option_EnquiryType"
                      type="radio" value="270"
                      className={clsx(
                        `h-5 w-5 appearance-none rounded-full cursor-pointer`,
                        `border border-solid border-grayscale-300 bg-white`,
                        `checked:border-[#506523] checked:border-[6px]`,
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="infusion-field">
              {/* <label htmlFor="inf_custom_WebsiteContact">Your Message *</label> */}
              <textarea
                cols={24} id="inf_custom_WebsiteContact"
                name="inf_custom_WebsiteContact" placeholder="Your Message *" rows={5}
                className="p-6 text-16-20 font-inter-400 text-gray-600 rounded-[16px] border border-grayscale-300 w-full resize-none"
              ></textarea>
            </div>
            <div>
              <div>&nbsp;</div>
            </div>
            <div className="infusion-submit">
              <button
                type="submit"
                style={{
                  backgroundColor: landingSetting?.primaryColor || "#0F0F0F",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)"
                }}
                className={clsx('h-[48px] w-full py-3 px-5 rounded-[12px] flex items-center justify-center gap-2')}
              >
                <span className='text-16-20 text-white font-inter-500'>Submit</span>
                <Image src={ic_arrow_right_white} width={20} height={20} alt={'ic_chevron_down'} />
              </button>
            </div>
          </form>
        </div>
      </BasicDialog>
    </>
  )
}

export default LandingGetInTouch
