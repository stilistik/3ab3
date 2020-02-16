import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from 'Components';
import CreateMemberForm from './CreateMemberForm';

import styles from './CreateMember.css';

const CreateMember = () => {
  return (
    <Grid.Default>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.typo}>
          New Member
        </Typography>
        <CreateMemberForm />
      </div>
    </Grid.Default>
  );
};

export default CreateMember;
