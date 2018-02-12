import React from 'react'

import { round } from '../../helpers/Prices'

const BillPrice = ({ total, className }) => {
  return <span className={`bill-price ${className}`}>£{round(total)}</span>
}

BillPrice.defaultProps = {
  className: ''
}

export default BillPrice