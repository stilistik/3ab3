import React from 'react';
import { shallow } from 'enzyme';
import { DragSelect } from '../DragSelect';

describe('[CO_1000] [UN_1000_0006] Drag selection', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<DragSelect />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should not render anything without select prop', async () => {
    expect(wrapper.html()).toBeNull();
  });

  it('should have the correct translation, width and height', async () => {
    wrapper.setProps({ select: { x: 123, y: 234, width: 10, height: 20 } });
    const style = wrapper.props().style;
    expect(style.transform).toEqual('translate3d(123px, 234px, 0px)');
    expect(style.width).toEqual('10px');
    expect(style.height).toEqual('20px');
  });
});
