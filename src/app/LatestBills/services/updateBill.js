import firebase from 'firebase'

import { Creators } from '../../LatestBills/actions/actions';

export default (updatedBill, originalBill) => {
  return dispatch => {
    dispatch(Creators.updateBillAttempt())

    firebase.database().ref('bills/' + updatedBill.id).set(updatedBill)
      .then(() => dispatch(Creators.updateBillSuccess(originalBill)))
      .catch(err => dispatch(Creators.updateBillFailure(err, originalBill)))
  }
}