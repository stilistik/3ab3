const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Prisma } = require('../generated/prisma-client');

const prisma = new Prisma({
  endpoint: 'http://prisma:4466',
});

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET; // eslint-disable-line prefer-destructuring

passport.use(
  new BasicStrategy(async (clientId, clientSecret, done) => {
    try {
      console.log('basic authentication attempt');
      console.log(clientId, clientSecret);
      const registeredClient = await prisma.client({ id: clientId });

      if (!registeredClient) {
        return done(null, false);
      }

      const validateSecret = bcrypt.compareSync(
        clientSecret,
        registeredClient.secret
      );
      if (!validateSecret) {
        return done(null, false);
      }

      return done(null, registeredClient);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new BearerStrategy(async (accessToken, done) => {
    console.log('bearer authentication attempt');
    console.log(accessToken);
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
