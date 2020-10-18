const path = require('path');

const API_KEY = process.env.MAILGUN_API_SECRET;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = require('mailgun-js')({
  apiKey: API_KEY,
  domain: DOMAIN,
  host: 'api.eu.mailgun.net',
});

const logoPath = path.join(__dirname, '../../resources/favicon.png');

module.exports = {
  Mutation: {
    sendEmail(root, args) {
      mailgun.messages().send(args.input);
      return true;
    },
    async sendPaymentReminder(root, args, context) {
      const users = await Promise.all(
        args.userIds.map((userId) => context.prisma.user({ id: userId }))
      );

      users.forEach((user) => {
        const langSlug = user.language.replace('-', '').toLowerCase();
        const template = `payment_reminder_${langSlug}`;
        const data = {
          from: '3ab3 Member Admin <admin@3ab3.ch>',
          to: user.email,
          subject: 'Payment Reminder',
          template: template,
          'v:username': user.name,
          'v:balance': user.balance,
          inline: logoPath,
        };
        mailgun.messages().send(data);
      });

      return true;
    },
  },
};
