import React from 'react';
import Head from 'next/head';
import { Contact } from 'Components/index';

const ContactPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Kontakt</title>
      </Head>
      <Contact />
    </React.Fragment>
  );
};

export default ContactPage;
