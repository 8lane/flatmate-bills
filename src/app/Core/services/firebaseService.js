import firebase from 'firebase'

import { Creators } from '../../LatestBills/actions/actions';

export const getBills = () => {
  return dispatch => {
    dispatch(Creators.getBillsAttempt())

    firebase.database().ref('bills').once('value')
      .then(snapshot => dispatch(Creators.getBillsSuccess(snapshot.val())))
      .catch(err => dispatch(Creators.getBillsFailure(err)))
  }
}

export const updateBill = (updatedBill, originalBill) => {
  return dispatch => {
    dispatch(Creators.updateBillAttempt())

    firebase.database().ref('bills/' + updatedBill.id).set(updatedBill)
      .then(() => dispatch(Creators.updateBillSuccess(originalBill)))
      .catch(err => dispatch(Creators.updateBillFailure(err, originalBill)))
  }
}