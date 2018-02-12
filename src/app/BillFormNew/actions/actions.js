import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  createBillAttempt: [],
  createBillSuccess: [],
  createBillFailure: ['error'],

  updateSegmentDaysOwed: ['fieldValue', 'flatmateId'],
  updateNewFormField: ['fieldKey', 'fieldValue'],
  clearNewForm: [],
  toggleEqualSegmentSplit: [],
  toggleNewFormVisibility: ['payload'],
})
