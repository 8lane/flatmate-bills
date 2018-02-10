import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  addBill: ['payload'],
  deleteBill: ['billId'],

  setNewBillEditing: ['payload'],
  toggleSegmentPaid: ['billId', 'flatmateId']
})
