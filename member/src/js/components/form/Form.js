import React from 'react';
import {
  TextField,
  DateField,
  ImageField,
  Field,
  SelectField,
  TagField,
  ChipArea,
} from './fields';
import Validator from './Validator';

const FIELDTYPES = [
  Field.name,
  ImageField.name,
  DateField.name,
  TextField.name,
  SelectField.name,
  TagField.name,
  ChipArea.name,
];

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fields = {};
    this.recursiveMap(props.children, this.findField);
    this.state = this.createInitState(props.initValues);
    this.dirty = false;
  }

  findField = (child) => {
    if (FIELDTYPES.indexOf(child.type.name) > -1) {
      const { id } = child.props;
      if (!id) throw new Error('All form fields must specify id prop.');
      this.fields[id] = child;
    }
  };

  recursiveMap = (children, fn) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: this.recursiveMap(child.props.children, fn),
        });
      }

      return fn(child);
    });
  };

  createInitState = (initValues) => {
    let state = {};
    Object.keys(this.fields).forEach((id) => {
      const field = this.fields[id];
      state[id] = {
        value: field.type.getInitValue(),
        error: null,
      };
    });
    if (initValues) {
      Object.keys(this.fields).forEach((id) => {
        if (initValues[id]) {
          state[id] = {
            value: initValues[id],
            error: null,
          };
        }
      });
    }
    return state;
  };

  onFieldChange = async (id, value) => {
    const fieldProps = Object.assign({}, this.state[id], {
      value: value,
    });
    await this.setState({ [id]: fieldProps });
    if (this.dirty) this.validateFormFields();
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.dirty = true;
    const hasError = this.validateFormFields();
    if (!hasError) {
      const values = this.createSubmitValues();
      await this.props.onSubmit(values);
      this.setState(this.createInitState());
    }
  };

  createSubmitValues = () => {
    const values = {};
    Object.keys(this.fields).forEach((id) => {
      const field = this.fields[id];
      const fieldValue = this.state[id].value;
      switch (field.props.type) {
        case 'image':
          if (fieldValue instanceof File) values[id] = fieldValue;
          break;
        default:
          values[id] = fieldValue;
      }
    });
    return values;
  };

  validateFormFields = () => {
    let hasError = false;
    Object.keys(this.fields).forEach((id) => {
      const field = this.fields[id];
      const fieldValue = this.state[id].value;
      const error = Validator.validate(field, fieldValue);
      if (error) hasError = true;
      const newState = Object.assign({}, this.state[id], {
        error: error,
      });
      this.setState({ [id]: newState });
    });
    return hasError;
  };

  injectFieldProps = (child) => {
    const { id } = child.props;
    if (!id || !this.fields[id]) return child;
    else
      return React.cloneElement(child, {
        ...this.state[id],
        onChange: this.onFieldChange,
      });
  };

  render() {
    const fieldsWithProps = this.recursiveMap(
      this.props.children,
      this.injectFieldProps
    );
    return (
      <form
        noValidate
        className={this.props.className}
        onSubmit={this.onSubmit}
      >
        {fieldsWithProps}
      </form>
    );
  }
}
