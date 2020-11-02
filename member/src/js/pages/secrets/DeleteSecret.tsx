import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Icon, ConfirmationDialog, Message } from 'Components/index';
import { Secret } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { DELETE_SECRET } from 'Graphql/mutations';
import { SECRETS } from 'Graphql/queries';
import { Trans, useTranslation } from 'react-i18next';

interface DeleteSecretProps {
  secret: Secret;
}

export const DeleteSecret: React.FC<DeleteSecretProps> = ({ secret }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [deleteSecret] = useMutation(DELETE_SECRET);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleDelete = () => {
    deleteSecret({
      variables: { secretId: secret.id },
      refetchQueries: () => [{ query: SECRETS }],
    })
      .then(() => Message.success(t('Secret successfully deleted')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  const name = secret.title;
  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="delete" />
      </IconButton>
      <ConfirmationDialog
        show={showDialog}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        title={t('Delete Secret')}
      >
        <Typography variant="body2">
          <Trans i18nKey="deleteSecretConfirm">
            Do you really want to delete the secret <strong>{{ name }}</strong>
            ? This is an irreversible action, all data related to the secret
            will be lost. Continue?
          </Trans>
        </Typography>
      </ConfirmationDialog>
    </React.Fragment>
  );
};
