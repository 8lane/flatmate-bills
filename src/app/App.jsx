import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import 'uikit/dist/css/uikit.css'
import './App.css'

import { Creators as BillFormNewCreators } from './BillFormNew/actions/actions';

import { LatestBills } from './LatestBills/containers'
import { BillFormNew } from './BillFormNew/containers'

import { AppTitle } from './Common'

import { getFlatmates } from './Flatmates/services'
import { getBills } from './Core/services/firebaseService'

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
        <h1 className="uk-margin-top">
          <AppTitle editMode={this.props.isEditing} />

          <button
            className="new-bill-btn uk-button uk-button-text uk-margin-remove-bottom uk-align-right"
            onClick={() => this.props.onToggleVisibility(!this.props.isEditing)}
          >
            {!this.props.isEditing ?
              <span uk-icon="icon: plus; ratio: 2"></span>
            :
              <span uk-icon="icon: close; ratio: 2"></span>
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