import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Pagination />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the pageNumber', async () => {
    wrapper.setProps({ page: 0 });
    expect(wrapper.find('CurrentPage').props().page).toEqual(1);
  });

  it('should disable prev button and first button', async () => {
    wrapper.setProps({ page: 0, totalPages: 10, onChangePage: () => {} });
    expect(wrapper.find('[data-testid="prev"]').props().disabled).toEqual(true);
    expect(wrapper.find('[data-testid="first"]').props().disabled).toEqual(
      true
    );
  });

  it('should disable next button and last button', async () => {
    wrapper.setProps({ page: 9, totalPages: 10, onChangePage: () => {} });
    expect(wrapper.find('[data-testid="next"]').props().disabled).toEqual(true);
    expect(wrapper.find('[data-testid="last"]').props().disabled).toEqual(true);
  });

  it('should call onChangePage with last page index', async () => {
    const onChangePage = jest.fn();
    wrapper.setProps({ page: 0, totalPages: 10, onChangePage });
    wrapper.find('[data-testid="last"]').simulate('click');
    expect(onChangePage).toHaveBeenCalledWith(9);
  });

  it('should call onChangePage with first page index', async () => {
    const onChangePage = jest.fn();
    wrapper.setProps({ page: 9, totalPages: 10, onChangePage });
    wrapper.find('[data-testid="first"]').simulate('click');
    expect(onChangePage).toHaveBeenCalledWith(0);
  });

  it('should call onChangePage with next page index', async () => {
    const onChangePage = jest.fn();
    wrapper.setProps({ page: 5, totalPages: 10, onChangePage });
    wrapper.find('[data-testid="next"]').simulate('click');
    expect(onChangePage).toHaveBeenCalledWith(6);
  });

  it('should call onChangePage with prev page index', async () => {
    const onChangePage = jest.fn();
    wrapper.setProps({ page: 9, totalPages: 10, onChangePage });
    wrapper.find('[data-testid="prev"]').simulate('click');
    expect(onChangePage).toHaveBeenCalledWith(8);
  });

  it('should render 4 prev page number buttons', async () => {
    wrapper.setProps({ page: 15, totalPages: 25, onChangePage: () => {} });
    expect(wrapper.find('[data-testid="prev-14"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="prev-13"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="prev-12"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="prev-11"]').exists()).toBeTruthy();
  });

  it('should render 4 next page number buttons', async () => {
    wrapper.setProps({ page: 15, totalPages: 25, onChangePage: () => {} });
    expect(wrapper.find('[data-testid="next-16"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="next-17"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="next-18"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="next-19"]').exists()).toBeTruthy();
  });
});
