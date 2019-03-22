import React from 'react';
import { Field } from './Field';
import { ImageField } from './ImageField';
import Validator from './Validator';

const FIELDTYPES = [Field.name, ImageField.name];

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createInitState(props.children, props.initValues);
    this.dirty = false;
  }

  createInitState = (children, initValues) => {
    let state = {};
    children.forEach((child) => {
      if (FIELDTYPES.indexOf(child.type.name) > -1) {
        const { id, type, required } = child.props;
        state[id] = {
          value: '',
          type: type,
          required: required,
          error: null,
        };
      }
    });
    if (initValues) {
      Object.keys(initValues).forEach((id) => {
        if (state[id] && initValues[id])
          state[id].value = String(initValues[id]);
      });
    }
    return state;
  };

  onFieldChange = async (id, value) => {
    const fieldProps = Object.assign({}, this.state[id], {
      value: value,
    });
    await this.setState({ [id]: fieldProps });
    if (this.dirty) this.validateFormFields(this.state);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.dirty = true;
    const hasError = this.validateFormFields(this.state);
    if (!hasError) {
      const values = {};
      Object.keys(this.state).forEach((fieldName) => {
        values[fieldName] = this.state[fieldName].value;
      });
      this.props.onSubmit(values);
    }
  };

  validateFormFields = (state) => {
    let hasError = false;
    Object.keys(state).forEach((fieldName) => {
      const fieldProps = state[fieldName];
      const error = Validator.validate(fieldProps);
      if (error) hasError = true;
      const newProps = Object.assign({}, fieldProps, {
        error: error,
      });
      this.setState({ [fieldName]: newProps });
    });
    return hasError;
  };

  render() {
    const fields = React.Children.map(this.props.children, (child) => {
      const fieldProps = {
        ...this.state[child.props.id],
        onChange: this.onFieldChange,
      };
      return React.cloneElement(child, { ...fieldProps });
    });
    return (
      <form
        noValidate
        className={this.props.className}
        onSubmit={this.onSubmit}
      >
        {fields}
      </form>
    );
  }
}
