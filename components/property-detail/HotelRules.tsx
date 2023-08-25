import React, { useEffect, useState } from 'react'
import DetailCard from '@dtravel/components/property-detail/DetailCard'
import ViewMoreContent from '@dtravel/components/common/ViewMoreContent'
import { UPLISTING_MAP_HOME_RULES } from '@dtravel/helpers/constants/constants'
import { canParseJSON, isEmpty } from '@dtravel/utils/common'

interface Props {
  // pmsType: string
  houseRules: string
}

const HotelRules: React.FC<Props> = ({ houseRules }) => {
  const [rules, setRules] = useState<any>({})
  // const isSpecialFormat = pmsType === PMS.UPLISTING || pmsType === PMS.GUEST_SMILES
  useEffect(() => {
    // if (isSpecialFormat || canParseJSON(houseRules)) {
    if (canParseJSON(houseRules)) {
      setRules(JSON.parse(houseRules))
    } else {
      setRules({})
    } // eslint-disable-next-line
  }, [houseRules])

  return (
    <DetailCard title={'Home rules'}>
      {!isEmpty(rules) ? (
        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-[16px] lggap-[24px]'}>
          {Object.keys(rules).map((key: any) => {
            return (
              <div key={key} className={'font-inter-400 text-16-20 text-neutral-900'}>
                {UPLISTING_MAP_HOME_RULES[key][rules[key] ? '1' : '0']}
              </div>
            )
          })}
        </div>
      ) : (
        <div className={'mb-4 text-black-1 lg:text-sand-8'}>
          <ViewMoreContent content={houseRules} numberOfLine={5} />
        </div>
      )}
    </DetailCard>
  )
}

export default HotelRules
