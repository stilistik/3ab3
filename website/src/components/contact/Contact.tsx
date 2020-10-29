import React from 'react';
import { Map } from './Map';
import { ContactForm } from './ContactForm';

import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <ContactForm />
      <div className={styles.location}>
        <Map />
        <div className="mt-10">
          <p>Kulturverein 3AB3</p>
          <p>Kalchackerstrasse 104</p>
          <p>3147 Bremgarten b. Bern</p>
        </div>
      </div>
    </div>
  );
};
