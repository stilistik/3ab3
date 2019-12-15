import React from 'react';
import { Typography } from '@material-ui/core';
import { DefaultGrid } from 'Components';
import CreateMemberForm from './CreateMemberForm';

import styles from './CreateMember.css';

const CreateMember = () => {
  return (
    <DefaultGrid overflow>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.typo}>
          New Member
        </Typography>
        <CreateMemberForm />
      </div>
    </DefaultGrid>
  );
};

export default CreateMember;
