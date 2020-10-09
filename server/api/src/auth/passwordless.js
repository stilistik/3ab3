const prisma = require('../prisma');
const jwt = require('jsonwebtoken');
const path = require('path');

const {
  LOGIN_TOKEN_SECRET,
  LOGIN_TOKEN_EXPIRATION,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  MAILGUN_API_SECRET,
  MAILGUN_DOMAIN,
  MEMBER_CLIENT_URL,
} = process.env;

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_SECRET,
  domain: MAILGUN_DOMAIN,
  host: 'api.eu.mailgun.net',
});

const logoPath = path.join(__dirname, '../resources/favicon.png');

const requestEmail = async (req, res, next) => {
  try {
    const user = await prisma.user({ email: req.body.email });

    if (!user) throw new Error('requestEmail: User not found');

    // Generate token
    const loginToken = jwt.sign(
      {
        id: user.id,
        timestamp: +new Date(),
      },
      LOGIN_TOKEN_SECRET,
      { expiresIn: LOGIN_TOKEN_EXPIRATION }
    );

    const updatedUser = await prisma.updateUser({
      where: { id: user.id },
      data: { loginToken: loginToken },
    });

    if (!updatedUser)
      throw new Error('requestEmail: Could not update user with login token');

    const data = {
      from: '3ab3 Member Admin <admin@3ab3.ch>',
      to: user.email,
      subject: 'Request Login',
      template: 'request_login',
      'v:username': user.name,
      'v:link': `${MEMBER_CLIENT_URL}/auth?token=${loginToken}`,
      inline: logoPath,
    };
    mailgun.messages().send(data);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const requestToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { id } = jwt.verify(token, LOGIN_TOKEN_SECRET);
    const user = await prisma.user({ id });

    if (!user) throw new Error('requestToken: User not found');

    console.log(token, user.loginToken);

    if (token !== user.loginToken)
      throw new Error('requestToken: invalid login token');

    const updatedUser = await prisma.updateUser({
      where: { id: user.id },
      data: { loginToken: null },
    });

    if (!updatedUser) throw new Error('requestToken: unable to update user');

    const accessToken = jwt.sign(
      {
        id: user.id,
        timestamp: +new Date(),
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    res.status(200).send({
      access_token: accessToken,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requestEmail,
  requestToken,
};
