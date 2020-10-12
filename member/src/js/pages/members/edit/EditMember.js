import React from 'react';
import { Grid } from 'Components';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { getQueryParams } from 'History';
import EditMemberForm from './EditMemberForm';
import { updateParams } from 'History/';

import styles from './EditMember.css';

const QUERY = gql`
  query($userId: ID!) {
    user(userId: $userId) {
      id
      name
      email
      avatar
      role
    }
  }
`;

const EditMember = (props) => {
  const { id } = getQueryParams();

  React.useEffect(() => {
    return () => updateParams({ id: undefined });
  }, []);

  const { loading, error, data } = useQuery(QUERY, {
    variables: { userId: id },
    fetchPolicy: 'no-cache',
  });

  if (loading || error) return null;

  return (
    <Grid.Default>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.typo}>
          Edit Member
        </Typography>
        <EditMemberForm {...props} user={data.user} />
      </div>
    </Grid.Default>
  );
};

export default EditMember;
