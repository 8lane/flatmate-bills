import { createReducer } from 'reduxsauce'

import { Types } from '../actions/actions'
import { calculatePricePerDay, calculatePricePerPerson } from '../../helpers/Prices'
import { getDaysBetweenDates } from '../../helpers/Dates'

export const INITIAL_STATE = {
  newBill: {
    name: '',
    flatmateOwner: '',
    price: '',
    dateFrom: null,
    dateTo: null,
    datePaid: null,
    archived: false,
    numberOfSplitSegments: 0,
    segmentsIsPaid: false,
    segmentsCurrentBalance: 0,
    segments: [],
  },
  isEditing: true,
  equalSegmentSplit: true,
}

const toggleNewFormVisibility = (state, action) => ({ ...state, isEditing: action.payload })

const toggleEqualSegmentSplit = (state) => ({
  ...state,
  equalSegmentSplit: !state.equalSegmentSplit,
  newBill: {
    ...state.newBill,
    segments: state.newBill.segments.map(
      segment => state.equalSegmentSplit ? segment : { ...segment, daysOwed: null }
    )
  }
})

const updateSegmentDaysOwed = (state, action) => ({
  ...state,
  newBill: {
    ...state.newBill,
    segments: state.newBill.segments.map(segment => {
      if (segment.flatmateId === parseInt(action.flatmateId)) {
        return {
          ...segment,
          daysOwed: parseInt(action.fieldValue)
        }
      } else {
        return segment
      }
    })
  }
})

const updateNewFormField = (state, action) => {
  const {
    newBill: {
      price,
      dateFrom,
      dateTo,
      segments,
      numberOfSplitSegments
    },
    equalSegmentSplit,
  } = state
  
  let daysOwed = null
  let pricePerDay = null
  let value = action.fieldValue

  if (action.fieldKey === 'segments') {
    if (dateFrom && dateTo) {
      daysOwed = getDaysBetweenDates(dateFrom, dateTo)
    }

    if (daysOwed) {
      const ppd = calculatePricePerDay(parseFloat(price), daysOwed)
      pricePerDay = calculatePricePerPerson(ppd, segments.length + 1, numberOfSplitSegments)
    }

    value = action.fieldValue.map(segment => ({
      ...segment,
      daysOwed,
      price: pricePerDay * daysOwed
    }))
  }

  return {
    ...state,
    newBill: {
      ...state.newBill,
      [action.fieldKey]: value,
    }
  }
}

const clearNewForm = (state) => ({ ...state, newBill: INITIAL_STATE.newBill })

const createBillAttempt = (state) => ({ ...state, creatingBill: true })
const createBillSuccess = (state, action) => ({ ...state, creatingBill: false })
const createBillFailure = (state, action) => ({ ...state, creatingBill: false, error: action.error })

const ACTION_HANDLERS = {
  [Types.CREATE_BILL_ATTEMPT]: createBillAttempt,
  [Types.CREATE_BILL_SUCCESS]: createBillSuccess,
  [Types.CREATE_BILL_FAILURE]: createBillFailure,

  [Types.TOGGLE_EQUAL_SEGMENT_SPLIT]: toggleEqualSegmentSplit,
  [Types.TOGGLE_NEW_FORM_VISIBILITY]: toggleNewFormVisibility,
  [Types.UPDATE_SEGMENT_DAYS_OWED]: updateSegmentDaysOwed,
  [Types.UPDATE_NEW_FORM_FIELD]: updateNewFormField,
  [Types.CLEAR_NEW_FORM]: clearNewForm,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
