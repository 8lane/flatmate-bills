import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import App from './App'

import flatmates from './reducers/flatmates'
import Bills from './containers/LatestBills/reducers/reducers'
import BillFormNew from './containers/BillFormNew/reducers/reducers'

const appReducer = combineReducers({
  flatmates,
  Bills,
  BillFormNew
})

const store = createStore(
  appReducer,
  /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
