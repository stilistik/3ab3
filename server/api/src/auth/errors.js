const { createError } = require('apollo-errors');

const AuthenticationError = createError('AuthenticationError', {
  message: 'You are not authenticated',
});

const AuthorizationError = createError('AuthorizationError', {
  message: 'You are not authorized for this resource',
});

module.exports = {
  AuthenticationError,
  AuthorizationError,
};
