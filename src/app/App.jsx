import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import 'uikit/dist/css/uikit.css'
import './App.css'

import { LatestBills } from './LatestBills/containers'
import { BillFormNew } from './BillFormNew/containers'

import { getFlatmates } from './Flatmates/services'
import { getBills } from './LatestBills/services'

window.moment = require('moment')
window.UIkit = UIkit
UIkit.use(Icons);

class App extends React.Component {
  componentDidMount() {
    // firebase.database().ref('bills').set(require('../mocks/bills').default)
    // firebase.database().ref('flatmates').set(require('../mocks/flatmates').default)
    this.props.getFlatmates()
    this.props.getBills()
  }

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

const mapDispatchToProps = dispatch => ({
  getFlatmates: () => dispatch(getFlatmates()),
  getBills: () => dispatch(getBills())
});

export default connect(null, mapDispatchToProps)(App)