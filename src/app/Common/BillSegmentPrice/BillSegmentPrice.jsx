import React from 'react'

import { round } from '../../helpers/Prices'

const BillSegmentPrice = ({ price, isPaid }) =>
  isPaid ?
    <span className="bill-segment__price bill-segment__price--success" uk-icon="icon: check; ratio: 1.2" />
  :
    <span className="bill-segment__price">£{round(price)}</span>

export default BillSegmentPrice