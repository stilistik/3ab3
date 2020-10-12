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
  API_MAINTENANCE_PASSWORD,
} = process.env;

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_SECRET,
  domain: MAILGUN_DOMAIN,
  host: 'api.eu.mailgun.net',
});

const logoPath = path.join(__dirname, '../resources/favicon.png');

const requestEmail = async (req, res) => {
  try {
    const user = await prisma.user({ email: req.body.email });

    if (!user) {
      // if there is no user with the provided email, we still return 200 but
      // do nothing. this prevents informing potential attackers about the validity
      // of entered email adresses.
      return res.sendStatus(200);
    }

    // generate token
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

    if (!updatedUser) {
      throw new Error('Could not update user with login token');
    }

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
    res.status(500).json({ message: err.message });
  }
};

const requestToken = async (req, res) => {
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
    res.status(500).json({ message: err.message });
  }
};

const debugSession = async (req, res) => {
  try {
    console.log(req.body);

    if (req.body.password !== API_MAINTENANCE_PASSWORD) {
      throw new Error('Invalid api maintencance password supplied.');
    }

    const user = await prisma.user({ email: req.body.email });

    if (!user) {
      throw new Error('User not found.');
    }

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  requestEmail,
  requestToken,
  debugSession,
};
