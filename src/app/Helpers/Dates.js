export const getDaysBetweenDates = (from, to, format = 'DD/MM/YY') => {
  return moment(to, format).diff(moment(from, format), 'days') + 1
} 