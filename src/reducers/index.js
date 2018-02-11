import { combineReducers } from 'redux'

import bills from './bills'
import flatmates from './flatmates'

import BillFormNew from '../containers/BillFormNew/reducers'

const appReducer = combineReducers({
  bills,
  flatmates,
  BillFormNew
})

export default appReducer
