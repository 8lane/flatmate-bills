import { Creators } from '../actions/actions'
import reducers, { INITIAL_STATE } from './reducers';

describe('When setting up latest bills reducers', () => {
  it('should have a default state', () => {
    const sut = reducers(undefined, {})
    expect(sut).toEqual(INITIAL_STATE)
  });
})

describe('When toggling a bill segment as paid', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.toggleSegmentPaid([{ id: 1 }]))
  })

  it('should update the latest bills', () => {
    expect(sut).toEqual({ gettingBills: false, latestBills: [{ id: 1 }], error: null })
  })
})

describe('When deleting a bill', () => {
  let sut

  beforeAll(() => {
    const state = INITIAL_STATE.merge({ latestBills: [{ id: 1 }, { id: 2 }, { id: 3}] })
    sut = reducers(state, Creators.deleteBill(2))
  })

  it('should update the latest bills', () => {
    expect(sut).toEqual({ gettingBills: false, latestBills: [{ id: 1 }, { id: 3}], error: null })
  })
})

describe('When attempting to get bills', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.getBillsAttempt())
  })

  it('should update state to show the request is being made', () => {
    expect(sut.gettingBills).toBeTruthy()
  })
})

describe('After successfully getting bills', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.getBillsSuccess([{}, {}, {}]))
  })

  it('should update state to show the request is being made', () => {
    expect(sut).toEqual({ gettingBills: false, latestBills: [{}, {}, {}], error: null })
  })
})

describe('After failing to get bills', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.getBillsFailure('oh nooos'))
  })

  it('should update state to show the request is being made', () => {
    expect(sut).toEqual({ gettingBills: false, latestBills: [], error: 'oh nooos' })
  })
})

describe('When attempting to update a bill', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.updateBillAttempt())
  })

  it('should update state to show the request is being made', () => {
    expect(sut.updatingBill).toBeTruthy()
  })
})

describe('After successfully updating a bill', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.updateBillSuccess())
  })

  it('should update state to show the request is being made', () => {
    expect(sut).toEqual({ updatingBill: false, gettingBills: false, error: null, latestBills: [], })
  })
})

describe('After failing to update a bill', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.updateBillFailure('oh nooos'))
  })

  it('should update state to show the request is being made', () => {
    expect(sut).toEqual({ updatingBill: false, gettingBills: false, latestBills: [], error: 'oh nooos' })
  })
})