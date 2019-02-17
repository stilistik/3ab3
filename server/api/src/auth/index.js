const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-core');

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION } = process.env;

const authenticate = async (resolve, root, args, context, info) => {
  try {
    jwt.verify(context.request.get('Authorization'), ACCESS_TOKEN_SECRET);
  } catch (e) {
    return new AuthenticationError(
      'Invalid access token, authorization failed.'
    );
  }
  const result = await resolve(root, args, context, info);
  return result;
};

const token = (req, res) => {
  const accessToken = jwt.sign(
    {
      timestamp: +new Date(),
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );
  return res.send(accessToken);
};

module.exports = {
  authenticate,
  token,
};
