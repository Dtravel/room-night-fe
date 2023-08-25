import { combineReducers } from 'redux'
import common from './common'
import property from './property'

const rootReducer: any = combineReducers({
  common,
  property,
})

export default rootReducer
