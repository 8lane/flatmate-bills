import { round } from '../../Helpers/Prices'

import { Creators } from '../../LatestBills/actions/actions'
import { updateBill } from '../../Core/services/firebaseService'

import toggleSegmentPaid from './toggleSegmentPaid'

jest.mock('../../Core/services/firebaseService', () => ({
  updateBill: jest.fn()
}))

describe('When toggling a bill segment as paid', () => {
  const dispatch = jest.fn()

  beforeAll(() => {
    const latestBills = [
      { id: 'sickbillidd00d', segments: [{ price: 2 }, { price: 2 }], segmentsCurrentBalance: 0 },
      { id: 'ripper', segments: [{ flatmateId: 88, price: 4 }, { flatmateId: 49, price: 4 }], segmentsCurrentBalance: 0 },
      { id: 'harrypooper', segments: [{ price: 6 }, { price: 6 }], segmentsCurrentBalance: 0 }
    ]

    toggleSegmentPaid(latestBills, 1, 49)(dispatch)
  })

  it('should update the latest bills with the new segment updated', () => {
    const expected = Creators.toggleSegmentPaid([
      { id: 'sickbillidd00d', segments: [{ price: 2 }, { price: 2 }], segmentsCurrentBalance: 0 },
      { id: 'ripper', segments: [{ flatmateId: 88, price: 4 }, { flatmateId: 49, price: 4, isPaid: true }], segmentsCurrentBalance: 4 },
      { id: 'harrypooper', segments: [{ price: 6 }, { price: 6 }], segmentsCurrentBalance: 0 }
    ])

    expect(dispatch).toHaveBeenCalledWith(expected)
  })

  it('should sync the bill with firebase', () => {
    expect(dispatch).toHaveBeenCalledWith(updateBill())
  })

  describe('and then toggling it again as unpaid', () => {
    const dispatch = jest.fn()

    beforeAll(() => {
      const latestBills = [
        { id: 'sickbillidd00d', segments: [{ price: 2 }, { price: 2 }], segmentsCurrentBalance: 0 },
        { id: 'ripper', segments: [{ flatmateId: 88, price: 4 }, { flatmateId: 49, isPaid: true, price: 4 }], segmentsCurrentBalance: 4 },
        { id: 'harrypooper', segments: [{ price: 6 }, { price: 6 }], segmentsCurrentBalance: 0 }
      ]

      toggleSegmentPaid(latestBills, 1, 49)(dispatch)
    })
  
    it('should update the latest bills with the segment updated', () => {
      const expected = Creators.toggleSegmentPaid([
        { id: 'sickbillidd00d', segments: [{ price: 2 }, { price: 2 }], segmentsCurrentBalance: 0 },
        { id: 'ripper', segments: [{ flatmateId: 88, price: 4 }, { flatmateId: 49, isPaid: false, price: 4 }], segmentsCurrentBalance: 0 },
        { id: 'harrypooper', segments: [{ price: 6 }, { price: 6 }], segmentsCurrentBalance: 0 }
      ])
  
      expect(dispatch).toHaveBeenCalledWith(expected)
    })

    it('should sync the bill with firebase', () => {
      expect(dispatch).toHaveBeenCalledWith(updateBill())
    })
  })
})