import firebase from 'firebase'

import { Creators as LatestBillsCreators } from '../../LatestBills/actions/actions';
import { Creators as BillFormCreators } from '../../BillFormNew/actions/actions';

export const createBill = (newBill) => {
  return dispatch => {
    dispatch(BillFormCreators.createBillAttempt())

    firebase.database().ref('bills').update({[newBill.id]: newBill})
      .then(() => {
        dispatch(BillFormCreators.createBillSuccess())
        dispatch(BillFormCreators.clearNewForm())
        dispatch(BillFormCreators.toggleNewFormVisibility())
        dispatch(getBills())
      })
      .catch(err => dispatch(BillFormCreators.createBillFailure(err)))
  }
}

export const getBills = () => {
  return dispatch => {
    dispatch(LatestBillsCreators.getBillsAttempt())

    firebase.database().ref('bills').once('value')
      .then(snapshot => dispatch(LatestBillsCreators.getBillsSuccess(snapshot.val())))
      .catch(err => dispatch(LatestBillsCreators.getBillsFailure(err)))
  }
}

export const updateBill = (updatedBill, originalBill) => {
  return dispatch => {
    dispatch(LatestBillsCreators.updateBillAttempt())

    firebase.database().ref('bills/' + updatedBill.id).set(updatedBill)
      .then(() => dispatch(LatestBillsCreators.updateBillSuccess(originalBill)))
      .catch(err => dispatch(LatestBillsCreators.updateBillFailure(err, originalBill)))
  }
}

