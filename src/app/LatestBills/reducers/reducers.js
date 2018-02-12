import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actions'

import { round, calculatePricePerDay } from '../../helpers/Prices'
import { getDaysBetweenDates } from '../../helpers/Dates'

export const INITIAL_STATE = Immutable({
  gettingBills: false,
  latestBills: [],
  error: null
})

const toggleSegmentPaid = (state, action) => state.merge({
  latestBills: state.latestBills.map(bill => {
    if (bill.id === action.billId) {
      let segmentsCurrentBalance
      let segmentsIsPaid

      const numberOfDays = getDaysBetweenDates(bill.dateFrom, bill.dateTo)
      const pricePerDay = calculatePricePerDay(bill, numberOfDays)

      return bill.merge({
        segments: bill.segments.map(segment => {
          if (segment.flatmateId === action.flatmateId) {

            if (segment.isPaid) {
              segmentsCurrentBalance = bill.segmentsCurrentBalance - (pricePerDay * segment.daysOwed)
            } else {
              segmentsCurrentBalance = bill.segmentsCurrentBalance + (pricePerDay * segment.daysOwed)
            }

            segmentsIsPaid = bill.price === round(segmentsCurrentBalance)

            return segment.merge({ isPaid: !segment.isPaid })
          }
          return segment
        }),
        segmentsCurrentBalance,
        segmentsIsPaid
      })
    }

    return bill
  })
})

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

const ACTION_HANDLERS = {
  [Types.GET_BILLS_ATTEMPT]: getBillsAttempt,
  [Types.GET_BILLS_SUCCESS]: getBillsSuccess,
  [Types.GET_BILLS_FAILURE]: getBillsFailure,

  [Types.TOGGLE_SEGMENT_PAID]: toggleSegmentPaid,
  [Types.SAVE_NEW_BILL]: saveNewBill,
  [Types.DELETE_BILL]: deleteBill
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
