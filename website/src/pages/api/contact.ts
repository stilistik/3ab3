import Axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { token, name, email, subject, message } = JSON.parse(req.body);
    console.log(name, email, subject, message);

    const googleUrl =
      'https://www.google.com/recaptcha/api/siteverify?secret=' +
      process.env.RECAPTCHA_PRIVATE_KEY +
      '&response=' +
      token;

    const captchaResponse = await Axios({
      url: googleUrl,
    });

    if (captchaResponse.data.success === false) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, message: 'captcha failed' }));
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(
        JSON.stringify({
          success: true,
          message: 'captcha approved',
        })
      );
    }
  }
  return res.status(200).json({ name: 'John Doe' });
};
