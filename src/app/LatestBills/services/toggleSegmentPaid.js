import firebase from 'firebase'

import { round, calculatePricePerDay, calculatePricePerPerson } from '../../helpers/Prices'
import { getDaysBetweenDates } from '../../helpers/Dates'

import { Creators } from '../../LatestBills/actions/actions';
import { updateBill } from '../services'

export default (billId, flatmateId, currentBills) => {
  return dispatch => {
    const updatedBills = currentBills.map(bill => {
      if (bill.id === billId) {
        let segmentsCurrentBalance
        let segmentsIsPaid
  
        const numberOfDays = getDaysBetweenDates(bill.dateFrom, bill.dateTo)
        const pricePerDay = calculatePricePerPerson(
          calculatePricePerDay(bill.price, numberOfDays), bill.segments.length, bill.numberOfSplitSegments
        )
  
        return bill.merge({
          segments: bill.segments.map(segment => {
            if (segment.flatmateId === flatmateId) {
  
              if (segment.isPaid) {
                segmentsCurrentBalance = bill.segmentsCurrentBalance - (pricePerDay * segment.daysOwed)
              } else {
                segmentsCurrentBalance = bill.segmentsCurrentBalance + (pricePerDay * segment.daysOwed)
              }
  
              segmentsIsPaid = bill.price === round(segmentsCurrentBalance)
  
              return segment.merge({ isPaid: !segment.isPaid })
            }
            return segment
          }),
          segmentsCurrentBalance,
          segmentsIsPaid
        })
      }
  
      return bill
    })

    dispatch(Creators.toggleSegmentPaid(updatedBills))
    dispatch(updateBill(updatedBills[billId], currentBills[billId]))
  }
}