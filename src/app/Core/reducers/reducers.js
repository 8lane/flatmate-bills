import { combineReducers } from 'redux'

import { reducers as Bills } from '../../LatestBills'
import { reducers as BillFormNew } from '../../BillFormNew'
import { reducers as Flatmates } from '../../Flatmates'

export default combineReducers({
  Bills,
  BillFormNew,
  Flatmates
})
