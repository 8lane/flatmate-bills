import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actions'

export const INITIAL_STATE = Immutable({
  gettingBills: false,
  latestBills: [],
  error: null
})

const toggleSegmentPaid = (state, action) => state.merge({ latestBills: action.latestBills })

const saveNewBill = (state, action) => state.merge({
  latestBills: [
    ...state.latestBills,
    {
      id: state.latestBills.length + 1,
      name: null,
      flatmateOwner: 0,
      price: 0,
      dateFrom: null,
      dateTo: null,
      datePaid: null,
      archived: false,
      numberOfSplitSegments: 0,
      segmentsIsPaid: false,
      segmentsCurrentBalance: 0,
      segments: [],
      ...action.newBill
    }
  ]
})

const deleteBill = (state, action) => state.merge({
  latestBills: state.latestBills.filter(bill => bill.id !== action.billId)
})

const getBillsAttempt = (state) => state.merge({ gettingBills: true })
const getBillsSuccess = (state, action) => state.merge({ gettingBills: false, latestBills: action.bills })
const getBillsFailure = (state, action) => state.merge({ gettingBills: false, error: action.error })

const updateBillAttempt = (state) => state.merge({ updatingBill: true })
const updateBillSuccess = (state, action) => state.merge({ updatingBill: false, error: null })
const updateBillFailure = (state, action) => state.merge({
  updatingBill: false,
  error: action.error,
  latestBills: state.latestBills.map(
    bill => bill.id === action.originalBill.id ? action.originalBill : bill
  )
})

const ACTION_HANDLERS = {
  [Types.GET_BILLS_ATTEMPT]: getBillsAttempt,
  [Types.GET_BILLS_SUCCESS]: getBillsSuccess,
  [Types.GET_BILLS_FAILURE]: getBillsFailure,

  [Types.UPDATE_BILL_ATTEMPT]: updateBillAttempt,
  [Types.UPDATE_BILL_SUCCESS]: updateBillSuccess,
  [Types.UPDATE_BILL_FAILURE]: updateBillFailure,

  [Types.TOGGLE_SEGMENT_PAID]: toggleSegmentPaid,
  [Types.SAVE_NEW_BILL]: saveNewBill,
  [Types.DELETE_BILL]: deleteBill
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
