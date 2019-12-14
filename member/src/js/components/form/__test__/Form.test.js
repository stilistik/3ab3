import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../Form';

const getFieldProps = () => {
  return {
    id: 'field_id',
    someProp: 'someFieldProp',
    fieldType: 'text',
    required: true,
    setValue: jest.fn(),
    setOpts: jest.fn(),
    setError: jest.fn(),
    defaultValue: 'defaultValue',
  };
};

describe('Form', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Form />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should register the field with the form and set field defaultValue', async () => {
    const fieldProps = getFieldProps();
    wrapper.instance().registerField('field_id', fieldProps);
    expect(wrapper.instance().fields['field_id']).toEqual(fieldProps);
    expect(fieldProps.setValue).toHaveBeenCalledWith(fieldProps.defaultValue);
  });

  it('should call onFieldChange props method with fields defaultValue', async () => {
    const onFieldChange = jest.fn();
    const fieldProps = getFieldProps();
    wrapper.setProps({ onFieldChange, updateWithDefault: true });
    wrapper.instance().registerField('field_id', fieldProps);
    expect(onFieldChange).toHaveBeenCalledWith(
      fieldProps.id,
      fieldProps.defaultValue
    );
  });

  it('should NOT call onFieldChange props method with fields defaultValue', async () => {
    wrapper.setProps({ onFieldChange, updateWithDefault: false });
    const fieldProps = getFieldProps();
    const onFieldChange = jest.fn();
    wrapper.instance().registerField('field_id', fieldProps);
    expect(onFieldChange).not.toHaveBeenCalled();
  });

  it('should register the field with the form and set its initValue', async () => {
    wrapper.setProps({ initValues: { field_id: 'initValue' } });
    const fieldProps = getFieldProps();
    wrapper.instance().registerField('field_id', fieldProps);
    expect(wrapper.instance().fields['field_id']).toEqual(fieldProps);
    expect(fieldProps.setValue).toHaveBeenCalledWith('initValue');
  });

  it('should not call onFieldChange props method with initValues', async () => {
    const onFieldChange = jest.fn();
    const fieldProps = getFieldProps();
    wrapper.setProps({ initValues: { field_id: 'initValue' }, onFieldChange });
    wrapper.instance().registerField('field_id', fieldProps);
    expect(onFieldChange).not.toHaveBeenCalled();
  });

  it('should call onValidChange props method when form valid state changes', async () => {
    const onValidChange = jest.fn();
    const fieldProps = getFieldProps();
    wrapper.setProps({ initValues: { field_id: 'initValue' }, onValidChange });
    wrapper.instance().registerField('field_id', fieldProps);
    expect(onValidChange).toHaveBeenCalledWith(true);
  });

  it('should validate form fields on submit and set errors', async () => {
    wrapper.setProps({ initValues: {} });
    const fieldProps = { ...getFieldProps(), defaultValue: '' };
    wrapper.instance().registerField('field_id', fieldProps);
    wrapper.instance().requestSubmit();
    expect(fieldProps.setError).toHaveBeenCalledWith({
      message: 'Please fill out this field.',
    });
  });
});
