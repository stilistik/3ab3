const prisma = require('../prisma');
const jwt = require('jsonwebtoken');
const path = require('path');

const {
  RESET_TOKEN_SECRET,
  RESET_TOKEN_EXPIRATION,
  MAILGUN_API_SECRET,
  MAILGUN_DOMAIN,
} = process.env;

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_SECRET,
  domain: MAILGUN_DOMAIN,
  host: 'api.eu.mailgun.net',
});

const logoPath = path.join(__dirname, '../resources/favicon.png');

module.exports = async function(req, res, next) {
  console.log(req.body);

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
      console.log(resetToken);

      const updatedUser = await prisma.updateUser({
        where: { id: user.id },
        data: { resetToken },
      });
      if (updatedUser) {
        console.log(updatedUser);

        const data = {
          from: '3ab3 Member Admin <admin@3ab3.ch>',
          to: updatedUser.email,
          subject: 'Reset Password',
          template: 'reset_password',
          'v:username': updatedUser.name,
          'v:link': `http://localhost:3000/reset_password?token=${resetToken}`,
          inline: logoPath,
        };
        mailgun.messages().send(data, function(error, body) {
          console.log(error, body);
        });
        res.sendStatus(200);
      } else {
        throw new Error('Could not update user');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    next(err);
  }
};
