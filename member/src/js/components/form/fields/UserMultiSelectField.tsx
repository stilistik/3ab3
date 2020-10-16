import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MultiSelectField } from '../fields';
import { SelectOption } from 'Components/inputs';
import { User } from 'Graphql/types';
import { USER_LIST } from 'Graphql/queries';

function getOptionFromUser(user: User): SelectOption {
  return {
    value: user.id,
    label: user.name,
    item: user,
  };
}

export interface UserMultiSelectFieldProps {
  id: string;
  label: string;
  required?: boolean;
}

export const UserMultiSelectField: React.FC<UserMultiSelectFieldProps> = (
  props
) => {
  const { loading, error, data } = useQuery(USER_LIST);
  if (loading || error) return null;

  const users: User[] = data.users;

  // generate select field options from workbooks
  const options = users.map((user) => getOptionFromUser(user));

  return <MultiSelectField options={options} disableCloseOnSelect {...props} />;
};
