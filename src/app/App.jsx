import React from 'react'
import firebase from 'firebase'

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import 'uikit/dist/css/uikit.css'
import './App.css'

import { LatestBills } from './LatestBills/containers'
import { BillFormNew } from './BillFormNew/containers'

window.moment = require('moment')
window.UIkit = UIkit
UIkit.use(Icons);

class App extends React.Component {
  componentDidMount() {
    //firebase.database().ref('flatmates').set(require('../mocks/flatmates'))
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="uk-margin-top">🏠 25 Northways Bills</h1>
        <LatestBills />
        {/* <BillFormNew /> */}
      </div>
    )
  }
}

export default App