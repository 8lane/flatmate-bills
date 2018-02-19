import { Creators } from '../actions/actions'
import reducers, { INITIAL_STATE } from './reducers';

describe('When setting up flatmate reducers', () => {
  it('should have a default state', () => {
    const sut = reducers(undefined, {})
    expect(sut).toEqual(INITIAL_STATE)
  });
})

describe('When attempting to get flatmates', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.getFlatmatesAttempt())
  })

  it('should update state to show the request is being made', () => {
    expect(sut.gettingFlatmates).toBeTruthy()
  })
})

describe('After successfully getting flatmates', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.getFlatmatesSuccess([{}, {}, {}]))
  })

  it('should update state to show the request is being made', () => {
    expect(sut).toEqual({ gettingFlatmates: false, flatmates: [{}, {}, {}], error: null })
  })
})

describe('After failing to get flatmates', () => {
  let sut

  beforeAll(() => {
    sut = reducers(INITIAL_STATE, Creators.getFlatmatesFailure('oh nooos'))
  })

  it('should update state to show the request is being made', () => {
    expect(sut).toEqual({ gettingFlatmates: false, flatmates: [], error: 'oh nooos' })
  })
})