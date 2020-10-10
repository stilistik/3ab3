import stringValidator from 'validator';
import { FieldError, FieldInstance, Serializable } from './types';

const validateTextField = (fieldInstance: FieldInstance, value: Serializable) => {
  if (fieldInstance.required && (value == null || value === '')) return { message: 'Please fill out this field.' };

  if (typeof value !== 'string')
    throw new Error(`ValidatorError: field of type 'text' received non string value ${value}`);
  switch (fieldInstance.type) {
    case 'alpha':
      if (!stringValidator.isAlpha(value))
        return {
          message: 'Only letters A-Z',
        };
      return null;
    case 'email':
      if (!stringValidator.isEmail(value))
        return {
          message: 'This is not a valid Email',
        };
      return null;
    default:
      return null;
  }
};

const validateNumberField = (fieldInstance: FieldInstance, value: Serializable) => {
  if (fieldInstance.required && (isNaN(Number(value)) || value == null))
    return { message: 'Please fill out this field.' };
};

const validateSelectField = (fieldInstance: FieldInstance, value: Serializable) => {
  if (fieldInstance.required && (!value || value === '')) return { message: 'Please fill out this field.' };
};

const validateMultiSelectField = (fieldInstance: FieldInstance, value: Serializable) => {
  if (fieldInstance.required && (!value || (Array.isArray(value) && value.length === 0)))
    return { message: 'Please fill out this field.' };
};

const validateBinaryField = (fieldInstance: FieldInstance, value: Serializable) => {
  if (typeof value !== 'boolean') return;
  if (fieldInstance.required && !value) return { message: 'Please confirm this field.' };
};

const validateDateField = (fieldInstance: FieldInstance, value: Serializable) => {
  if (fieldInstance.required && (value == null || value === '')) return { message: 'Please fill out this field.' };
  if (value && !stringValidator.isISO8601(String(value))) return { message: 'This is not a valid date.' };
};

export default class Validator {
  static validate = (fieldInstance: FieldInstance, value: Serializable): FieldError => {
    switch (fieldInstance.fieldType) {
      case 'text': {
        return validateTextField(fieldInstance, value);
      }
      case 'number': {
        return validateNumberField(fieldInstance, value);
      }
      case 'select': {
        return validateSelectField(fieldInstance, value);
      }
      case 'multiselect': {
        return validateMultiSelectField(fieldInstance, value);
      }
      case 'binary': {
        return validateBinaryField(fieldInstance, Boolean(value));
      }
      case 'date': {
        return validateDateField(fieldInstance, value);
      }
      case 'divider': {
        return null;
      }
      default: {
        throw Error(`ValidatorError: FieldType ${fieldInstance.fieldType} not supported`);
      }
    }
  };
}
