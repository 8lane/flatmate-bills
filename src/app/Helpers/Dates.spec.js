import { getDaysBetweenDates } from './Dates'

describe('When getting the amount of days between two dates', () => {
  let sut;

  beforeAll(() => {
    sut = getDaysBetweenDates('2018-03-05T12:00:00+00:00', '2018-03-09T12:00:00+00:00')
  })

  it('should display the number of days', () => {
    expect(sut).toEqual(5)
  })
})