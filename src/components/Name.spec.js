import React from 'react';
import { shallow } from 'enzyme';
import { Name } from '../components';

describe('When displaying a flatmate name', () => {
  let NameComponent

  beforeAll(() => {
    NameComponent = shallow(<Name firstName="Tom" lastName="Christian" />)
  })

  it('should show the full name', () => {
    expect(NameComponent.find('strong.name').text()).toEqual('Tom Christian')
  })
})