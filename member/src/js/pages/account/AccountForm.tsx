import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { EDIT_SELF } from 'Graphql/mutations';
import {
  Box,
  Message,
  TextField,
  DateField,
  Form,
  FormSubmit,
} from 'Components/index';
import { Serializable } from 'Components/form/types';
import { User } from 'Graphql/types';

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
    })
      .then(() => Message.success('Information successfully updated.'))
      .catch((error) => Message.error(error.message));
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Form onSubmit={handleSubmit} initValues={user}>
          <Box cmb={2}>
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
      </Grid>
    </Grid>
  );
};
