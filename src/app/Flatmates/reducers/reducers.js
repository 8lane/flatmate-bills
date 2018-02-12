import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actions'

export const INITIAL_STATE = Immutable({
  gettingFlatmates: false,
  flatmates: [],
  error: null
})

const getFlatmatesAttempt = (state) => state.merge({ gettingFlatmates: true })
const getFlatmatesSuccess = (state, action) => state.merge({ gettingFlatmates: false, flatmates: action.flatmates })
const getFlatmatesFailure = (state, action) => state.merge({ gettingFlatmates: false, error: action.error })

const ACTION_HANDLERS = {
  [Types.GET_FLATMATES_ATTEMPT]: getFlatmatesAttempt,
  [Types.GET_FLATMATES_SUCCESS]: getFlatmatesSuccess,
  [Types.GET_FLATMATES_FAILURE]: getFlatmatesFailure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
