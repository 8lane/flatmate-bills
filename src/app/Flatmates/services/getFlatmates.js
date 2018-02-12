import firebase from 'firebase'

import { Creators } from '../../Flatmates/actions/actions';

export default () => {
  return dispatch => {
    dispatch(Creators.getFlatmatesAttempt())

    firebase.database().ref('flatmates').once('value')
      .then(snapshot => dispatch(Creators.getFlatmatesSuccess(snapshot.val())))
      .catch(err => dispatch(Creators.getFlatmatesFailure(err)))
  }
}