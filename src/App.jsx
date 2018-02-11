import React from 'react'
import 'uikit/dist/css/uikit.css'

import './App.css'

import { LatestBills, BillFormNew } from './containers'

window.moment = require('moment')

class App extends React.Component {
  render() {
    return (
      <div className="uk-container uk-container-small uk-width-1-2 uk-margin-top uk-margin-bottom">
        <h1 className="uk-margin-top">Flatmate Bills</h1>
        <LatestBills />
        <BillFormNew />
      </div>
    )
  }
}

export default App