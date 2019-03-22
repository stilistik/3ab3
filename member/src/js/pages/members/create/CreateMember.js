import React from 'react';
import { DefaultGrid } from 'Components';
import CreateMemberForm from './CreateMemberForm';

import styles from './CreateMember.css';

class CreateMember extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <CreateMemberForm />
        </div>
      </DefaultGrid>
    );
  }
}

export default CreateMember;
