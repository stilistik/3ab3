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

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const { token, name, email, subject, message } = JSON.parse(req.body);
  const googleUrl =
    'https://www.google.com/recaptcha/api/siteverify?secret=' +
    RECAPTCHA_PRIVATE_KEY +
    '&response=' +
    token;

  const captchaResponse = await Axios({
    url: googleUrl,
  });

  if (captchaResponse.data.success === false) {
    throw new Error('Captcha verification failed');
  }

  const data = {
    from: `${name} <${email}>`,
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      handlePostRequest(req, res);
    } else throw new Error(`Unsupported request method ${req.method}`);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: false, message: error.message }));
  }
};
