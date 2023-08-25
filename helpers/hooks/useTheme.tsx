import { useContext } from 'react'
import { ThemeContext } from '@dtravel/helpers/context/ThemeContext'

const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw 'themeContext not found'
  }
  return themeContext
}

export default useTheme
