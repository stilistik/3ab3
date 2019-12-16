import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SearchSelectField } from '../fields';

const QUERY = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const UserSelectField = (props) => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading || error) return null;

  return <SearchSelectField items={data.users} {...props} />;
};
