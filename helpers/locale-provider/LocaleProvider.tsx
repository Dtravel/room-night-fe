import React from 'react'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { useAppSelector } from '@dtravel/redux/hooks'
import en from '@dtravel/locale/en.json'
import vi from '@dtravel/locale/vi.json'

interface Props {
  children?: React.ReactNode
}

const LocaleProvider: NextPage<Props> = (props) => {
  const { locale } = useAppSelector((state) => state.common)
  const messages = useMemo(() => {
    switch (locale) {
      case 'vi':
        return vi
      case 'en-US':
        return en
      default:
        return en
    }
  }, [locale])
  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en-US">
      {props.children}
    </IntlProvider>
  )
}

export default LocaleProvider
