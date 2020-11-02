import { Serializable } from 'Components/form/types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { SECRETS } from 'Graphql/queries';
import { EDIT_SECRET } from 'Graphql/mutations';
import { IconButton } from '@material-ui/core';
import { Box, Icon, FormDialog, Message, TextField } from 'Components/index';
import { Secret } from 'Graphql/types';
import { useTranslation } from 'react-i18next';

interface EditSecretProps {
  secret: Secret;
}

export const EditSecret: React.FC<EditSecretProps> = ({ secret }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [editSecret] = useMutation(EDIT_SECRET);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    editSecret({
      variables: { secretId: secret.id, input: values },
      refetchQueries: () => [{ query: SECRETS }],
    })
      .then(() => Message.success(t('Secret successfully edited')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="edit" />
      </IconButton>
      <FormDialog
        title={t('Edit Secret')}
        show={showDialog}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initValues={secret}
      >
        <Box cmb={2}>
          <TextField id="title" label={t('Title')} required={true} />
          <TextField id="front" label={t('Front')} required={true} multiline />
          <TextField id="back" label={t('Back')} multiline />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
