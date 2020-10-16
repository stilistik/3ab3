import React from 'react';
import { Button } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { EDIT_SELF } from 'Graphql/mutations';
import {
  Box,
  Message,
  TextField,
  DateField,
  Form,
  FormSubmit,
  ImageField,
} from 'Components/index';
import { Serializable } from 'Components/form/types';
import { User } from 'Graphql/types';
import { CURRENT_USER_QUERY, USER_LIST } from 'Graphql/queries';

interface AccountFormProps {
  user: User;
}

export const AccountForm: React.FC<AccountFormProps> = ({ user }) => {
  const [editSelf] = useMutation(EDIT_SELF);
  const handleSubmit = (values: NestedRecord<Serializable>) => {
    editSelf({
      variables: {
        input: values,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_QUERY },
        { query: USER_LIST },
      ],
    })
      .then(() => Message.success('Information successfully updated.'))
      .catch((error) => Message.error(error.message));
  };

  return (
    <Form onSubmit={handleSubmit} initValues={user}>
      <Box cmb={2}>
        <ImageField id="avatar" label="User Avatar" />
        <TextField id="name" label="Name" />
        <TextField id="email" label="Email" type="email" />
        <TextField id="phone" label="Phone" />
        <DateField id="birthdate" label="Birthday" />
        <FormSubmit>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            Submit
          </Button>
        </FormSubmit>
      </Box>
    </Form>
  );
};
