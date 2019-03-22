import React from 'react';
import { DefaultGrid } from 'Components';

import styles from './Members.css';

class Members extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <h1>Member</h1>
        </div>
      </DefaultGrid>
    );
  }
}

export default Members;
