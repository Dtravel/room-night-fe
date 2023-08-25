import { useAppSelector } from '@dtravel/redux/hooks';
import React, { useEffect, useState } from 'react'

const ThemeContext = React.createContext<{ color: string }>({
  color: '',
})

interface Props {
  children?: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const { landingSetting } = useAppSelector((state) => state.property)
  const [configColor, setConfigColor] = useState({ color: '' })

  useEffect(() => {
    if (landingSetting?.primaryColor) {
      setConfigColor({ color: landingSetting?.primaryColor })
    }
  }, [landingSetting?.primaryColor])

  return (
    <ThemeContext.Provider value={{ ...configColor }} >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
