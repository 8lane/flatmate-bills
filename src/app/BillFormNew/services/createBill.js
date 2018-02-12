import firebase from 'firebase'

import { Creators } from '../../BillFormNew/actions/actions';
import { getBills } from '../../LatestBills/services';

export default (newBill) => {
  return dispatch => {
    dispatch(Creators.createBillAttempt())

    firebase.database().ref('bills').update({[newBill.id]: newBill})
      .then(() => {
        dispatch(Creators.createBillSuccess())
        dispatch(Creators.clearNewForm())
        dispatch(Creators.toggleNewFormVisibility())
        dispatch(getBills())
      })
      .catch(err => dispatch(Creators.createBillFailure(err)))
  }
}