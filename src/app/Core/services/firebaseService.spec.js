import firebase from 'firebase'
import { createBill, getBills, updateBill } from './firebaseService';

import { Creators as LatestBillsCreators } from '../../LatestBills/actions/actions';
import { Creators as BillFormCreators } from '../../BillFormNew/actions/actions';

jest.mock('firebase')

describe('When successfully creating a bill in firebase', () => {
  let dispatch = jest.fn()
  const newBill = { id: 1991, name: 'speeding fine' }

  beforeAll(() => {
    firebase.database = () => ({
      ref: () => ({
        update: () => Promise.resolve()
      })
    })

    createBill(newBill)(dispatch)
  })

  it('should dispatch an action before attempting to create the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(BillFormCreators.createBillAttempt())
  })

  it('should dispatch an action after successfully creating the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(BillFormCreators.createBillSuccess())
  })

  it('should dispatch an action to clear the new bill form ', () => {
    expect(dispatch).toHaveBeenCalledWith(BillFormCreators.clearNewForm())
  })

  it('should dispatch an action to exit the new bill form page', () => {
    expect(dispatch).toHaveBeenCalledWith(BillFormCreators.toggleNewFormVisibility())
  })

  it('should update the latest bills list', () => {
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
  })
})

describe('When failing to create a bill in firebase', () => {
  let dispatch = jest.fn()
  const newBill = { id: 1991, name: 'speeding fine' }

  beforeAll(() => {
    firebase.database = () => ({
      ref: () => ({
        update: () => Promise.reject('u goto jail mutha fucker')
      })
    })

    createBill(newBill)(dispatch)
  })

  it('should dispatch an action before attempting to create the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(BillFormCreators.createBillAttempt())
  })

  it('should dispatch an action after failing to create the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(BillFormCreators.createBillFailure('u goto jail mutha fucker'))
  })
})

describe('When successfully getting bills from firebase', () => {
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
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.getBillsAttempt())
  })

  it('should dispatch an action after successfully getting the bills', () => {
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.getBillsSuccess([{ name: 'oh sheeeet'}]))
  })
})

describe('When failing to get bills from firebase', () => {
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
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.getBillsAttempt())
  })

  it('should dispatch an action after failing to get the bills', () => {
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.getBillsFailure('wtf why dis fail?'))
  })
})

describe('When successfully updating a bill in firebase', () => {
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
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.updateBillAttempt())
  })

  it('should dispatch an action after successfully updating the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.updateBillSuccess())
  })
})

describe('When failing to update a bill in firebase', () => {
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
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.updateBillAttempt())
  })

  it('should dispatch an action after successfully updating the bill', () => {
    expect(dispatch).toHaveBeenCalledWith(LatestBillsCreators.updateBillFailure('interweb izzues', originalBill))
  })
})

