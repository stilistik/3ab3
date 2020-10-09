const prisma = require('../prisma');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcryptjs');

const {
  RESET_TOKEN_SECRET,
  RESET_TOKEN_EXPIRATION,
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

const requestReset = async (req, res, next) => {
  try {
    const user = await prisma.user({ email: req.body.email });

    if (user) {
      // Generate token
      const resetToken = jwt.sign(
        {
          id: user.id,
          timestamp: +new Date(),
        },
        RESET_TOKEN_SECRET,
        { expiresIn: RESET_TOKEN_EXPIRATION }
      );
      const updatedUser = await prisma.updateUser({
        where: { id: user.id },
        data: { resetToken },
      });
      if (updatedUser) {
        const data = {
          from: '3ab3 Member Admin <admin@3ab3.ch>',
          to: updatedUser.email,
          subject: 'Reset Password',
          template: 'reset_password',
          'v:username': updatedUser.name,
          'v:link': `${MEMBER_CLIENT_URL}/reset_password?token=${resetToken}`,
          inline: logoPath,
        };
        mailgun.messages().send(data);
        res.sendStatus(200);
      } else {
        throw new Error('Could not update user');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    return res.status(422).send({
      message: err.message,
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password, confirm, token } = req.body;
    if (password === confirm) {
      const { id } = jwt.verify(token, RESET_TOKEN_SECRET);
      await prisma.updateUser({
        where: { id },
        data: {
          password: bcrypt.hashSync(password, 8),
        },
      });
      res.sendStatus(200);
    } else {
      throw new Error('Passwords did not match');
    }
  } catch (err) {
    return res.status(422).send({
      message: err.message,
    });
  }
};

module.exports = {
  requestReset,
  resetPassword,
};
