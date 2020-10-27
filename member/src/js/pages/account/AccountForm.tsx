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
import { useTranslation } from 'react-i18next';

interface AccountFormProps {
  user: User;
}

export const AccountForm: React.FC<AccountFormProps> = ({ user }) => {
  const { t } = useTranslation();
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
        <ImageField id="avatar" label={t("User Avatar")} />
        <TextField id="name" label={t("Name")} required />
        <TextField id="email" label={t("Email")} type="email" required />
        <TextField id="phone" label={t("Phone")} />
        <DateField id="birthdate" label={t("Birthday")} />
        <FormSubmit>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            {t('Submit')}
          </Button>
        </FormSubmit>
      </Box>
    </Form>
  );
};
