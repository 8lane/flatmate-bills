import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getBillsAttempt: [],
  getBillsSuccess: ['bills'],
  getBillsFailure: ['error'],

  updateBillAttempt: [],
  updateBillSuccess: [],
  updateBillFailure: ['error', 'originalBill'],

  saveNewBill: ['newBill'],
  deleteBill: ['billId'],
  toggleSegmentPaid: ['updatedBills']
})
