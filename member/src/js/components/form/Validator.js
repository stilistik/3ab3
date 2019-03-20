import validator from 'validator';

export default class Validator {
  static validate = (fieldProps) => {
    // validate required fields are not empty
    if (fieldProps.required && validator.isEmpty(fieldProps.value))
      return { message: 'Please fill out this field.' };

    // switch validator based on field type
    switch (fieldProps.type) {
      case 'email':
        if (!validator.isEmail(fieldProps.value))
          return {
            message: 'This is not a valid Email',
          };
        else return null;
      default:
        return null;
    }
  };
}
