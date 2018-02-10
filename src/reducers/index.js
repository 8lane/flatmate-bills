import { combineReducers } from 'redux'

import bills from './bills'
import flatmates from './flatmates'

const appReducer = combineReducers({
  bills,
  flatmates
})

export default appReducer
