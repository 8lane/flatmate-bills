import React from 'react';

import { LatestBills, BillFormNew } from './containers'

window.moment = require('moment')

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Flatmate Bills</h1>
        <LatestBills />
        <BillFormNew />
      </div>
    )
  }
}

export default App