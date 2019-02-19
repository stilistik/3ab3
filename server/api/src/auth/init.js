const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Prisma } = require('../generated/prisma-client');

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

passport.use(
  new BasicStrategy(async (clientId, clientSecret, done) => {
    const registeredClient = await prisma.client({ identity: clientId });
    if (!registeredClient) {
      return done(null, false, { message: 'client not found' });
    }

    const validateSecret = bcrypt.compareSync(
      clientSecret,
      registeredClient.secret
    );
    if (!validateSecret) {
      return done(null, false, { message: 'bad password' });
    }

    return done(null, registeredClient, { message: 'authenticated' });
  })
);

passport.use(
  new BearerStrategy(async (accessToken, done) => {
    try {
      const token = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

      const foundUser = await prisma.user({ id: token.id });

      if (!foundUser) {
        return done(null, false);
      }

      return done(null, foundUser, { scope: '*' });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return done(null, false, 'The access token expired');
      }

      if (err.name === 'JsonWebTokenError') {
        return done(null, false);
      }
      return done(err);
    }
  })
);
