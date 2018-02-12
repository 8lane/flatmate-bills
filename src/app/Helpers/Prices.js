export const round = number => Math.round(number * 100) / 100

export const calculatePricePerDay = ({ price, segments, numberOfSplitSegments }, numberOfDays) => {
  return (price / numberOfDays) / (segments.length - numberOfSplitSegments)
}