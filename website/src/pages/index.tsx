import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Body, EventCard, EventPlaceholder, Footer } from 'Components/index';
import { prisma } from 'App/prisma';

export const getStaticProps = async () => {
  try {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const events = await prisma.events({
      where: {
        published: true,
        date_gte: date.toISOString(),
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

const EventPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <Head>
        <title>3ab3 - Events</title>
      </Head>
      <Body>
        {events.length ? (
          events.map((event) => {
            return (
              <article key={event.id}>
                <EventCard event={event} />
              </article>
            );
          })
        ) : (
          <EventPlaceholder>
            Zurzeit sind keine Events geplant.
          </EventPlaceholder>
        )}
      </Body>
      <Footer />
    </React.Fragment>
  );
};
export default EventPage;
