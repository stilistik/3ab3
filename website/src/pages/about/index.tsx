import React from 'react';
import Head from 'next/head';
import { About, Body, Footer } from 'Components/index';
import { InferGetStaticPropsType } from 'next';
import { prisma } from 'App/prisma';

export const getStaticProps = async () => {
  try {
    const secrets = await prisma.secrets();
    return {
      props: { secrets },
      revalidate: 1,
    };
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: { secrets: [] },
    revalidate: 1,
  };
};

const AboutPage = ({
  secrets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - About</title>
      </Head>
      <Body>
        <About secrets={secrets} />
      </Body>
      <Footer />
    </React.Fragment>
  );
};

export default AboutPage;
