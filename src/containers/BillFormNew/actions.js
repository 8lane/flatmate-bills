import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  updateSegmentDaysOwed: ['fieldValue', 'flatmateId'],
  updateNewFormField: ['fieldKey', 'fieldValue'],
  clearNewForm: [],
  toggleEqualSegmentSplit: [],
  toggleNewFormVisibility: ['payload'],
})
