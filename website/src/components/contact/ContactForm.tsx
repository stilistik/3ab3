import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import clx from 'classnames';

import styles from './ContactForm.module.css';

export const ContactForm: React.FC = () => {
  const recaptchaRef = React.useRef(null);
  const [values, setValues] = React.useState<Record<string, string>>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await recaptchaRef.current.executeAsync();
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        token,
        ...values,
      }),
    });
    const json = await response.json();
    console.log(json);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValues = Object.assign({}, values, {
      [e.target.name]: e.target.value,
    });
    setValues(newValues);
  };

  const inputCls = clx(styles.textInput, 'shadow-2xl');

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="name">
        <input
          value={values.name}
          onChange={handleInputChange}
          className={inputCls}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="email">
        <input
          value={values.email}
          onChange={handleInputChange}
          className={inputCls}
          type="email"
          name="email"
          id="email"
          placeholder="E-Mail"
        />
      </label>
      <label htmlFor="subject">
        <input
          value={values.subject}
          onChange={handleInputChange}
          className={inputCls}
          type="text"
          name="subject"
          id="subject"
          placeholder="Betreff"
        />
      </label>
      <label htmlFor="message">
        <textarea
          value={values.message}
          onChange={handleInputChange}
          className={inputCls}
          name="message"
          id="message"
          rows={5}
          placeholder="Nachricht"
          style={{ height: `384px` }}
        />
      </label>
      <button className={styles.button} type="submit">
        Senden
      </button>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={__RECAPTCHA_PUBLIC_KEY__}
      />
    </form>
  );
};
