import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getFlatmatesAttempt: [],
  getFlatmatesSuccess: ['flatmates'],
  getFlatmatesFailure: ['error'],
})
