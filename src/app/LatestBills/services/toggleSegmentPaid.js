import { Creators } from '../../LatestBills/actions/actions';
import { updateBill } from '../../Core/services/firebaseService'

export default (bills, billIndex, flatmateId) => {
  return dispatch => {

    const updatedBills = bills.map((bill, idx) => {
      if (billIndex === idx) {
  
        const togglePaid = (segment) =>
          segment.flatmateId === flatmateId ? { ...segment, isPaid: !segment.isPaid } : segment
  
        const updateBalance = (accumulator, segment) => {
          if (flatmateId === segment.flatmateId) {
            return segment.isPaid ? accumulator - segment.price : accumulator + segment.price
          }
  
          return accumulator
        }
  
        return {
          ...bill,
          segments: bill.segments.map(togglePaid),
          segmentsCurrentBalance: bill.segments.reduce(updateBalance, bill.segmentsCurrentBalance),
        }
      }
  
      return bill
    })

    dispatch(Creators.toggleSegmentPaid(updatedBills))
    dispatch(updateBill(updatedBills[billIndex], bills[billIndex]))
  }
}
