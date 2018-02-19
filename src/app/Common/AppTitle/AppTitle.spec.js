import React from 'react';
import { shallow } from 'enzyme';
import AppTitle from './AppTitle';

describe('When displaying the app title', () => {
  let AppTitleComponent

  describe('on the home page', () => {
    beforeAll(() => {
      AppTitleComponent = shallow(
        <AppTitle editMode={false} />
      )
    })

    it('should display the correct title', () => {
      expect(AppTitleComponent.text()).toEqual('🏠 25 Northways Bills')
    })
  })

  describe('on the new bill page', () => {
    beforeAll(() => {
      AppTitleComponent = shallow(
        <AppTitle editMode={true} />
      )
    })

    it('should display the correct title', () => {
      expect(AppTitleComponent.text()).toEqual('💸 Create new bill')
    })
  })
})