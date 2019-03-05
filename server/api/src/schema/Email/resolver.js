const API_KEY = process.env.MAILGUN_API_SECRET;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({
  apiKey: API_KEY,
  domain: DOMAIN,
  host: 'api.eu.mailgun.net',
});

module.exports = {
  Mutation: {
    sendEmail(root, args) {
      mailgun.messages().send(args.input);
      return args.input;
    },
  },
};
