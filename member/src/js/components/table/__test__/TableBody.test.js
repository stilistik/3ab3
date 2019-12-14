import React from 'react';
import { shallow } from 'enzyme';
import { TableBody } from '../TableBody';

describe('[CO_1001] [UN_1001_0004] Table body', () => {
  let wrapper;

  let data = [
    { key: 'a', name: 'Bob', age: 6 },
    { key: 'b', name: 'Charly', age: 7 },
    { key: 'c', name: 'Alice', age: 5 },
  ];

  beforeAll(() => {
    wrapper = shallow(<TableBody />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should display a loading indicator', async () => {
    wrapper.setProps({ fetching: true });
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('should create a table row per data item', async () => {
    wrapper.setProps({ data, fetching: false });
    expect(wrapper.find('TableRow')).toHaveLength(data.length);
  });
});
