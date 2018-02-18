import React from 'react';
import { shallow } from 'enzyme';
import { BillDate } from '../../Common';

describe('When displaying the bill date', () => {
  let BillDateComponent

  beforeAll(() => {
    BillDateComponent = shallow(
      <BillDate dateFrom="2018-03-05T12:00:00+00:00" dateTo="2018-05-12T12:00:00+00:00" />
    )
  })

  it('should display', () => {
    expect(BillDateComponent.find('span.bill-date').exists()).toBeTruthy()
  })

  it('should have the correct format', () => {
    expect(BillDateComponent.find('span.bill-date').text()).toEqual('05 Mar–12 May')
  })
})