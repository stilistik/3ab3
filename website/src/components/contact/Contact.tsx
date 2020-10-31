import React from 'react';
import { Map } from './Map';
import { ContactForm } from './ContactForm';

import styles from './Contact.module.css';
import { Container } from 'Components/utility';

export const Contact: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 px-4">
          <ContactForm />
        </div>
        <div className="w-full sm:w-1/2 px-4">
          <div className={styles.location}>
            <Map />
            <div className="mt-10">
              <p>Kulturverein 3AB3</p>
              <p>Kalchackerstrasse 104</p>
              <p>3147 Bremgarten b. Bern</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
