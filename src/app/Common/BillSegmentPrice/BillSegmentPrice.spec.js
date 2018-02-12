import React from 'react';
import { shallow } from 'enzyme';
import { BillSegmentPrice, BillPrice } from '../../Common';

describe('When displaying the price to pay per contributor', () => {
  let BillSegmentPriceComponent

  beforeAll(() => {
    BillSegmentPriceComponent = shallow(
      <BillSegmentPrice isPaid={false} />
    )
  })

  describe('and it has not yet been paid', () => {
    it('should display the price', () => {
      expect(BillSegmentPriceComponent.find(BillPrice).exists()).toBeTruthy()
    })
  })

  describe('and it has been paid', () => {
    beforeAll(() => {
      BillSegmentPriceComponent.setProps({ isPaid: true })
    })

    it('should display a tick icon', () => {
      expect(BillSegmentPriceComponent.find('span.bill-segment__price.bill-segment__price--success').exists()).toBeTruthy()
    })
  })
})