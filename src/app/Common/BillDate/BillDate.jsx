import React from 'react'

const BillDate = ({ className, dateDue, dateFrom, dateTo, format }) => {
  return (
    <span className={`bill-date uk-h4 uk-margin-remove-bottom ${className}`}>
      {dateFrom && dateTo ?
        <span>
          <span className="bill-date__from">
            {moment(dateFrom).format(format)}
          </span>
          &ndash;
          <span className="bill-date__to">
            {moment(dateTo).format(format)}
          </span>
        </span>
      :
        <span className="bill-date__due">
          {moment(dateDue).format(format)}
        </span>
      }
    </span>
  )
}

BillDate.defaultProps = {
  format: 'Do MMM'
}

export default BillDate