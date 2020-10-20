import React from 'react';
import { FormContext } from './FormContext';
import Validator from './Validator';
import { isEqual } from 'lodash';
import {
  FieldOptions,
  FormInstance,
  FieldInstance,
  Serializable,
  FieldError,
  FieldChangeEvent,
} from './types';
import { SelectOption } from '../inputs/types';
import { setBy, getBy } from './Utils';

export interface FormProps {
  initValues?: NestedRecord<Serializable>;
  initOpts?: NestedRecord<FieldOptions>;
  validate?: (
    values: NestedRecord<Serializable>,
    options: NestedRecord<FieldOptions>
  ) => NestedRecord<FieldError> | null;
  onFieldChange?: (event: FieldChangeEvent) => void; // fires while user types in inputs
  onFieldCommit?: (id: string, value: Serializable) => void; // fires when input blurs
  onFieldOptionSelected?: (
    id: string,
    value: SelectOption | SelectOption[]
  ) => void;
  onValidChange?: (valid: boolean) => void;
  onSubmit: (
    values: { [id: string]: Serializable },
    options: { [id: string]: FieldOptions }
  ) => void;
  disableHelpText?: boolean;
  initAfterSubmit?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Form: React.FC<FormProps> = ({
  initValues = {},
  initOpts = {},
  onSubmit,
  onFieldChange,
  onValidChange,
  onFieldCommit,
  onFieldOptionSelected,
  validate: customFormValidate,
  disableHelpText = false, // if this is set to true, the help texts for all form fields will not show
  initAfterSubmit = false, // if this is set to true, the field values will be set to the init values after submit
  children,
  ...rest
}) => {
  const [canSubmit, setCanSubmit] = React.useState(false);
  const instanceRef = React.useRef<FormInstance>({
    fields: {},
    values: {},
    options: {},
    errors: {},
    fieldIds: [],
    dirty: false,
    valid: false,
  });
  const initValueRef = React.useRef(null);

  // make sure updates to initValues prop is propagated to the fields
  React.useEffect(() => {
    instanceRef.current.fieldIds.forEach((id) => {
      const fieldInitValue = getBy(initValues, id);
      const prevFieldInitValue = getBy(initValueRef.current, id);
      if (
        initValueRef.current &&
        !isEqual(fieldInitValue, prevFieldInitValue)
      ) {
        _updateFieldValue(id, fieldInitValue);
      }
    });
    // store current initValue in ref
    initValueRef.current = initValues;
  });

  /**
   * Called from field to register a field instance with this form
   * @param id the id of the field
   * @param fieldInstance the field instance with setters for value, options and error
   */
  function registerField(id: string, fieldInstance: FieldInstance) {
    // keep track of all fields in a flat list of ids
    if (instanceRef.current.fieldIds.includes(id)) return;
    instanceRef.current.fieldIds.push(id);

    // store the field instance
    instanceRef.current.fields = setBy(
      instanceRef.current.fields,
      id,
      fieldInstance
    );

    // set init options
    const fieldInitOptions = getBy(initOpts, id);
    if (fieldInitOptions) {
      // set field init options
      _updateFieldOptions(id, fieldInitOptions);
    } else {
      // set field default options
      _updateFieldOptions(id, fieldInstance.defaultOpts);
    }

    // set init values
    const fieldInitValues = getBy(initValues, id);
    if (fieldInitValues != null) {
      // set field init value, dont onFieldChange handlers
      _updateFieldValue(id, fieldInitValues);
    } else {
      // set field default value, call handlers
      _updateFieldValue(id, fieldInstance.defaultValue);
    }
  }

  function initializeForm() {
    setCanSubmit(false);
    instanceRef.current.fieldIds.forEach((id) => {
      const fieldInstance = getBy(instanceRef.current.fields, id);
      const fieldInitValue = getBy(initValues, id);

      // reset errors and validation
      instanceRef.current.dirty = false;
      setBy(instanceRef.current.errors, id, null);

      // set init values
      if (fieldInitValue) {
        // set field init value, dont onFieldChange handlers
        _updateFieldValue(id, fieldInitValue);
      } else if (fieldInstance.defaultValue) {
        // set field default value, call handlers
        _updateFieldValue(id, fieldInstance.defaultValue);
      } else {
        _updateFieldValue(id, null);
      }
    });
  }

  /**
   * Helper to set the field state without firing onFieldChange handlers. This
   * prevents infinite loop updates when initValues change and we need to update the fields
   * @param {string} id: The id of the field
   * @param {IFieldValue} value: The new value of the field
   */
  function _updateFieldValue(id: string, value: Serializable) {
    const field = getBy(instanceRef.current.fields, id);
    if (!field) return;

    instanceRef.current.values = setBy(instanceRef.current.values, id, value);
    if (instanceRef.current.dirty) {
      validateForm();
      setFieldErrors();
    }

    field.setValue(value);

    // onValidChange handler
    if (onValidChange) {
      // validate the form and fire handler if valid changed
      const valid = validateForm();
      if (valid !== instanceRef.current.valid) {
        instanceRef.current.valid = valid;
        onValidChange(valid);
      }
    }
  }

  /**
   * Called from Field to update its value. Will call onFieldChange handler if it exists
   * @param {string} id: The id of the field
   * @param {IFieldValue} value: The new value of the field
   */
  function setFieldValue(id: string, value: Serializable) {
    setCanSubmit(true);

    _updateFieldValue(id, value);

    // get changes and run field change handler if it exists
    const changes = { value: setBy({}, id, value) };
    handleFieldChange(id, changes);
  }

  function handleFieldChange(
    id: string,
    changes: {
      value?: NestedRecord<Serializable>;
      options?: NestedRecord<FieldOptions>;
    } = {
      value: null,
      options: null,
    }
  ) {
    if (!onFieldChange) return;

    const fieldValue = getBy(instanceRef.current.values, id);
    const fieldOptions = getBy(instanceRef.current.options, id);

    onFieldChange({
      id,
      value: fieldValue,
      options: fieldOptions,
      valueChanges: changes.value,
      optionChanges: changes.options,
    });
  }

  /**
   * Handler for field commit events. The field commit event is triggered less often
   * than the field change event. For example: When a user types in a text field, the onFieldChange
   * event is fired on every keydown event, while the onFieldCommit event is fired when the input blurs
   * @param {string} id The field id
   * @param {IFieldValue} value the field value
   */
  function handleFieldCommit(id: string, value: Serializable) {
    // if form was passed an onFieldCommit handler, call it
    if (onFieldCommit) onFieldCommit(id, value);
  }

  function handleFieldOptionSelected(
    id: string,
    value: SelectOption | SelectOption[]
  ) {
    if (onFieldOptionSelected) onFieldOptionSelected(id, value);
  }

  /**
   * Helper to set the field options without running validation. This is used for initialization
   * @param {string} id: The id of the field
   * @param {IFieldOptions} options: The new options of the field
   */
  function _updateFieldOptions(id: string, opts: FieldOptions) {
    instanceRef.current.options = setBy(instanceRef.current.options, id, opts);
    const fieldInstance = getBy(instanceRef.current.fields, id);
    fieldInstance.setOpts(opts);
  }

  /**
   * Called from Field to set its additional state.
   * @param {String} id: The id of the field
   * @param {*} opts: The new options state of the field
   */
  function setFieldOptions(id: string, opts: FieldOptions) {
    setCanSubmit(true);
    _updateFieldOptions(id, opts);

    // get changes and run field change handler if it exists
    const changes = { options: setBy({}, id, opts) };
    handleFieldChange(id, changes);

    validateForm();
    setFieldErrors();
  }

  /**
   * Called from Field to unregister from this form when the field
   * unmounts.
   * @param {String} id: The id of the field
   */
  function unregisterField(id: string) {
    instanceRef.current.fieldIds = instanceRef.current.fieldIds.filter(
      (fieldId) => fieldId !== id
    );
    instanceRef.current.fields = setBy(
      instanceRef.current.fields,
      id,
      undefined
    );
  }

  /**
   * Validates a field value using first the default validator, then
   * custom field based validators and last but not least combined field
   * validators. Stores the error and updates the error
   * on the field that was validated
   * @param {String} id: The id of the field
   * @param {*} value: The field value to validate
   */
  function validateField(id: string, value: Serializable): boolean {
    const { skip } = instanceRef.current.options[id] || {};
    if (skip) {
      instanceRef.current.errors[id] = null;
      return true;
    }

    const field = getBy(instanceRef.current.fields, id);

    // run default field validation
    let fieldError = Validator.validate(field, value);

    // run custom field validation
    const customFieldValidate = field.validate;
    if (!fieldError && customFieldValidate)
      fieldError = customFieldValidate(value);

    instanceRef.current.errors = setBy(
      instanceRef.current.errors,
      id,
      fieldError
    );

    if (fieldError) return false;
    else return true;
  }

  /**
   * Validate all form fields
   * @returns {boolean}: Returns true if the form is valid, false otherwise
   */
  function validateForm(): boolean {
    // track from valid state
    let formValid = true;

    // run field validation
    instanceRef.current.fieldIds.forEach((id) => {
      const fieldValue = getBy(instanceRef.current.values, id);
      const fieldValid = validateField(id, fieldValue);
      if (!fieldValid) formValid = false;
    });

    // run custom form level validation
    if (formValid && customFormValidate) {
      formValid = runCustomFormValidation();
    }

    return formValid;
  }

  function runCustomFormValidation() {
    let formValid = true;
    const fieldValues = instanceRef.current.values;
    const fieldOptions = instanceRef.current.options;
    const formErrors = customFormValidate(fieldValues, fieldOptions);
    if (formErrors && Object.keys(formErrors).length > 0) {
      instanceRef.current.errors = Object.assign(
        {},
        instanceRef.current.errors,
        formErrors
      );
      formValid = false;
    } else {
      instanceRef.current.errors = {};
    }
    return formValid;
  }

  /**
   * Update a specific field's state with its current error value
   * @param {String} id: the id of the field to update the error on
   */
  function setFieldError(id: string) {
    const fieldError = getBy(instanceRef.current.errors, id) || null;
    const fieldInstance = getBy(instanceRef.current.fields, id);
    fieldInstance.setError(fieldError);
  }

  /**
   * Update all form field states with their current error values
   */
  function setFieldErrors() {
    Object.keys(instanceRef.current.fields).forEach((id) => {
      setFieldError(id);
    });
  }

  /**
   * Prevents default submit navigation
   * @param {Event} e: Submit event
   */
  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    requestSubmit();
  }

  /**
   * Sets form state to dirty, validates all fields and calls props
   * onSubmit if no errors are present
   */
  function requestSubmit() {
    instanceRef.current.dirty = true;
    const formValid = validateForm();
    if (formValid) {
      onSubmit(instanceRef.current.values, instanceRef.current.options);
      if (initAfterSubmit) initializeForm();
      setCanSubmit(false);
    } else {
      setFieldErrors();
    }
  }

  return (
    <FormContext.Provider
      value={{
        registerField: registerField,
        unregisterField: unregisterField,
        setFieldValue: setFieldValue,
        setFieldOptions: setFieldOptions,
        requestSubmit: requestSubmit,
        onFieldCommit: handleFieldCommit,
        onFieldOptionSelected: handleFieldOptionSelected,
        disableHelpText: disableHelpText,
        canSubmit,
      }}
    >
      <form noValidate onSubmit={handleSubmit} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
