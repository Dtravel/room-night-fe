import React, { useState } from 'react'
import BasicButton from '../ui/BasicButton'

interface Props {
  value: string
  copyLabel?: string
  className?: string
  btnSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

const CopyClipboard: React.FC<Props> = ({ value, copyLabel, className, btnSize }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <BasicButton size={btnSize || 'lg'} onClick={handleCopy}>
      {copied ? (
        <span className={`${className} text-forest-6`}>Copied!</span>
      ) : (
        <span className={`underline text-sand-7 ${className}`}>{copyLabel || 'Copy'}</span>
      )}
    </BasicButton>
  )
}

export default CopyClipboard
