import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { SendConfirmModal } from './SendConfirmModal';
import { LoadingOverlay, Modal } from 'Components/utility';
import clx from 'classnames';

import styles from './ContactForm.module.css';

const initState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const ContactForm: React.FC = () => {
  const recaptchaRef = React.useRef(null);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [values, setValues] = React.useState<Record<string, string>>(
    () => initState
  );

  React.useEffect(() => {
    async function runSubmit() {
      try {
        const token = await recaptchaRef.current.executeAsync();
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify({
            token,
            ...values,
          }),
        });
        const json = await response.json();
        if (json.success) {
          setShowConfirm(true);
          setValues(initState);
        }
      } catch (error) {
        console.log(error.message);
        setShowError(true);
      }
      setSubmitting(false);
    }

    function hasValues() {
      return values.email && values.name && values.subject && values.message;
    }

    if (submitting && hasValues()) {
      setTimeout(() => runSubmit(), 1000);
    } else setSubmitting(false);
  }, [submitting, values]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
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
    <React.Fragment>
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
        <button className={styles.button + ' shadow-2xl'} type="submit">
          Senden
        </button>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={__RECAPTCHA_PUBLIC_KEY__}
        />
      </form>
      <SendConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        name={values.name}
      />
      <Modal show={showError} onClose={() => setShowError(false)}>
        <p> an error occured </p>
      </Modal>
      {submitting && <LoadingOverlay />}
    </React.Fragment>
  );
};
