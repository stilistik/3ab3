import React from 'react';
import { shallow } from 'enzyme';
import { Table } from '../Table';

describe('[CO_1001] [UN_1001_0000] Table', () => {
  let wrapper;

  let sorters = [
    {
      sort: (a, b) => {
        if (a.name === b.name) return 0;
        if (a.name < b.name) return -1;
        else return 1;
      },
      order: 'ASC',
      result: [
        { name: 'Alice', age: 5 },
        { name: 'Bob', age: 6 },
        { name: 'Charly', age: 7 },
      ],
      dataIndex: 'name',
    },
    {
      sort: (a, b) => a.age - b.age,
      order: 'DESC',
      result: [
        { name: 'Charly', age: 7 },
        { name: 'Bob', age: 6 },
        { name: 'Alice', age: 5 },
      ],
      dataIndex: 'age',
    },
  ];

  let data = [
    { name: 'Bob', age: 6 },
    { name: 'Charly', age: 7 },
    { name: 'Alice', age: 5 },
  ];

  beforeAll(() => {
    wrapper = shallow(<Table />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should not render pagination element by default', async () => {
    expect(wrapper.find('Pagination').exists()).toBeFalsy();
  });

  it('should pass the unsorted data to the table body', async () => {
    wrapper.setProps({ data });
    const body = wrapper.find('TableBody');
    expect(body.props().data).toEqual(data);
  });

  it('should be able to set a sorter', async () => {
    wrapper.instance().setSorter(sorters[0]);
    wrapper.instance().setState({ sorter: sorters[0] });
    expect(wrapper.find('TableHeader').props().sorter).toEqual(sorters[0]);
  });

  it('should sort data according to the specified sorter', async () => {
    wrapper.instance().setSorter(sorters[0]);
    expect(wrapper.find('TableBody').props().data).toEqual(sorters[0].result);
    wrapper.instance().setSorter(sorters[1]);
    expect(wrapper.find('TableBody').props().data).toEqual(sorters[1].result);
  });

  it('should render the pagination element when pagination is enabled', async () => {
    wrapper.setProps({ pagination: { totalPages: 10 } });
    expect(wrapper.find('Pagination').exists()).toBeTruthy();
  });
});
