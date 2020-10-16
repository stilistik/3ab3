import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  Box,
  Icon,
  UserSelectField,
  FormDialog,
  Message,
} from 'Components/index';
import { useMutation } from 'react-apollo';
import { ASSIGN_USER } from 'Graphql/mutations';
import { Serializable } from 'Components/form/types';
import { useTranslation } from 'react-i18next';

interface AssignUserProps {
  todoId: string;
  refetchQueries: () => any[];
}

export const AssignUser: React.FC<AssignUserProps> = ({
  todoId,
  refetchQueries,
}) => {
  const [show, setShow] = React.useState(false);
  const [assignUser] = useMutation(ASSIGN_USER);
  const { t } = useTranslation();

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    assignUser({
      variables: {
        userId: values.user,
        todoId: todoId,
      },
      refetchQueries,
    }).catch((error) => Message.error(error.message));
    setShow(false);
  };

  const handleClick = () => setShow(true);

  const handleCancel = () => setShow(false);

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="personAdd" />
      </IconButton>
      <FormDialog
        show={show}
        title={t('Assign Member')}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      >
        <Box cmb={1}>
          <UserSelectField id="user" label={t('Select Member')} />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
