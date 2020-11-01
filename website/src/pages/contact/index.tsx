import React from 'react';
import Head from 'next/head';
import { Body, Contact, Footer } from 'Components/index';

const ContactPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Kontakt</title>
      </Head>
      <Body>
        <Contact />
      </Body>
      <Footer />
    </React.Fragment>
  );
};

export default ContactPage;
