import React from 'react';
import Head from 'next/head';
import styles from './Index.module.css';

const AboutPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - About</title>
      </Head>
      <div className={
          styles.container + ' w-full h-full flex items-center justify-center'
        }>
        <h1>About</h1>
        <p>This is the About page</p>
      </div>
    </React.Fragment>
  );
};

export default AboutPage;
