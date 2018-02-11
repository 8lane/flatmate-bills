import React from 'react'

import { BillPrice } from '../../components'

const BillSegmentPrice = ({ price, isPaid }) =>
  isPaid ?
    <span className="bill-segment__price bill-segment__price--success" uk-icon="icon: check; ratio: 1.2" />
  :
    <BillPrice className="bill-segment__price" total={price} />

export default BillSegmentPrice