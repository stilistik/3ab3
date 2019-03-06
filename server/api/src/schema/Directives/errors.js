const { createError } = require('apollo-errors');

const AuthenticationError = createError('AuthenticationError', {
  message: 'You are not authorized.',
});

module.exports = { AuthenticationError };
