import React from 'react';
import { shallow } from 'enzyme';
import { BillTitle } from '../../Common';

describe('When displaying the bill title', () => {
  let BillTitleComponent

  beforeAll(() => {
    BillTitleComponent = shallow(<BillTitle title="this bill sucks :(" />)
  })

  it('should show the full name', () => {
    expect(BillTitleComponent.find('h3.bill-title').text()).toEqual('this bill sucks :(')
  })
})