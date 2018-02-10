import React from 'react'

import { BillPrice, Name } from '../components'

const BillSegment = ({ firstName, lastName, segment, price, onToggleSegmentPaid }) => {

  return (
    <li
      style={{ textDecoration: segment.isPaid ? 'line-through' : 'none' }}
    >
      <a href="#" onClick={onToggleSegmentPaid}>
        <Name firstName={firstName} lastName={lastName} />
        &nbsp;
        <BillPrice total={segment.price} />
        &nbsp;
        <span>
          {segment.isPaid ? '×' : '✓'}
        </span>
      </a>
    </li>
  )
}

export default BillSegment