import React from 'react';
import { Icon, Message } from 'Components';
import { Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CHATS_QUERY } from './ChatManager';

import styles from './Chats.less';

const CREATE_CHAT = gql`
  mutation($input: ChatInput!) {
    createChat(input: $input) {
      id
    }
  }
`;

export const CreateChat = ({ currentUser }) => {
  const [open, setOpen] = React.useState(false);
  const [createChat] = useMutation(CREATE_CHAT);

  const onChange = async (id, value) => {
    try {
      await createChat({
        variables: {
          input: {
            title: value.name,
            creatorId: currentUser.id,
            memberIds: [value.id],
          },
        },
        refetchQueries: () => [{ query: CHATS_QUERY }],
      });
    } catch (error) {
      Message.error(error.message);
    }
  };

  return (
    <Button
      className={styles.createButton}
      color="secondary"
      variant="outlined"
      onClick={() => setOpen(true)}
    >
      <Icon type="add" />
    </Button>
  );
};
