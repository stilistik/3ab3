import React from 'react';
import { Icon, Message, UserAvatar } from 'Components';
import { Button, Typography, List, ListItem } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
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

const USER_QUERY = gql`
  query {
    users {
      id
      name
      avatar
      chats {
        members {
          id
        }
      }
    }
  }
`;

const BackButton = ({ onClick }) => {
  return (
    <Button
      className={styles.createButton}
      color="secondary"
      variant="outlined"
      onClick={onClick}
      style={{ marginLeft: 10 }}
    >
      <Icon type="arrowBack" />
    </Button>
  );
};

const UserList = ({ currentUser, onSelectUser }) => {
  const { loading, error, data } = useQuery(USER_QUERY);
  if (loading || error) return null;

  const filterAlreadyCreatedChats = (users, currentUser) => {
    return users.filter((user) => {
      return !user.chats.find((chat) => {
        const memberIds = chat.members.map((el) => el.id);
        return (
          memberIds.length === 2 &&
          memberIds.includes(user.id) &&
          memberIds.includes(currentUser.id)
        );
      });
    });
  };

  const users = data.users.filter((el) => el.id !== currentUser.id);
  const available = filterAlreadyCreatedChats(users, currentUser);

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {available.map((user) => (
          <ListItem
            key={user.id}
            button
            className={styles.chat}
            onClick={() => onSelectUser(user)}
          >
            <div className={styles.chatInner}>
              <UserAvatar user={user} />
              <span>{user.name}</span>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export const CreateChat = ({ currentUser, onViewChange }) => {
  const [createChat] = useMutation(CREATE_CHAT);

  const onSelectUser = async (user) => {
    try {
      await createChat({
        variables: {
          input: {
            title: user.name,
            creatorId: currentUser.id,
            memberIds: [user.id],
          },
        },
        refetchQueries: () => [{ query: USER_QUERY }, { query: CHATS_QUERY }],
      });
      onBack();
    } catch (error) {
      Message.error(error.message);
    }
  };

  const onBack = () => {
    onViewChange(0);
  };

  return (
    <div className={styles.outer}>
      <div className={styles.header} style={{ marginBottom: 10 }}>
        <BackButton onClick={onBack} />
        <Typography variant="h4" style={{ marginRight: 20 }}>
          <strong>Create</strong>
        </Typography>
      </div>
      <UserList currentUser={currentUser} onSelectUser={onSelectUser} />
    </div>
  );
};
