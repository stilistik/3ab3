import React from 'react';
import { DefaultGrid } from 'Components';
import { getQueryParams } from 'History';
import Committee from './committee/Committee';

import styles from './EditEvent.css';

class EditEvent extends React.Component {
  render() {
    const { id } = getQueryParams();
    if (!id) return null;
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Committee eventId={id} />
        </div>
      </DefaultGrid>
    );
  }
}

export default EditEvent;
