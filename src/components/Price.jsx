import React from 'react'

import { round } from '../helpers/Prices'

const Price = ({ total }) => {
  return <span>£{round(total)}</span>
}

export default Price