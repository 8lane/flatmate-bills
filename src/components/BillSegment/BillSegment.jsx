import React from 'react'

import { BillPrice, Name } from '../../components'

const BillSegment = ({ firstName, lastName, segment, price, onToggleSegmentPaid }) => {

  return (
    <li
      className="bill-segment"
      style={{ textDecoration: segment.isPaid ? 'line-through' : 'none' }}
    >
      <a className="bill-segment__link" href="#" onClick={onToggleSegmentPaid}>
        {segment.isPaid ?
          <span className="bill-segment__price bill-segment__price--success" uk-icon="icon: check; ratio: 1.2" />
        :
          <BillPrice className="bill-segment__price" total={segment.price} />
        }

        <Name className="bill-segment__name" firstName={firstName} lastName={lastName} />
      </a>
    </li>
  )
}

export default BillSegment