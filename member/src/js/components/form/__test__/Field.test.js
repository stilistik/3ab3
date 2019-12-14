import React from 'react';
import { shallow, mount } from 'enzyme';
import { Field } from '../fields/Field';
import { FormContext } from '../Form';

describe('Unwrapped Field', () => {
  it('should throw an error if used outside form context', async () => {
    expect(() => shallow(<Field />)).toThrowError();
  });
});

const formContext = {
  setFieldValue: jest.fn(),
  registerField: jest.fn(),
  unregisterField: jest.fn(),
  requestSubmit: jest.fn(),
  noHelp: false,
};

const fieldProps = {
  id: 'field_id',
  fieldType: 'text',
};

const DummyInput = ({ id, value, onChange }) => (
  <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
);

describe('Field', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <FormContext.Provider value={formContext}>
        <Field>
          <DummyInput />
        </Field>
      </FormContext.Provider>
    );
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should register the field on mount', async () => {
    wrapper = mount(
      <FormContext.Provider value={formContext}>
        <Field {...fieldProps}>
          <DummyInput />
        </Field>
      </FormContext.Provider>
    );
    expect(formContext.registerField).toHaveBeenCalled();
  });

  it('should work call setFieldValue on the form context', async () => {
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });
    expect(formContext.setFieldValue).toHaveBeenCalledWith(
      fieldProps.id,
      'hello'
    );
  });

  it('should display the form helper text', async () => {
    expect(wrapper.find('ForwardRef(FormHelperText)').exists()).toBeTruthy();
  });

  it('should not display the form helper text', async () => {
    formContext.noHelp = true;
    wrapper = mount(
      <FormContext.Provider value={formContext}>
        <Field {...fieldProps}>
          <DummyInput />
        </Field>
      </FormContext.Provider>
    );
    expect(wrapper.find('ForwardRef(FormHelperText)').exists()).toBeFalsy();
  });
});
