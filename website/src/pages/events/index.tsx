import React from 'react';
import { InferGetStaticPropsType } from 'next';
import { Layout, Event } from 'Components/index';
import { prisma } from 'App/prisma';

export const getStaticProps = async () => {
  const events = await prisma.events();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
};

const EventIndex = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
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
    </Layout>
  );
};
export default EventIndex;
