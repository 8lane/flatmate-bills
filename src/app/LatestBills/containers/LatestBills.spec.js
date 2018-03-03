import React from 'react';
import { shallow } from 'enzyme';

import { LatestBills } from './LatestBills'

describe('When showing the latest bills', () => {
  let LatestBillsComponent

  beforeAll(() => {
    const flatmates = { 1: {}, 2: {} }

    const latestBills = [
      { id: 1, segments: [{}]},
      { id: 2, segments: [{}]},
      { id: 3, segments: [{}]}
    ]

    LatestBillsComponent = shallow(<LatestBills latestBills={latestBills} flatmates={flatmates} gettingBills={false} />)
  })

  it('should show the bills', () => {
    expect(LatestBillsComponent.find('ul.latest-bills li')).toHaveLength(3)
  })

  describe('and they are being fetched from the database', () => {
    beforeAll(() => {
      LatestBillsComponent = shallow(<LatestBills gettingBills={true} />)
    })

    it('should show a spinner', () => {
      expect(LatestBillsComponent.find('span.latest-bills__spinner').text()).toEqual('💩')
    })
  })

  describe('and no bills are available', () => {
    beforeAll(() => {
      LatestBillsComponent = shallow(<LatestBills latestBills={[]} gettingBills={false} />)
    })

    it('should show a placeholder', () => {
      expect(LatestBillsComponent.text()).toEqual('No bills added yet!')
    })
  })
})