import React from 'react';
import Head from 'next/head';
import styles from './Index.module.css';

const ContactPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Kontakt</title>
      </Head>
      <div className={
          styles.container + ' w-full h-full flex items-center justify-center'
        }>
        <h1>Kontakt</h1>
        <p>This is the Kontakt page</p>
      </div>
    </React.Fragment>
  );
};

export default ContactPage;
