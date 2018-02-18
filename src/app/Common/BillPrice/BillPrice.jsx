import React from 'react'
import { round } from '../../helpers/Prices'

const BillPrice = ({ currentBalance, totalCost, className }) => {
  return (
    <span className={`bill-price ${className}`}>
      £{round(currentBalance)} / £{round(totalCost)}
    </span>
  )
}

BillPrice.defaultProps = {
  className: '',
}

export default BillPrice