import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';
import { AppTitle } from './Common'
import { LatestBills } from './LatestBills/containers'
import { BillFormNew } from './BillFormNew/containers'

describe('When setting up the app', () => {
  let AppComponent
  let getFlatmates
  let getBills

  beforeAll(() => {
    getFlatmates = jest.fn()
    getBills = jest.fn()

    AppComponent = shallow(
      <App
        getFlatmates={getFlatmates}
        getBills={getBills}
        isEditing={false}
      />
    )
  })

  it('should load the flatmates', () => {
    expect(getFlatmates).toHaveBeenCalled()
  })

  it('should load the bills', () => {
    expect(getBills).toHaveBeenCalled()
  })

  it('should display a page title', () => {
    expect(AppComponent.find(AppTitle).exists()).toBeTruthy()
  })

  it('should display an add bill button', () => {
    expect(AppComponent.find('button.new-bill-btn').exists()).toBeTruthy()
  })

  it('should display latest bills', () => {
    expect(AppComponent.find(LatestBills).exists()).toBeTruthy()
  })

  describe('after clicking the add new bill button', () => {
    let onToggleVisibility

    beforeAll(() => {
      onToggleVisibility = jest.fn();
      AppComponent.setProps({ isEditing: true, onToggleVisibility })
      AppComponent.find('button.new-bill-btn').simulate('click')
      AppComponent.update()
    })

    it('should show the new bill form', () => {
      expect(onToggleVisibility).toHaveBeenCalled()
      expect(AppComponent.find(BillFormNew).exists()).toBeTruthy()
    })
  })
})