export const getDaysBetweenDates = (from, to) => {
  return moment(to).diff(moment(from), 'days') + 1
}