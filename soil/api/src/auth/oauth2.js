const oauth2orize = require('oauth2orize');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Prisma } = require('../generated/prisma-client');

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION } = process.env;

const server = oauth2orize.createServer();

server.exchange(
  oauth2orize.exchange.password(
    async (client, username, password, scope, done) => {
      // Client not found
      if (!client) {
        return done(null, false);
      }

      // Invalid client
      if (!client.trusted) {
        return done(null, false);
      }

      // Validate user with email and password
      const registeredUser = await prisma.user({ email: username });
      if (!registeredUser) {
        return done(null, false);
      }

      const validatePassword = bcrypt.compareSync(
        password,
        registeredUser.password
      );

      if (!validatePassword) {
        return done(null, false);
      }

      // Generate token
      const accessToken = jwt.sign(
        {
          id: registeredUser.id,
          timestamp: +new Date(),
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
      );

      return done(null, accessToken);
    }
  )
);

module.exports = {
  token: [
    passport.authenticate('basic', { session: false }),
    server.token(),
    server.errorHandler(),
  ],

  verify: async (req, res) => {
    try {
      const originalURI = req.get('X-Original-URI');

      if (!originalURI) {
        return res.status(500).send('Invalid URL');
      }

      if (!req.get('Authorization')) {
        return res
          .status(403)
          .send('Authorization Error: Access token not found');
      }

      const accessToken = req.get('Authorization').split(' ')[1];
      if (!accessToken) {
        return res
          .status(403)
          .send('Authorization Error: Invalid access token');
      }

      const token = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
      const user = await prisma.user({ id: token.id });

      if (!user) {
        return res
          .status(403)
          .send('Authorization Error: Invalid access token');
      }

      return res.sendStatus(200);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res
          .status(403)
          .send('Authorization Error: Access token expired');
      }

      if (err.name === 'JsonWebTokenError') {
        return res
          .status(403)
          .send('Authorization Error: Invalid access token');
      }

      return res.sendStatus(500);
    }
  },
};
