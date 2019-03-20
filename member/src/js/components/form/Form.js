import React from 'react';
import { Field } from './Field';
import Validator from './Validator';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createInitState(props.children);
    this.dirty = false;
  }

  createInitState = (children) => {
    let state = {};
    children.forEach((child) => {
      if (child.type.name === Field.name) {
        const { id, type, required } = child.props;
        state[id] = {
          value: '',
          type: type,
          required: required,
          error: null,
        };
      }
    });
    return state;
  };

  onFieldChange = async (e) => {
    const { id, value } = e.target;
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