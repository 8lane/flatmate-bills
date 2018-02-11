import React from 'react';

import { LatestBills, NewBillForm } from './containers'

window.moment = require('moment')

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Flatmate Bills</h1>
        <LatestBills />
        <NewBillForm />
      </div>
    )
  }
}

export default App