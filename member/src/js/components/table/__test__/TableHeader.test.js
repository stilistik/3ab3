import React from 'react';
import { shallow } from 'enzyme';
import {
  TableHeader,
  SortingIcon,
  DefaultHeaderCell,
  SortableHeaderCell,
  HeaderCell,
} from '../TableHeader';

let columns = [
  {
    title: 'File',
    dataIndex: 'name',
    key: 'name',
    width: '50%',
  },
  {
    title: 'Patient',
    dataIndex: 'patient',
    key: 'patient',
    width: '50%',
  },
];

describe('[CO_1001] [UN_1001_0001] Table header', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<TableHeader />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should create a header cell for each column', async () => {
    wrapper.setProps({ columns });
    expect(wrapper.find('HeaderCell')).toHaveLength(columns.length);
  });
});

describe('[CO_1001] [UN_1001_0002] Table header cell', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<HeaderCell />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render a default header cell', async () => {
    expect(wrapper.find('DefaultHeaderCell').exists()).toBeTruthy();
  });

  it('should render a sortable header cell', async () => {
    wrapper.setProps({ column: { sorter: { id: 'test_sorter' } } });
    expect(wrapper.find('SortableHeaderCell').exists()).toBeTruthy();
  });

  it('should correctly apply column width', async () => {
    const test_width = 'test_width';
    wrapper.setProps({ column: { width: test_width } });
    expect(wrapper.find('DefaultHeaderCell').props().style.width).toEqual(
      test_width
    );
  });

  it('should make cell grow to fill space if width not specified', async () => {
    const test_width = null;
    wrapper.setProps({ column: { width: test_width } });
    expect(wrapper.find('DefaultHeaderCell').props().style).toEqual({
      flexGrow: 10,
      flexBasis: 100,
    });
  });
});

describe('[CO_1001] [UN_1001_0002] Sortable table header cell', () => {
  let wrapper;

  let column = {
    sorter: jest.fn(),
    dataIndex: 'same_index',
  };

  beforeAll(() => {
    wrapper = shallow(<SortableHeaderCell />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should not break on click without props', async () => {
    wrapper.simulate('click');
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render a sorting icon', async () => {
    expect(wrapper.find('SortingIcon').exists()).toBeTruthy();
  });

  it('should render the column title', async () => {
    wrapper.setProps({ column: { title: 'test_title' } });
    expect(wrapper.find('span').text()).toEqual('test_title');
  });

  it('should call with ASC order when there is no previous sorter', async () => {
    const setSorter = jest.fn();
    wrapper.setProps({ column, setSorter });
    wrapper.simulate('click');
    expect(setSorter).toHaveBeenCalledWith({
      sort: column.sorter,
      order: 'ASC',
      dataIndex: column.dataIndex,
    });
  });

  it('should call with ASC order if other column was sorted before', async () => {
    const setSorter = jest.fn();
    wrapper.setProps({
      column,
      setSorter,
      sorter: { dataIndex: 'other_index' },
    });
    wrapper.simulate('click');
    expect(setSorter).toHaveBeenCalledWith({
      sort: column.sorter,
      order: 'ASC',
      dataIndex: column.dataIndex,
    });
  });

  it('should call with DESC order if ASC order was selected before', async () => {
    const setSorter = jest.fn();
    wrapper.setProps({
      column,
      setSorter,
      sorter: { dataIndex: 'same_index', order: 'ASC' },
    });
    wrapper.simulate('click');
    expect(setSorter).toHaveBeenCalledWith({
      sort: column.sorter,
      order: 'DESC',
      dataIndex: column.dataIndex,
    });
  });

  it('should call with NONE order if DESC order was selected before', async () => {
    const setSorter = jest.fn();
    wrapper.setProps({
      column,
      setSorter,
      sorter: { dataIndex: 'same_index', order: 'DESC' },
    });
    wrapper.simulate('click');
    expect(setSorter).toHaveBeenCalledWith({
      sort: column.sorter,
      order: 'NONE',
      dataIndex: column.dataIndex,
    });
  });
});

describe('[CO_1001] [UN_1001_0002] Non-sortable table header cell', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<DefaultHeaderCell />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the column title', async () => {
    wrapper.setProps({ column: { title: 'test_title' } });
    expect(wrapper.text()).toEqual('test_title');
  });
});

describe('[CO_1001] [UN_1001_0003] Table header cell sorting icon', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<SortingIcon />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render a "remove" icon if there is no sorter', async () => {
    expect(wrapper.find('Icon').props().type).toEqual('remove');
  });

  it('should render a "remove" icon if current sorter is no from this column', async () => {
    wrapper.setProps({
      sorter: { dataIndex: 'test_index' },
      column: { dataIndex: 'other_index' },
    });
    expect(wrapper.find('Icon').props().type).toEqual('remove');
  });

  it('should render a "remove" icon if the sort order is NONE', async () => {
    wrapper.setProps({
      sorter: { dataIndex: 'same_index', order: 'NONE' },
      column: { dataIndex: 'same_index' },
    });
    expect(wrapper.find('Icon').props().type).toEqual('remove');
  });

  it('should render an up icon if the sort order is ASC', async () => {
    wrapper.setProps({
      sorter: { dataIndex: 'same_index', order: 'ASC' },
      column: { dataIndex: 'same_index' },
    });
    expect(wrapper.find('Icon').props().type).toEqual('up');
  });

  it('should render a down icon if the sort order is DESC', async () => {
    wrapper.setProps({
      sorter: { dataIndex: 'same_index', order: 'DESC' },
      column: { dataIndex: 'same_index' },
    });
    expect(wrapper.find('Icon').props().type).toEqual('down');
  });
});
