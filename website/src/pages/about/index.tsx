import React from 'react';
import Head from 'next/head';
import { About } from 'Components/index';

const AboutPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - About</title>
      </Head>
      <About />
    </React.Fragment>
  );
};

export default AboutPage;
