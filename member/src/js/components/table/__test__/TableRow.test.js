import React from 'react';
import { shallow } from 'enzyme';
import { TableRow } from '../TableRow';

describe('[CO_1001] [UN_1001_0005] Table row', () => {
  let wrapper;

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

  beforeAll(() => {
    wrapper = shallow(<TableRow />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should create a cell for each column', async () => {
    wrapper.setProps({ columns });
    expect(wrapper.find('TableCell')).toHaveLength(columns.length);
  });

  it('should call onRow prop method with entry', async () => {
    const onRow = jest.fn();
    const entry = { id: 'test_entry' };
    wrapper.setProps({ onRow, entry });
    expect(onRow).toHaveBeenCalledWith(entry);
  });

  it('should correctly concatenate classes from onRow', async () => {
    const onRow = jest.fn().mockReturnValue({ className: '.test_class' });
    wrapper.setProps({ onRow });
    expect(wrapper.props().className).toContain('row');
    expect(wrapper.props().className).toContain('test_class');
  });

  it('should add props returned by onRow', async () => {
    const onClick = jest.fn();
    const onRow = jest.fn().mockReturnValue({ onClick });
    wrapper.setProps({ onRow });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
