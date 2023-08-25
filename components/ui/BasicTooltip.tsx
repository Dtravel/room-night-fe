import React from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'

interface Props extends TooltipProps {}

const BootstrapTooltip = styled(({ className, children, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }}>
    {children}
  </Tooltip>
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#171716',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#171716',
    padding: '6px 8px',
    borderRadius: '8px',
  },
}))

const BasicTooltip: React.FC<Props> = ({ children, ...props }) => {
  return <BootstrapTooltip {...props}>{children}</BootstrapTooltip>
}

export default BasicTooltip
