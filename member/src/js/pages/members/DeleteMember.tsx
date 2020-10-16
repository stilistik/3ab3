import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Icon, ConfirmationDialog, Message } from 'Components/index';
import { User } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { DELETE_USER } from 'Graphql/mutations';
import { USER_LIST } from 'Graphql/queries';
import { Trans, useTranslation } from 'react-i18next';

interface DeleteMemberProps {
  user: User;
}

export const DeleteMember: React.FC<DeleteMemberProps> = ({ user }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [deleteUser] = useMutation(DELETE_USER);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleDelete = () => {
    deleteUser({
      variables: { userId: user.id },
      refetchQueries: () => [{ query: USER_LIST }],
    })
      .then(() => Message.success(t('Member successfully deleted')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  const name = user.name;
  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="delete" />
      </IconButton>
      <ConfirmationDialog
        show={showDialog}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        title={t('Delete Member')}
      >
        <Typography variant="body2">
          <Trans i18nKey="deleteMemberConfirm">
            Do you really want to delete the member <strong>{{ name }}</strong>?
            This is an irreversible action, all user data will be lost.
            Continue?
          </Trans>
        </Typography>
      </ConfirmationDialog>
    </React.Fragment>
  );
};
