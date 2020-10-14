import React from 'react';
import {
  Box,
  TextField,
  DateField,
  UserRoleField,
  FormDialog,
  Message,
  CreateButton,
} from 'Components/index';
import { useMutation } from 'react-apollo';
import { CREATE_USER } from 'Graphql/mutations';
import { USER_LIST } from 'Graphql/queries';
import { Serializable } from 'Components/form/types';

export const CreateMember: React.FC = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [createUser] = useMutation(CREATE_USER);

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    createUser({
      variables: { input: values },
      refetchQueries: () => [{ query: USER_LIST }],
    })
      .then(() => Message.success('User successfully created.'))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <CreateButton onClick={handleClick} />
      <FormDialog
        title="Create Member"
        show={showDialog}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <Box cmb={2}>
          <TextField id="name" label="Name" />
          <TextField id="email" label="Email" type="email" />
          <UserRoleField id="role" label="Role" />
          <TextField id="phone" label="Phone" />
          <DateField id="birthdate" label="Birthday" />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
