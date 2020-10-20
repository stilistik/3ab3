import React from 'react';
import Layout from '../../components/Layout';
import Event from '../../components/Event';
import { InferGetStaticPropsType } from 'next';
import { prisma } from '../../generated/prisma-client';

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
            <Event title={event.title} date={event.date} img={event.image} origin="Origin"/>
          </article>
        );
      })}
    </Layout>
  );
};
export default EventIndex;
