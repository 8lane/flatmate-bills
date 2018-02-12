import React from 'react'

import { BillSegmentPrice, Name } from '../../Common'

const BillSegment = ({ firstName, lastName, segment, price, onToggleSegmentPaid }) => {

  return (
    <li
      className="bill-segment"
      style={{ textDecoration: segment.isPaid ? 'line-through' : 'none' }}
    >
      <a className="bill-segment__link" href="#" onClick={onToggleSegmentPaid}>
        <BillSegmentPrice price={segment.price} isPaid={segment.isPaid} />
        <Name className="bill-segment__name" firstName={firstName} lastName={lastName} />
      </a>
    </li>
  )
}

export default BillSegment