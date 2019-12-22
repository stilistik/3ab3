import React from 'react';
import PropTypes from 'prop-types';
import Validator from './Validator';
import { isEqual } from 'lodash';

export const FormContext = React.createContext({});
export const useFormContext = () => React.useContext(FormContext);

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fields = {};
    this.values = {};
    this.options = {};
    this.errors = {};
    this.dirty = false;
    this.valid = false;
  }

  componentDidUpdate = (prevProps) => {
    if (!isEqual(prevProps.initValues, this.props.initValues)) {
      for (let id in this.props.initValues) {
        const value = this.props.initValues[id];
        this.setFieldValue(id, value, false);
      }
    }
  };

  /**
   * Called from Field to register with this form when the field
   * did mount
   * @param {String} id: The id of the field
   * @param {Object} fieldProps: The props of the field
   */
  registerField = (id, fieldProps) => {
    this.fields[id] = fieldProps;
    this.initializeField(id);
  };

  /**
   * Called from Field to unregister from this form when the field
   * unmounts.
   * @param {String} id: The id of the field
   */
  unregisterField = (id) => delete this.fields[id];

  /**
   * Sets a field to its initial state
   * @param {String} id: the id of the field
   */
  initializeField = (id) => {
    const fieldProps = this.fields[id];
    const { initValues, initOpts, updateWithDefault } = this.props;

    if (initOpts[id]) {
      // set field init options
      this.setFieldOptions(id, initOpts[id], false);
    } else {
      // set field default options
      this.setFieldOptions(id, fieldProps.defaultOpts, false);
    }

    if (initValues[id] || !isNaN(initValues[id])) {
      // set field init value
      this.setFieldValue(id, initValues[id], false);
    } else {
      // set field default value
      this.setFieldValue(id, fieldProps.defaultValue, updateWithDefault);
    }
  };

  /**
   * Sets the form into its initial state
   */
  initializeForm = () => {
    this.dirty = false;
    for (let id in this.fields) this.initializeField(id);
  };

  /**
   * Called from Field to update its value. Will validate
   * the field if this form is dirty.
   * @param {String} id: The id of the field
   * @param {*} value: The new value of the field
   * @param {Boolean} shouldUpdate: True if props update methods should be called
   */
  setFieldValue = (id, value, shouldUpdate = true) => {
    const field = this.fields[id];
    if (!field) return;

    this.values[id] = value;
    if (this.dirty) {
      this.validateField(id, value);
      this.setFieldError(id);
    }

    field.setValue(value);

    // if the form was passed a notifier, call it if we are not initializing
    if (this.props.onFieldChange && shouldUpdate) {
      this.props.onFieldChange(id, value);
    }

    // if the form was passed an onValidChange notifier
    if (this.props.onValidChange) {
      // validate the form and call notifier if valid changed
      const valid = this.validateForm();
      if (valid !== this.valid) {
        this.valid = valid;
        this.props.onValidChange(valid);
      }
    }
  };

  /**
   * Called from Field to set its additional state.
   * @param {String} id: The id of the field
   * @param {*} opts: The new options state of the field
   */
  setFieldOptions = (id, opts, shouldUpdate = true) => {
    this.options[id] = opts;
    this.fields[id].setOpts(opts);
    if (shouldUpdate) {
      this.validateField(id, this.values[id]);
      this.setFieldError(id);
    }
  };

  onFieldCommit = (id, value) => {
    // if form was passed an onFieldCommit notifier, call it
    if (this.props.onFieldCommit) this.props.onFieldCommit(id, value);
  };

  /**
   * Validates a field value using first the default validator, then
   * custom field based validators and last but not least combined field
   * validators. Stores the error and updates the error
   * on the field that was validated
   * @param {String} id: The id of the field
   * @param {*} value: The field value to validate
   */
  validateField = (id, value) => {
    const { skip } = this.options[id] || {};
    if (skip) {
      this.errors[id] = null;
      return true;
    }

    // run default validator
    let error = Validator.validate(this.fields[id], value);

    // run custom field props validator
    const validate = this.fields[id].validate;
    if (!error && validate) error = validate(value);

    // run combined field validators
    if (!error) error = this.validateCombined(id);

    // update errors
    this.errors[id] = error;

    if (error) return false;
    else return true;
  };

  /**
   * Validates form fields against each other if combined validators
   * are specified in the form
   */
  validateCombined = (id) => {
    let error = null;
    // get validators that validate this field
    const validators = this.props.validators.filter((el) =>
      el.ids.includes(id)
    );
    for (let validator of validators) {
      // create args for the validator
      let args = {};
      for (let id of validator.ids) args[id] = this.values[id];

      // run validator
      error = validator.func(args);

      // update errors on all validated fields
      for (let id of validator.ids) {
        this.errors[id] = error;
        this.fields[id].setError(error);
      }
    }
    return error;
  };

  /**
   * Validate all form fields
   * @returns {Boolean}: Returns true if the form is valid, false otherwise
   */
  validateForm = () => {
    let hasError = false;
    for (let id in this.fields) {
      if (!this.validateField(id, this.values[id])) hasError = true;
    }
    return !hasError;
  };

  /**
   * Update a specific field with its current error value
   * @param {String} id: the id of the field to update the error on
   */
  setFieldError = (id) => this.fields[id].setError(this.errors[id]);

  /**
   * Update all form fields with their current error values
   */
  setFieldErrors = () => {
    for (let id in this.errors) this.setFieldError(id);
  };

  /**
   * Prevents default submit navigation
   * @param {Event} e: Submit event
   */
  onSubmit = (e) => {
    e.preventDefault();
    this.requestSubmit();
  };

  /**
   * Sets form state to dirty, validates all fields and calls props
   * onSubmit if no errors are present
   */
  requestSubmit = () => {
    this.dirty = true;
    if (this.validateForm()) this.props.onSubmit(this.values, this.options);
    else this.setFieldErrors();
    this.initializeForm();
  };

  render() {
    return (
      <FormContext.Provider
        value={{
          registerField: this.registerField,
          unregisterField: this.unregisterField,
          setFieldValue: this.setFieldValue,
          setFieldOptions: this.setFieldOptions,
          onFieldCommit: this.onFieldCommit,
          requestSubmit: this.requestSubmit,
          noHelp: this.props.noHelp,
        }}
      >
        <form
          noValidate
          className={this.props.className}
          style={this.props.style}
          onSubmit={this.onSubmit}
          data-cy={this.props['data-cy']}
        >
          {this.props.children}
        </form>
      </FormContext.Provider>
    );
  }
}

Form.defaultProps = {
  initValues: {},
  initOpts: {},
  validators: [],
  onSubmit: () => {},
  updateWithDefault: false,
};

Form.propTypes = {
  onFieldChange: PropTypes.func,
  onValidChange: PropTypes.func,
  onFieldCommit: PropTypes.func,
};
