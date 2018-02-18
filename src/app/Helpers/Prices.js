export const round = number => Math.round(number * 100) / 100

export const calculatePricePerDay = (price, numberOfDays) => {
  return price / numberOfDays
}

export const calculatePricePerPerson = (pricePerDay, totalFlatmates, totalSplits) => {
  return pricePerDay / (totalFlatmates - totalSplits)
}
