import React from 'react';
import { shallow } from 'enzyme';
import { DeleteBtn } from '../../components';

describe('When displaying a delete button', () => {
  let DeleteBtnComponent
  let onDelete

  beforeAll(() => {
    onDelete = jest.fn()
    DeleteBtnComponent = shallow(<DeleteBtn onDelete={onDelete} />)
  })

  it('should display', () => {
    expect(DeleteBtnComponent.find('button.delete-btn').exists()).toBeTruthy()
  })

  it('should have a button type', () => {
    expect(DeleteBtnComponent.find('button.delete-btn').props().type).toEqual('button')
  })

  it('should have an icon', () => {
    expect(DeleteBtnComponent.find('button.delete-btn').text()).toEqual('×')
  })

  it('should delete when clicked', () => {
    DeleteBtnComponent.find('button.delete-btn').simulate('click')
    expect(onDelete).toHaveBeenCalled()
  })
})