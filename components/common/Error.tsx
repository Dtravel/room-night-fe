import React from 'react'

interface Props {
  show: boolean
  message: string
}

const Error: React.FC<Props> = ({ show, message }) => {
  if (show) return <div className={'text-red-6 mt-2'}>{message}</div>
  return null
}

export default Error
