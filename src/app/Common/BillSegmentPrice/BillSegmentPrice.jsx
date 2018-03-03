import React from 'react'

import { round } from '../../Helpers/Prices'

const BillSegmentPrice = ({ price, isPaid }) =>
  isPaid ?
    <span className="bill-segment__price bill-segment__price--success">
      <svg className="bill-segment__icon" width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#FFF" strokeWidth="1.1" points="4,10 8,15 17,4"></polyline></svg>
    </span>
  :
    <span className="bill-segment__price">£{round(price)}</span>

export default BillSegmentPrice