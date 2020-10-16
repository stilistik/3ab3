import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  Box,
  TextField,
  DateField,
  UserRoleField,
  FormDialog,
  Icon,
  Message,
} from 'Components/index';
import { User } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { EDIT_USER } from 'Graphql/mutations';
import { USER_LIST } from 'Graphql/queries';
import { Serializable } from 'Components/form/types';
import { useTranslation } from 'react-i18next';

interface EditMemberProps {
  user: User;
}

export const EditMember: React.FC<EditMemberProps> = ({ user }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [editUser] = useMutation(EDIT_USER);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    editUser({
      variables: { userId: user.id, input: values },
      refetchQueries: () => [{ query: USER_LIST }],
    })
      .then(() => Message.success(t('Member successfully edited')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="edit" />
      </IconButton>
      <FormDialog
        title={t('Edit Member')}
        show={showDialog}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initValues={user}
      >
        <Box cmb={2}>
          <TextField id="name" label={t('Name')} />
          <TextField id="email" label={t('Email')} type="email" />
          <UserRoleField id="role" label={t('Role')} />
          <TextField id="phone" label={t('Phone')} />
          <DateField id="birthdate" label={t('Birthday')} />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
