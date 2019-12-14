import stringValidator from 'validator';

const validateTextField = (fieldProps, value) => {
  if (fieldProps.required && (!value || value === ''))
    return { message: 'Please fill out this field.' };

  switch (fieldProps.type) {
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

const validateDateField = (fieldProps, value) => {
  if (fieldProps.required && !value)
    return { message: 'Please fill out this field.' };

  const date = new Date(value);
  if (!date) return { message: 'Invalid date format' };
};

const validateImageField = (fieldProps, value) => {
  if (fieldProps.required && !value)
    return { message: 'Please upload an image' };
};

const validateNumberField = (fieldProps, value) => {
  if (fieldProps.required && isNaN(value))
    return { message: 'Please fill out this field.' };
};

const validateSelectField = (fieldProps, value) => {
  if (fieldProps.required && (!value || value === ''))
    return { message: 'Please fill out this field.' };
};

const validateMultiSelectField = (fieldProps, value) => {
  if (fieldProps.required && (!value || !value.length > 0))
    return { message: 'Please fill out this field.' };
};

const validateBinaryField = (fieldProps, value) => {
  if (fieldProps.required && !value)
    return { message: 'Please confirm this field.' };
};

export default class Validator {
  static validate = (fieldProps, value) => {
    switch (fieldProps.fieldType) {
      case 'text':
        return validateTextField(fieldProps, value);
      case 'number':
        return validateNumberField(fieldProps, value);
      case 'select':
        return validateSelectField(fieldProps, value);
      case 'multiselect':
        return validateMultiSelectField(fieldProps, value);
      case 'binary':
        return validateBinaryField(fieldProps, value);
      case 'image':
        return validateImageField(fieldProps, value);
      case 'date':
        return validateDateField(fieldProps, value);
      default:
        throw Error(
          `ValidatorError: FieldType ${fieldProps.fieldType} not supported`
        );
    }
  };
}
