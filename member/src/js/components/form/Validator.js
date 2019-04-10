import validator from 'validator';

export default class Validator {
  static validate = (fieldProps, fieldValue) => {
    // validate required fields are not empty
    if (fieldProps.required) {
      if (!fieldValue) return { message: 'Please fill out this field.' };
      if (fieldProps.type === 'select' && !fieldValue.length)
        return { message: 'Please make a selection' };
    }

    // switch validator based on field type
    switch (fieldProps.type) {
      case 'alpha':
        if (!validator.isAlpha(fieldValue))
          return {
            message: 'Only letters A-Z',
          };
        return null;
      case 'email':
        if (!validator.isEmail(fieldValue))
          return {
            message: 'This is not a valid Email',
          };
        return null;
      case 'number':
        if (!validator.isNumeric(fieldValue))
          return {
            message: 'Please enter a number',
          };
        return null;
      case 'integer':
        if (!validator.isInt(fieldValue))
          return {
            message: 'Please enter an integer',
          };
        return null;
      case 'float':
        if (!validator.isFloat(fieldValue))
          return {
            message: 'Please enter a decimal value',
          };
        return null;
      default:
        return null;
    }
  };
}
