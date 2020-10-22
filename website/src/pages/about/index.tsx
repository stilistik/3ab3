import React from 'react';
import Head from 'next/head';

const AboutPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - About</title>
      </Head>
      <div className="w-full h-full flex items-center justify-center bg-blue-500">
        <h1>About</h1>
        <p>This is the About page</p>
      </div>
    </React.Fragment>
  );
};

export default AboutPage;
