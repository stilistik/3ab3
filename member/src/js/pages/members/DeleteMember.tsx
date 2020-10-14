import React from 'react';
import { IconButton } from '@material-ui/core';
import { Icon, ConfirmationDialog, Message } from 'Components/index';
import { User } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { DELETE_USER } from 'Graphql/mutations';
import { USER_LIST } from 'Graphql/queries';

interface DeleteMemberProps {
  user: User;
}

export const DeleteMember: React.FC<DeleteMemberProps> = ({ user }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleDelete = () => {
    deleteUser({
      variables: { userId: user.id },
      refetchQueries: () => [{ query: USER_LIST }],
    })
      .then(() => Message.success('User successfully deleted.'))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="delete" />
      </IconButton>
      <ConfirmationDialog
        show={showDialog}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        title="Delete User"
      >
        Do you really want to delete the user {user.name}? This is an
        irreversible action, all user data will be lost. Continue?
      </ConfirmationDialog>
    </React.Fragment>
  );
};
