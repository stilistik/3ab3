import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Error, SelectField } from 'Components/index';

const USER_ROLES_QUERY = gql`
  query {
    roles
  }
`;
interface UserRoleFieldProps {
  id: string;
  label: string;
}

export const UserRoleField: React.FC<UserRoleFieldProps> = (props) => {
  const { loading, error, data } = useQuery(USER_ROLES_QUERY);

  if (error) return <Error message={error.message} />;
  if (loading) return null;

  const { roles }: { roles: string[] } = data;
  const options = roles.map((role: string) => ({
    value: role,
    label: role,
    item: role,
  }));

  return <SelectField options={options} {...props} />;
};
