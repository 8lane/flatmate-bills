import React from 'react'

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import 'uikit/dist/css/uikit.css'
import './App.css'

import { LatestBills, BillFormNew } from './containers'

window.moment = require('moment')
window.UIkit = UIkit
UIkit.use(Icons);

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <h1 className="uk-margin-top">🏠 25 Northways Bills</h1>
        <LatestBills />
        <BillFormNew />
      </div>
    )
  }
}

export default App