import React from 'react';
import Head from 'next/head';
import { prisma } from 'App/prisma';
import { InferGetStaticPropsType } from 'next';
import { Footer, Archive, Body } from 'Components/index';

export const getStaticProps = async () => {
  try {
    const events = await prisma.events({
      where: {
        published: true,
        date_lt: new Date().toISOString(),
      },
      orderBy: 'date_ASC',
    });
    return {
      props: { events },
      revalidate: 1,
    };
  } catch (error) {
    console.log(error.message);
  }
  return {
    props: { events: [] },
    revalidate: 1,
  };
};

const ArchivePage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Archiv</title>
      </Head>
      <Body>
        <Archive events={events} />
      </Body>
      <Footer />
    </React.Fragment>
  );
};

export default ArchivePage;
