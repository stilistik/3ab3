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

interface CreateTodoProps {
  eventId: string;
  refetchQueries: () => any[];
}

const CreateTodo: React.FC<CreateTodoProps> = ({ eventId, refetchQueries }) => {
  const [show, setShow] = React.useState(false);
  const [createTodo] = useMutation(CREATE_TODO);

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
        title="Create Todo"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      >
        <Box cmb={1}>
          <TextField id="text" label="Todo" required={true} />
          <DateField id="due" label="Due Date" required={true} />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};

export default CreateTodo;
