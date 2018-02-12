import firebase from 'firebase'

import { Creators } from '../../LatestBills/actions/actions';

export default () => {
  return dispatch => {
    dispatch(Creators.getBillsAttempt())

    firebase.database().ref('bills').once('value')
      .then(snapshot => dispatch(Creators.getBillsSuccess(snapshot.val())))
      .catch(err => dispatch(Creators.getBillsFailure(err)))
  }
}