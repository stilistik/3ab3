import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import React from 'react';
import styles from './Event.module.css';

interface EventProps {
  title: string;
  date: string;
  img: string;
  origin: string;
}

export const Event: React.FC<EventProps> = ({ title, origin, date, img }) => {
  return (
    <LazyLoadingImageDiv src={img} className={styles.wrapper}>
      <div className={styles.top}>
        <h3 className={styles.date}>{new Date(date).toLocaleDateString()}</h3>
        <h4 className={styles.time}>
          {'Doors: ' + new Date(date).toLocaleTimeString()}
        </h4>
      </div>

      <div className={styles.bottom}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{origin}</h2>
      </div>
    </LazyLoadingImageDiv>
  );
};
