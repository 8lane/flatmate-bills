import firebase from 'firebase'
import getBills from './getBills';

import { Creators } from '../../LatestBills/actions/actions';

jest.mock('firebase', () => ({
  database: () => ({
    ref: () => ({
      once: () => Promise.resolve({ val: jest.fn(() => [{ name: 'oh sheeeet'}]) })
    })
  })
}))

describe('When successfully getting bills from firebase', () => {
  let sut
  let dispatch = jest.fn()

  beforeAll(() => {
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
