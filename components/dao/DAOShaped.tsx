import React from 'react'
import { DAO_EXTERNAL_LINK } from './DAO'

const DAOShaped = () => {
  return (
    <>
      <div className="dashboardShaped daoItem lastItem">
        <div className="commonBG dashboardShapedBG leftShaped howItWorkItem">
          <div className="dashboardShapedContent">
            <p className="dashboardShapedContentTitle">How it works</p>
            <p className="dashboardShapedContentDescription">
              Any member of the Dtravel DAO can submit proposals on how to improve the Dtravel platform, vote on proposals and participate in other activities that benefit all members. For more details, check out our whitepaper.
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <a href={DAO_EXTERNAL_LINK.DAO} target="_blank" rel="noreferrer">
                <div className="dashboardShapedContentBtn">Read the whitepaper</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="dashboardShaped dashboardTravelers daoItem lastItem">
        <div className="commonBG dashboardShapedBG rightShaped contributeItem">
          <div className="dashboardShapedContent">
            <p className="dashboardShapedContentTitle">Contribute and get rewarded</p>
            <p className="dashboardShapedContentDescription">
              Work looks different in a Web3 world. Use your expertise and be rewarded for contributing your time and talents to Dtravel.
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <a href={DAO_EXTERNAL_LINK.Contribute} target="_blank" rel="noreferrer">
                <div className="dashboardShapedContentBtn">Learn More</div>
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default DAOShaped
