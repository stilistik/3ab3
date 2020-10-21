const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const { ACCESS_TOKEN_SECRET } = process.env;

passport.use(
  new BasicStrategy(async (clientId, clientSecret, done) => {
    const registeredClient = await prisma.client({ identity: clientId });
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

      return done(null, foundUser);
    } catch (err) {
      return done(null, false);
    }
  })
);
