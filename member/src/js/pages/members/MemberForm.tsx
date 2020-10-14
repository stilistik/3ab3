import React from 'react';
import { Grid, Button } from '@material-ui/core';
import {
  Box,
  TextField,
  Form,
  UserRoleField,
  FormSubmit,
  DateField,
} from 'Components/index';
import { Serializable } from 'Components/form/types';
import { User } from 'Graphql/types';

interface MemberFormProps {
  onSubmit: (values: NestedRecord<Serializable>) => void;
  user?: User;
}

export const MemberForm: React.FC<MemberFormProps> = ({ user, onSubmit }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Form onSubmit={onSubmit} initValues={user}>
          <Box cmb={2}>
            <TextField id="name" label="Name" />
            <TextField id="email" label="Email" type="email" />
            <UserRoleField id="role" label="Role" />
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
