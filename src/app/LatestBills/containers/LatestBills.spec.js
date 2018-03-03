import React from 'react';
import { shallow } from 'enzyme';

import { LatestBills } from './LatestBills'
import { BillDate } from '../../Common'

describe('When showing the latest bills', () => {
  let LatestBillsComponent

  beforeAll(() => {
    const flatmates = { 1: {}, 2: {} }

    const latestBills = [
      { id: 1, dateDue: '2016-01-22T12:00:00+00:00', segments: [{}]},
      { id: 2, dateDue: '2015-01-22T12:00:00+00:00', segments: [{}]},
      { id: 3, dateDue: '2019-01-22T12:00:00+00:00', segments: [{}]}
    ]

    LatestBillsComponent = shallow(<LatestBills latestBills={latestBills} flatmates={flatmates} gettingBills={false} />)
  })

  it('should show the bills', () => {
    expect(LatestBillsComponent.find('ul.latest-bills li')).toHaveLength(3)
  })

  it('should sort the bills by most recent date', () => {
    expect(LatestBillsComponent.find(BillDate).at(0).props().dateDue).toEqual('2019-01-22T12:00:00+00:00')
    expect(LatestBillsComponent.find(BillDate).at(1).props().dateDue).toEqual('2016-01-22T12:00:00+00:00')
    expect(LatestBillsComponent.find(BillDate).at(2).props().dateDue).toEqual('2015-01-22T12:00:00+00:00')
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
      expect(LatestBillsComponent.text()).toEqual('No bills added yet 🤔')
    })
  })
})