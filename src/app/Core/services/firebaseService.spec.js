import firebase from 'firebase'
import { getBills, updateBill } from './firebaseService';

import { Creators } from '../../LatestBills/actions/actions';

jest.mock('firebase')

describe('When successfully getting bills from firebase', () => {
  let sut
  let dispatch = jest.fn()

  beforeAll(() => {
    firebase.database = () => ({
      ref: () => ({
        once: () => Promise.resolve({ val: jest.fn(() => [{ name: 'oh sheeeet'}]) })
      })
    })

    getBills()(dispatch)
  })

  it('should dispatch an action before attempting to fetch the bills', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.getBillsAttempt())
  })

  it('should dispatch an action after successfully getting the bills', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.getBillsSuccess([{ name: 'oh sheeeet'}]))
  })
})

describe('When failing to get bills from firebase', () => {
  let sut
  let dispatch = jest.fn()

  beforeAll(() => {
    firebase.database = () => ({
      ref: () => ({
        once: () => Promise.reject('wtf why dis fail?')
      })
    })

    getBills()(dispatch)
  })

  it('should dispatch an action before attempting to fetch the bills', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.getBillsAttempt())
  })

  it('should dispatch an action after failing to get the bills', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.getBillsFailure('wtf why dis fail?'))
  })
})

describe('When successfully updating a bill in firebase', () => {
  let sut
  let dispatch = jest.fn()

  beforeAll(() => {
    const updatedBill = { id: 5, name: 'even cool' }
    const originalBill = { id: 5, name: 'cooler' }

    firebase.database = () => ({
      ref: () => ({
        set: () => Promise.resolve()
      })
    })

    updateBill(updatedBill, originalBill)(dispatch)
  })

  it('should dispatch an action before attempting to update the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.updateBillAttempt())
  })

  it('should dispatch an action after successfully updating the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.updateBillSuccess())
  })
})

describe('When failing to update a bill in firebase', () => {
  let sut
  let dispatch = jest.fn()

  const updatedBill = { id: 5, name: 'even cool' }
  const originalBill = { id: 5, name: 'cooler' }

  beforeAll(() => {
    firebase.database = () => ({
      ref: () => ({
        set: () => Promise.reject('interweb izzues')
      })
    })

    updateBill(updatedBill, originalBill)(dispatch)
  })

  it('should dispatch an action before attempting to update the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.updateBillAttempt())
  })

  it('should dispatch an action after successfully updating the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(Creators.updateBillFailure('interweb izzues', originalBill))
  })
})

