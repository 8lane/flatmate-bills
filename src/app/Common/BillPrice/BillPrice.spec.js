import React from 'react';
import { shallow } from 'enzyme';
import { BillPrice } from '../../Common';

describe('When displaying the bill price', () => {
  let BillPriceComponent

  beforeAll(() => {
    BillPriceComponent = shallow(<BillPrice total={28.3337} />)
  })

  it('should show the rounded price and currency', () => {
    expect(BillPriceComponent.find('span.bill-price').text()).toEqual('£28.33')
  })
})