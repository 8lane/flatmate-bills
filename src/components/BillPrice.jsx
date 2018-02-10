import React from 'react'

import { round } from '../helpers/Prices'

const BillPrice = ({ total }) => {
  return <span className="bill-price">£{round(total)}</span>
}

export default BillPrice