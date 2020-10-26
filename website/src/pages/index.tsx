import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { EventCard } from 'Components/index';
import { prisma } from 'App/prisma';

export const getStaticProps = async () => {
  const events = await prisma.events({ where: { 
    published: true,
    date_gte: new Date().toISOString()
  }});

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
};

const EventPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Events</title>
      </Head>
      {events.map((event) => {
        return (
          <article key={event.id}>
            <EventCard event={event} />
          </article>
        );
      })}
    </React.Fragment>
  );
};
export default EventPage;
