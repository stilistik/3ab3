import validator from 'validator';

export default class Validator {
  static validate = (fieldProps) => {
    // validate required fields are not empty
    if (fieldProps.required && !fieldProps.value)
      return { message: 'Please fill out this field.' };

    // switch validator based on field type
    switch (fieldProps.type) {
      case 'alpha':
        if (!validator.isAlpha(fieldProps.value))
          return {
            message: 'Only letters A-Z',
          };
        return null;
      case 'email':
        if (!validator.isEmail(fieldProps.value))
          return {
            message: 'This is not a valid Email',
          };
        return null;
      case 'number':
        if (!validator.isNumeric(fieldProps.value))
          return {
            message: 'Please enter a number',
          };
        return null;
      case 'integer':
        if (!validator.isInt(fieldProps.value))
          return {
            message: 'Please enter an integer',
          };
        return null;
      case 'float':
        if (!validator.isFloat(fieldProps.value))
          return {
            message: 'Please enter a decimal value',
          };
        return null;
      default:
        return null;
    }
  };
}
