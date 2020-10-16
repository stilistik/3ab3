import React from 'react';
import { useMutation } from 'react-apollo';
import { CREATE_TODO } from 'Graphql/mutations';
import {
  DateField,
  FormDialog,
  Icon,
  Box,
  Message,
  TextField,
} from 'Components/index';
import { Serializable } from 'Components/form/types';
import { IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface CreateTodoProps {
  eventId: string;
  refetchQueries: () => any[];
}

export const CreateTodo: React.FC<CreateTodoProps> = ({
  eventId,
  refetchQueries,
}) => {
  const [show, setShow] = React.useState(false);
  const [createTodo] = useMutation(CREATE_TODO);
  const { t } = useTranslation();

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    createTodo({
      variables: {
        input: {
          eventId: eventId,
          ...values,
        },
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
        <Icon type="add" />
      </IconButton>
      <FormDialog
        show={show}
        title={t('Create Todo')}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      >
        <Box cmb={1}>
          <TextField id="text" label={t('Todo')} required={true} />
          <DateField id="due" label={t('Due Date')} required={true} />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
