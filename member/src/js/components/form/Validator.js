import stringValidator from 'validator';

export default class Validator {
  static validate = (field, fieldValue) => {
    switch (field.type.name) {
      case 'TextField':
      case 'Field':
        return this.validateTextField(field, fieldValue);
      case 'TagField':
      case 'ChipArea':
      case 'SelectField':
        return this.validateSelectField(field, fieldValue);
      case 'ImageField':
        return this.validateImageField(field, fieldValue);
      default:
        return null;
    }
  };

  static validateImageField = (field, fieldValue) => {
    if (field.props.required && !fieldValue)
      return { message: 'Please fill out this field.' };
  };

  static validateSelectField = (field, fieldValue) => {
    if (field.props.required && !fieldValue.length)
      return { message: 'Please fill out this field.' };
  };

  static validateTextField = (field, fieldValue) => {
    if (field.props.required && !fieldValue)
      return { message: 'Please fill out this field.' };

    switch (field.props.type) {
      case 'alpha':
        if (!stringValidator.isAlpha(fieldValue))
          return {
            message: 'Only letters A-Z',
          };
        return null;
      case 'email':
        if (!stringValidator.isEmail(fieldValue))
          return {
            message: 'This is not a valid Email',
          };
        return null;
      case 'number':
        if (!stringValidator.isNumeric(fieldValue))
          return {
            message: 'Please enter a number',
          };
        return null;
      case 'integer':
        if (!stringValidator.isInt(fieldValue))
          return {
            message: 'Please enter an integer',
          };
        return null;
      case 'float':
        if (!stringValidator.isFloat(fieldValue))
          return {
            message: 'Please enter a decimal value',
          };
        return null;
      default:
        return null;
    }
  };
}
