import React from 'react';
import { Message, Icon } from 'Components';
import { IconButton, Input } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { MESSAGES } from './Messages';

import styles from './CreateMessage.less';

const MUTATION = gql`
  mutation($input: MessageInput) {
    createMessage(input: $input) {
      id
    }
  }
`;

export const CreateMessage = ({ currentUser, selectedUser }) => {
  const [value, setValue] = React.useState('');
  const [createMessage] = useMutation(MUTATION);

  const onSubmit = async (values) => {
    try {
      await createMessage({
        variables: {
          input: {
            fromId: currentUser.id,
            toId: selectedUser,
            text: value,
          },
        },
        refetchQueries: () => [
          {
            query: MESSAGES,
            variables: {
              fromId: currentUser.id,
              toId: selectedUser,
              first: 20,
            },
          },
        ],
      });
    } catch (error) {
      Message.error(error.message);
    }
  };

  const onChange = (e) => setValue(e.target.value);

  return (
    <div className={styles.form}>
      <Input
        value={value}
        onChange={onChange}
        className={styles.input}
        multiline
        disableUnderline
      />
      <IconButton type="submit" onClick={onSubmit}>
        <Icon type="send" />
      </IconButton>
    </div>
  );
};
