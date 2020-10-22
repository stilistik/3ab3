import React from 'react';
import Head from 'next/head';

const ArchivePage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Archiv</title>
      </Head>
      <div className="w-full h-full flex items-center justify-center bg-green-500">
        <h1>Archiv</h1>
        <p>This is the Archiv page</p>
      </div>
    </React.Fragment>
  );
};

export default ArchivePage;
