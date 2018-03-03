import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import firebase from 'firebase'

import App from './app/App'
import { firebaseConfig, reducers } from './app/Core'

firebase.initializeApp(firebaseConfig(process.env.NODE_ENV))

const store = createStore(
  reducers,
  /* preloadedState, */
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
