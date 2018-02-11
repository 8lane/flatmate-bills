import React from 'react'

const BillDate = ({ className, dateFrom, dateTo, format }) => {
  return (
    <span className={`bill-date uk-h4 uk-margin-remove-bottom ${className}`}>
      <span className="bill-date__from">{moment(dateFrom, 'DD/MM/YY').format(format)}</span>
      &ndash;
      <span className="bill-date__to">{moment(dateTo, 'DD/MM/YY').format(format)}</span>
    </span>
  )
}

BillDate.defaultProps = {
  format: 'DD MMM'
}

export default BillDate