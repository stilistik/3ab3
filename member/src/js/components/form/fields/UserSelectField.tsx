import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SearchSelectField } from '../fields';
import { SelectOption } from 'Components/inputs';
import { User } from 'Graphql/types';
import { USER_LIST } from 'Graphql/queries';

function getOptionFromUser(user: User): SelectOption {
  let label = user.name;
  if (user.firstName && user.lastName) {
    label += ` (${user.firstName} ${user.lastName})`;
  }
  return {
    value: user.id,
    label: label,
    item: user,
  };
}

export interface UserSelectFieldProps {
  id: string;
  label: string;
  required?: boolean;
}

export const UserSelectField: React.FC<UserSelectFieldProps> = (props) => {
  const { loading, error, data } = useQuery(USER_LIST);
  if (loading || error) return null;

  const users: User[] = data.users;

  // generate select field options from workbooks
  const options = users.map((user) => getOptionFromUser(user));

  return <SearchSelectField options={options} {...props} />;
};
