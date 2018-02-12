import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getBillsAttempt: [],
  getBillsSuccess: ['bills'],
  getBillsFailure: ['error'],

  saveNewBill: ['newBill'],
  deleteBill: ['billId'],
  toggleSegmentPaid: ['billId', 'flatmateId']
})
