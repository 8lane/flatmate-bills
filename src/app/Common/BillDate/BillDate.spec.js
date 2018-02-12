import React from 'react';
import { shallow } from 'enzyme';
import { BillDate } from '../../Common';

describe('When displaying the bill date', () => {
  let BillDateComponent

  beforeAll(() => {
    BillDateComponent = shallow(
      <BillDate dateFrom="21/01/18" dateTo="22/03/18" />
    )
  })

  it('should display', () => {
    expect(BillDateComponent.find('span.bill-date').exists()).toBeTruthy()
  })

  it('should have the correct format', () => {
    expect(BillDateComponent.find('span.bill-date').text()).toEqual('21 Jan–22 Mar')
  })
})