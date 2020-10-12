import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SearchSelectField } from '../fields';
import { SelectOption } from 'Components/inputs';
import { User } from 'Graphql/types';

const QUERY = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

function getOptionFromUser(user: User): SelectOption {
  return {
    value: user.id,
    label: user.name,
    item: user,
  };
}

export interface UserSelectFieldProps {
  id: string;
  label: string;
}

export const UserSelectField: React.FC<UserSelectFieldProps> = (props) => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading || error) return null;

  const users: User[] = data.users;

  // generate select field options from workbooks
  const options = users.map((user) => getOptionFromUser(user));

  return <SearchSelectField options={options} {...props} />;
};
