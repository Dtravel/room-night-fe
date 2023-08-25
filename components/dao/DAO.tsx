import React from 'react'
import DAOCommunity from './DAOCommunity'
import DAOSharing from './DAOSharing'
import DAOBenefit from './DAOBenefit'
import DAOShaped from './DAOShaped'
import DAOMore from './DAOMore'

interface Props { }
export const DAO_EXTERNAL_LINK = {
  TRVL: 'https://trvl.com',
  DAO: 'https://dao.dtravel.com',
  Contribute: 'https://medium.com/dtravel-community/evolving-the-sharing-economy-support-to-earn-3acc89fd47be'
}
const DAO: React.FC<Props> = () => {
  return (
    <>
      <DAOCommunity />
      <DAOSharing />
      <DAOBenefit />
      <DAOShaped />
      <DAOMore />
    </>
  )
}

export default DAO
