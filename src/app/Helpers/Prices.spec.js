import { round, calculatePricePerDay, calculatePricePerPerson } from './Prices'

describe('When calculating the price per day for a bill', () => {
  let sut;

  beforeAll(() => {
    const price = 110;
    const numberOfDays = 11;

    sut = calculatePricePerDay(price, numberOfDays)
  })

  it('should return the price', () => {
    expect(sut).toEqual(10)
  })
})

describe('When calculating the price per person for a bill', () => {
  let sut;

  beforeAll(() => {
    const pricePerDay = 10;
    const totalFlatmates = 3;
    const totalSplits = 0;

    sut = calculatePricePerPerson(pricePerDay, totalFlatmates, totalSplits)
  })

  it('should return the price', () => {
    expect(sut).toEqual(3.3333333333333335)
  })
})