import BasicButton from '@dtravel/components/ui/BasicButton'
import { Contact } from '@dtravel/helpers/interfaces'
import { useRouter } from 'next/router'
import React from 'react'
import { useAppSelector } from '@dtravel/redux/hooks'
import useTheme from '@dtravel/helpers/hooks/useTheme'
import BusinessContact from '@dtravel/components/merchant-map-view/BusinessContact'

const ContactHost: React.FC<Contact> = ({ contactName, contactEmail, contactPhone1, contactPhone2 }) => {
  const router = useRouter()
  const isPropertyPage = router.pathname.includes('/property/')
  const { businessInfor } = useAppSelector((state) => state.property)
  const { color } = useTheme()

  return (
    <div className="flex flex-col items-start">
      {!isPropertyPage && (
        <p className="text-neutral-700 font-inter-400 text-16-20 mb-8">
          {'If you need to cancel or change your reservation, contact us.'}
        </p>
      )}
      <BusinessContact
        parentClass={'w-full'}
        contactEmail={contactEmail}
        contactPhone1={contactPhone1}
        contactPhone2={contactPhone2}
      >
        <BasicButton variant={'outlined'} clases={'w-full lg:w-auto'}>
          <span
            className={'w-full max-w-[300px] md:max-w-[220px] truncate text-16-20 font-inter-500 text-grayscale-900'}
            style={color ? { color } : {}}
          >
            Contact {businessInfor?.contactName || contactName}
          </span>
        </BasicButton>
      </BusinessContact>
    </div>
  )
}

export default ContactHost
