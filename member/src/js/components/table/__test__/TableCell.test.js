import React from 'react';
import { shallow } from 'enzyme';
import { TableCell } from '../TableCell';

describe('[CO_1001] [UN_1001_0006] Table cell', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<TableCell />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should apply the column width to the style of the cell', async () => {
    wrapper.setProps({ col: { width: 'test_width' } });
    expect(wrapper.props().style.width).toEqual('test_width');
  });

  it('should make the cell grow if width is not specified', async () => {
    wrapper.setProps({ col: { width: null } });
    expect(wrapper.props().style).toEqual({
      flexGrow: 10,
      flexBasis: 100,
    });
  });

  it('should render its value', async () => {
    wrapper.setProps({ value: 'test_value' });
    expect(wrapper.find('.cell').text()).toEqual('test_value');
  });

  it('should use the render function of the column', async () => {
    wrapper.setProps({
      value: 'test_',
      col: { render: (value) => value + 'abcde' },
    });
    expect(wrapper.find('.cell').text()).toEqual('test_abcde');
  });
});
