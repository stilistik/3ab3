import React from 'react';
import { mount } from 'enzyme';
import { TextField, TextInput } from '../fields/TextField';
import { FormContext } from '../Form';

const formContext = {
  setFieldValue: jest.fn(),
  registerField: jest.fn(),
  unregisterField: jest.fn(),
  requestSubmit: jest.fn(),
  noHelp: false,
};

const fieldProps = {
  id: 'field_id',
  type: 'email',
};

describe('TextField', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <FormContext.Provider value={formContext}>
        <TextField />
      </FormContext.Provider>
    );
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should pass the correct props to the input', async () => {
    wrapper = mount(
      <FormContext.Provider value={formContext}>
        <TextField {...fieldProps} />
      </FormContext.Provider>
    );
    const inputProps = wrapper.find('TextInput').props();
    expect(inputProps.fieldType).toEqual('text');
    expect(inputProps.type).toEqual('email');
    expect(inputProps.id).toEqual('field_id');
    expect(inputProps.defaultValue).toEqual('');
    expect(inputProps.value).toEqual('');
    expect(inputProps.onChange).toBeTruthy();
    expect(inputProps.requestSubmit).toBeTruthy();
  });
});

describe('TextInput', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<TextInput />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should call props onChange with new value', async () => {
    const onChange = jest.fn();
    wrapper.setProps({ onChange });
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('should call props handleKeyDown method', async () => {
    const handleKeyDown = jest.fn();
    wrapper.setProps({ handleKeyDown });
    wrapper.find('input').simulate('keydown');
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('should call props handleBlur method', async () => {
    const handleBlur = jest.fn();
    wrapper.setProps({ handleBlur });
    wrapper.find('input').simulate('blur');
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should pass type prop to input element', async () => {
    wrapper.setProps({ type: 'email' });
    const props = wrapper.find('input').props();
    expect(props.type).toEqual('email');
  });
});
