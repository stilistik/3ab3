const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('./errors');

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyAndDecodeToken = (context) => {
  if (
    !context ||
    !context.headers ||
    (!context.headers.authorization && !context.headers.Authorization)
  ) {
    throw new AuthenticationError({ message: 'Could not find access token' });
  }

  const token = context.headers.authorization || context.headers.Authorization;
  try {
    const id_token = token.replace('Bearer ', '');
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error('Could not find access token secret');
    }
    const decoded = jwt.verify(id_token, ACCESS_TOKEN_SECRET);

    return decoded;
  } catch (err) {
    throw new AuthenticationError({
      message: 'Invalid access token provided',
    });
  }
};

const verifyTokenInConnection = (connectionParams) => {
  if (
    !connectionParams ||
    (!connectionParams.authorization && !connectionParams.Authorization)
  ) {
    throw new AuthenticationError({ message: 'Could not find access token' });
  }

  const token = connectionParams.authorization || connectionParams.Authorization;
  try {
    const id_token = token.replace('Bearer ', '');
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error('Could not find access token secret');
    }
    const decoded = jwt.verify(id_token, ACCESS_TOKEN_SECRET);

    return decoded;
  } catch (err) {
    throw new AuthenticationError({
      message: 'Invalid access token provided',
    });
  }
};

module.exports = { verifyAndDecodeToken, verifyTokenInConnection };
