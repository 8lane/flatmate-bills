import React from 'react';
import { shallow } from 'enzyme';
import { BillSegment, BillSegmentPrice, Name } from '../../components';

describe('When displaying a bill contributor', () => {
  let BillSegmentComponent
  let onToggleSegmentPaid

  beforeAll(() => {
    onToggleSegmentPaid = jest.fn()

    BillSegmentComponent = shallow(
      <BillSegment
        firstName="Tom"
        lastName="Christian"
        segment={{ isPaid: false }}
        price={9000}
        onToggleSegmentPaid={onToggleSegmentPaid}
      />
    )
  })

  it('should display', () => {
    expect(BillSegmentComponent.find('li.bill-segment').exists()).toBeTruthy()
  })

  it('should show the contributor name', () => {
    expect(BillSegmentComponent.find(Name).exists()).toBeTruthy()
  })

  it('should show the contributors price to pay (death?)', () => {
    expect(BillSegmentComponent.find(BillSegmentPrice).exists()).toBeTruthy()
  })

  describe('and clicking the link', () => {
    beforeAll(() => {
      BillSegmentComponent.find('.bill-segment__link').simulate('click')
    })

    it('should toggle paid', () => {
      expect(onToggleSegmentPaid).toHaveBeenCalled()
    })
  })

  describe('that has already been paid', () => {
    beforeAll(() => {
      BillSegmentComponent.setProps({ segment: { isPaid: true } })
      BillSegmentComponent.update()
    })

    it('should have a strike through on the text', () => {
      expect(BillSegmentComponent.get(0).props.style.textDecoration).toEqual('line-through')
    })
  })
})