const prisma = require('../prisma');
const jwt = require('jsonwebtoken');
const path = require('path');
const Logger = require('../helper/logger');

const {
  LOGIN_TOKEN_SECRET,
  LOGIN_TOKEN_EXPIRATION,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  MAILGUN_API_SECRET,
  MAILGUN_DOMAIN,
  MEMBER_PUBLIC_URL,
  API_MAINTENANCE_PASSWORD,
} = process.env;

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_SECRET,
  domain: MAILGUN_DOMAIN,
  host: 'api.eu.mailgun.net',
});

const logoPath = path.join(__dirname, '../resources/favicon.png');

const getLoginToken = async (req, res) => {
  const user = await prisma.user({ email: req.body.email });

  if (!user) {
    // if there is no user with the provided email, we still return 200 but
    // do nothing. this prevents informing potential attackers about the validity
    // of entered email adresses.
    Logger.log(`User with ${req.body.email} not found.`);
    return res.sendStatus(200);
  }

  console.log(user);

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

  return [updatedUser, loginToken];
};

const requestEmail = async (req, res) => {
  try {
    const [user, loginToken] = await getLoginToken(req, res);
    const langSlug = user.language.replace('-', '').toLowerCase();
    const template = `request_login_${langSlug}`;
    const data = {
      from: '3ab3 Member Admin <admin@3ab3.ch>',
      to: user.email,
      subject: 'Request Login',
      template: template,
      'v:username': user.name,
      'v:link': `${MEMBER_PUBLIC_URL}/auth?token=${loginToken}`,
      inline: logoPath,
    };
    mailgun.messages().send(data);
    Logger.log(`Login email sent to ${user.email}`);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const requestToken = async (req, res) => {
  try {
    Logger.log('Login request received.');
    const { token } = req.body;
    console.log(token);
    const { id } = jwt.verify(token, LOGIN_TOKEN_SECRET);
    const user = await prisma.user({ id });

    if (!user) throw new Error('requestToken: User not found');

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

const refreshToken = async (req, res) => {};

const debugSession = async (req, res) => {
  try {
    if (req.body.password !== API_MAINTENANCE_PASSWORD) {
      throw new Error('Unauthorized');
    }

    const [user, loginToken] = await getLoginToken(req, res);
    console.log(user);
    Logger.log(`Debug session created for ${user.name}`);
    const link = `${MEMBER_PUBLIC_URL}/auth?token=${loginToken}`;
    res.status(200).send(link);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  requestEmail,
  requestToken,
  refreshToken,
  debugSession,
};
