import React from 'react';
import clx from 'classnames';
import { Event } from 'App/prisma';

import styles from './EventTitle.module.css';

interface EventTitleProps {
  event: Event;
}

export const EventTitle = React.forwardRef(
  (
    { event }: EventTitleProps,
    ref: React.MutableRefObject<HTMLDivElement>
  ): JSX.Element => {
    const titleCls = clx(styles.title, {
      [styles.lgTitle]: event.title.length >= 0,
      [styles.mdTitle]: event.title.length >= 9,
      [styles.smTitle]: event.title.length >= 18,
      [styles.xsTitle]: event.title.length >= 32,
    });

    return (
      <div ref={ref} className="absolute bottom-0 right-0 w-1/2">
        <h1 className={titleCls}>{event.title}</h1>
        <h4 className={styles.subtitle}>{event.subtitle}</h4>
      </div>
    );
  }
);
