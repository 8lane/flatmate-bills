import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actions'

export const INITIAL_STATE = {
  newBill: {
    id: null,
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
  isEditing: false,
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

const updateNewFormField = (state, action) => ({
  ...state,
  newBill: {
    ...state.newBill,
    [action.fieldKey]: action.fieldValue
  }
})

const clearNewForm = (state) => ({ ...state, newBill: INITIAL_STATE.newBill })

const ACTION_HANDLERS = {
  [Types.TOGGLE_EQUAL_SEGMENT_SPLIT]: toggleEqualSegmentSplit,
  [Types.TOGGLE_NEW_FORM_VISIBILITY]: toggleNewFormVisibility,
  [Types.UPDATE_SEGMENT_DAYS_OWED]: updateSegmentDaysOwed,
  [Types.UPDATE_NEW_FORM_FIELD]: updateNewFormField,
  [Types.CLEAR_NEW_FORM]: clearNewForm,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
