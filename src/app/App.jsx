import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

import 'uikit/dist/css/uikit.css'
import './App.css'

import { Creators as BillFormNewCreators } from './BillFormNew/actions/actions';
import { AppTitle } from './Common'
import { BillFormNew } from './BillFormNew/containers'
import { LatestBills } from './LatestBills/containers'
import { getBills, getFlatmates } from './Core/services/firebaseService'

window.moment = require('moment')

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
        <h1 className="uk-margin-top">
          <AppTitle editMode={this.props.isEditing} />

          <button
            className="new-bill-btn uk-button uk-button-text uk-margin-remove-bottom uk-align-right"
            onClick={() => this.props.onToggleVisibility(!this.props.isEditing)}
          >
            {!this.props.isEditing ?
              <svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="2"> <rect x="9" y="1" width="1" height="17"></rect> <rect x="1" y="9" width="17" height="1"></rect></svg>
            :
              <svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="2"> <path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path> <path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
            }
          </button>
        </h1>

        {!this.props.isEditing ?
          <LatestBills />
        :
          <BillFormNew />
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onToggleVisibility: (editing) => dispatch(BillFormNewCreators.toggleNewFormVisibility(editing)),
  getFlatmates: () => dispatch(getFlatmates()),
  getBills: () => dispatch(getBills())
});

const mapStateToProps = state => ({
  isEditing: state.BillFormNew.isEditing
})

export {
  App
}

export default connect(mapStateToProps, mapDispatchToProps)(App)