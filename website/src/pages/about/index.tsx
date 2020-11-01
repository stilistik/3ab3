import React from 'react';
import Head from 'next/head';
import { About, Body, Footer } from 'Components/index';

const AboutPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - About</title>
      </Head>
      <Body>
        <About />
      </Body>
      <Footer />
    </React.Fragment>
  );
};

export default AboutPage;
