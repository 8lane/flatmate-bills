import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

import App from './app/App'

import { reducers as Bills } from './app/LatestBills'
import { reducers as BillFormNew } from './app/BillFormNew'
import { reducers as Flatmates } from './app/Flatmates'

firebase.initializeApp({
  apiKey: "AIzaSyCBC7D-589zHcKxZu7GeAie2QeD15aPO7c",
  authDomain: "flatmatebills.firebaseapp.com",
  databaseURL: "https://flatmatebills.firebaseio.com",
  projectId: "flatmatebills",
  storageBucket: "",
  messagingSenderId: "408329859921"
})

const appReducer = combineReducers({
  Bills,
  BillFormNew,
  Flatmates
})

const store = createStore(
  appReducer,
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
