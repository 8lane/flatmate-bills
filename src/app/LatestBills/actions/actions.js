import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  saveNewBill: ['newBill'],
  deleteBill: ['billId'],
  toggleSegmentPaid: ['billId', 'flatmateId']
})
