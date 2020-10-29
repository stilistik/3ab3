import React from 'react';
import clx from 'classnames';

import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  const inputCls = clx(styles.textInput, 'shadow-2xl');
  return (
    <div className={styles.wrapper}>
      <form method="post" action="#" className={styles.form}>
        <label htmlFor="name">
          <input
            className={inputCls}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="email">
          <input
            className={inputCls}
            type="email"
            name="email"
            id="email"
            placeholder="E-Mail"
          />
        </label>
        <label htmlFor="subject">
          <input
            className={inputCls}
            type="text"
            name="subject"
            id="subject"
            placeholder="Betreff"
          />
        </label>
        <label htmlFor="message">
          <textarea
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
      </form>
      <div className={styles.location}>
        <div className={styles.map + ' shadow-2xl'}>hier ist eine Karte</div>
        <div className="mt-10">
          <p>Kulturverein 3AB3</p>
          <p>Kalchackerstrasse 104</p>
          <p>3147 Bremgarten b. Bern</p>
        </div>
      </div>
    </div>
  );
};
