import Axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const {
  RECAPTCHA_PRIVATE_KEY,
  CONTACT_EMAIL_ADDRESS,
  MAILGUN_API_SECRET,
  MAILGUN_DOMAIN,
} = process.env;

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_SECRET,
  domain: MAILGUN_DOMAIN,
  host: 'api.eu.mailgun.net',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { token, name, email, subject, message } = JSON.parse(req.body);
    console.log(name, email, subject, message);

    const googleUrl =
      'https://www.google.com/recaptcha/api/siteverify?secret=' +
      RECAPTCHA_PRIVATE_KEY +
      '&response=' +
      token;

    const captchaResponse = await Axios({
      url: googleUrl,
    });

    if (captchaResponse.data.success === false) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(
        JSON.stringify({ success: false, message: 'captcha failed' })
      );
    }

    const data = {
      from: `3ab3 Contact Form <${email}>`,
      to: CONTACT_EMAIL_ADDRESS,
      subject: subject,
      text: message,
    };
    mailgun.messages().send(data);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        success: true,
        message: 'Message sent',
      })
    );
  }
};
