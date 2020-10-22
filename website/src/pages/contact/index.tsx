import React from 'react';
import Head from 'next/head';

const ContactPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Kontakt</title>
      </Head>
      <div className="w-full h-full flex items-center justify-center bg-red-500">
        <h1>Kontakt</h1>
        <p>This is the Kontakt page</p>
      </div>
    </React.Fragment>
  );
};

export default ContactPage;
