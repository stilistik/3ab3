import React from 'react';
import { Container } from 'Components/utility';

import styles from './EventPlaceholder.module.css';

export const EventPlaceholder: React.FC = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <img width="100%" height="100%" src="espi.png" />
        <h3>Zurzeit sind keine Events geplant.</h3>
      </div>
    </Container>
  );
};
