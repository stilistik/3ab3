import React from 'react';
import Head from 'next/head';
import { prisma } from 'App/prisma';
import { InferGetStaticPropsType } from 'next';
import { Archive } from 'Components/archive/Archive';


export const getStaticProps = async () => {
  const events = await prisma.events({
    where: {
      published: true,
    },
  });

  return {
    props: { events },
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
      <Archive events={events} />
    </React.Fragment>
  );
};

export default ArchivePage;
