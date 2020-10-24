import React from 'react';
import { InferGetStaticPropsType } from 'next';
import { Layout, Event } from 'Components/index';
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
      {events.map((event) => {
        return (
          <article key={event.id}>
            <Event
              title={event.title}
              date={event.date}
              img={event.image}
              origin="Origin"
            />
          </article>
        );
      })}
    </React.Fragment>
  );
};

export default EventPage;
