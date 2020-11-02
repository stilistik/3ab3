import React from 'react';
import { Box, CreateButton, FormDialog, Message, TextField } from 'Components/index';
import { Serializable } from 'Components/form/types';
import { useMutation } from 'react-apollo';
import { useTranslation } from 'react-i18next';
import { CREATE_SECRET } from 'Graphql/mutations';
import { SECRETS } from 'Graphql/queries';

export const CreateSecret: React.FC = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [createSecret] = useMutation(CREATE_SECRET);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    createSecret({
      variables: { input: values },
      refetchQueries: () => [{ query: SECRETS }],
    })
      .then(() => Message.success(t('Secret successfully created')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <CreateButton onClick={handleClick} />
      <FormDialog
        title={t('Create Secret')}
        show={showDialog}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
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
