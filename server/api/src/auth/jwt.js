const jwtDecode = require('jwt-decode');

const getUserFromJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    req.user = jwtDecode(authHeader);
  }
  next();
};

module.exports = {
  getUserFromJwt,
};
